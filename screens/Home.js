import React from "react";
import * as firebase from "firebase";
import styles from "../styles";
import { connect } from "react-redux";
import { getCards, getInterest, verifyCards } from "../redux/actions";
import SwipeCards from "react-native-swipe-cards";
import Cards from "../components/Cards.js";
import NoCards from "../components/NoCards.js";
import AppIntroSlider from 'react-native-app-intro-slider';
import dismissKeyboard from "dismissKeyboard";
import { Text, ScrollView, RefreshControl,Image,Dimensions, AsyncStorage } from "react-native";
const win = Dimensions.get('window');

const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.',
   
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
   
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'YEET',
   
    backgroundColor: '#22bcb5',
  }
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      cards: [],
      actualcards: [],
      refreshing: false,
      loading: true,
    };
    _renderItem = (item) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} />
        <Text style={style.text}>{item.text}</Text>
      </View>
    );
  }
 
    this.props.navigation.setParams({ getCards: this.getMyself });
    this.getMyself();
  }

  componentDidMount() {
     AsyncStorage.getItem('first_time').then((value) => {
      this.setState({ showRealApp: !!value, loading: false });
    });
  }

  componentWillMount() {
    dismissKeyboard();
    this.props.dispatch(getInterest());
    this.props.dispatch(getCards(this.props.user.geocode, this.props.interest));
  }

  getCards = () => {
    this.props.dispatch(getCards(this.props.user.geocode, this.props.interest));
  };



  componentWillReceiveProps(nextProps) {
    if (nextProps.runVerify === true) {
      nextProps.dispatch(verifyCards(nextProps.actualcards));
    }
  }

  handleYup(card) {
    // console.log("----------------", card);
    firebase
      .database()
      .ref("cards/" + this.props.user.id + "/swipes")
      .update({ [card.id]: { status: true, choice: true } });
    this.checkMatch(card);
  }

  handleNope(card) {
    firebase
      .database()
      .ref("cards/" + this.props.user.id + "/swipes")
      .update({ [card.id]: { status: true, choice: false } });
  }

  checkMatch(card) {
    // console.log("===========", card);
    firebase
      .database()
      .ref("cards/" + card.id + "/swipes/" + this.props.user.id)
      .once("value", snap => {
        // firebase.database().ref('cards/' + this.props.user.id + '/swipes/' + card.id).once('value', (snap) => {
        if (snap.val() !== null) {
          if (snap.val().choice === true) {
            var me = {
              id: this.props.user.id,
              photoUrl: this.props.user.photoUrl,
              name: this.props.user.name
            };
            var user = {
              id: card.id,
              photoUrl: card.photoUrl,
              name: card.name
            };
            firebase
              .database()
              .ref("cards/" + this.props.user.id + "/chats/" + card.id)
              .set({ user: user })
              .then(success => {})
              .catch(e => {});
            firebase
              .database()
              .ref("cards/" + card.id + "/chats/" + this.props.user.id)
              .set({ user: me });
          }
        }
      });
  }

  handleClick() {
    console.log('Click happened');
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getMyself();
  };

  getMyself = () => {
    this.setState({ cards: [], refreshing: false });
    firebase
      .database()
      .ref(`cards/${firebase.auth().currentUser.uid}`)
      .once("value", snapp => {
        this.getCardList(snapp.val().interested);
      });
  };
  getCardList = a => {
    firebase
      .database()
      .ref("cards")
      .orderByChild("geocode")
      .equalTo(this.props.user.geocode)
      .once("value", snap => {
        snap.forEach(child => {
          this.getSwipes(child, a);
        });
      });
  };
  getSwipes = (child, a) => {
    firebase
      .database()
      .ref(
        "cards/" + firebase.auth().currentUser.uid + "/swipes/" + child.val().id
      )
      .once("value", chat => {
        if (child.val() !== null) {
          if (
            a !== child.val().interested &&
            chat.key !== firebase.auth().currentUser.uid
          ) {
            console.log(chat.val(), "vaht.val");
            if (chat.val() !== null) {
              if (chat.val().status !== true) {
                item = child.val();
                item.id = child.key;
                this.setState({
                  cards: [...this.state.cards, item]
                });
              }
            } else {
              item = child.val();
              item.id = child.key;
              this.setState({
                cards: [...this.state.cards, item]
              });
            }
          }
        }
      });
  };
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ showRealApp: true });
        this.props.navigation.navigate('Home');
    });
  }

  render() {
    if (this.state.showRealApp) {
    return (
 
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }
      >
        {this.state.cards.length > 0 ? (
          <SwipeCards
            cards={this.state.cards}
            stack={false}
            stackOffsetX={7}
            smoothTransition={true}
            renderCard={cardData => <Cards {...cardData} />}
            renderNoMoreCards={() => <NoCards />}
            showYup={true}
            showNope={true}
            handleYup={this.handleYup.bind(this)}
            handleNope={this.handleNope.bind(this)}
            handleMaybe={this.handleMaybe}
            hasMaybeAction={false}
            onClickHandler={this.handleClick.bind(this)}
          />
        ) : (
        <Image style={styles.cardsNo} source={require('../assets/testNoCards.png')} />
          //<Image style={{flex: 1,
          //  width: 370,
          //  height: 500,
          //  resizeMode: 'contain'}} source={require('../assets/hello.png')} />
        )}
      </ScrollView>  );
    } else {
      return <AppIntroSlider 
      renderItem={this._renderItem} slides={slides} onDone={this._onDone}/>;
    }
      
      

            
            
   
  }
}

function mapStateToProps(state) {
  return {
    cards: state.verifiedCards,
    actualcards: state.cards,
    user: state.user,
    interest: state.interest,
    runVerify: state.runVerify
  };
}

export default connect(mapStateToProps)(Home);
