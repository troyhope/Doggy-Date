import React from "react";
import * as firebase from "firebase";
import styles from "../styles";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from "react-redux";
import { getCards, getInterest, verifyCards } from "../redux/actions";
import SwipeCards from "react-native-swipe-cards";
import Cards from "../components/Cards.js";
import NoCards from "../components/NoCards.js";
import AppIntroSlider from 'react-native-app-intro-slider';
import { LinearGradient } from 'expo';
import dismissKeyboard from "dismissKeyboard";
import { Text, ScrollView, RefreshControl,Image,Dimensions, AsyncStorage, View } from "react-native";
const win = Dimensions.get('window');

const slides = [
  {
    key: 'somethun',
    title: 'WELCOME TO DOGGYDATE!',
    text: 'After this introduction you will find different animals or pet enthusiasts to swipe through based on your preference.',
    icon2: 'dog',
    colors: ['#249bff', '#155d99'],
  },
  {
    key: 'somethun-dos',
    title: 'VIEWING PHOTOS.',
    text: 'Press on a users profile to cycle through their other photos!',
    icon1: 'touch-app',
    colors: ['#249bff', '#155d99'],
  },
  {
    key: 'somethun1',
    title: 'SWIPING USERS',
    text: 'Swipe right on a profile if you are interested. \n\nSwipe left on a profile if you are not interested.',
    icon2: 'gesture-swipe-horizontal',
    colors: ['#249bff', '#155d99'],
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

_renderItem = props => (
    <LinearGradient
      style={[styles.mainContentSliders, {
        width: props.width,
        height: props.height,
      }]}
      colors={props.colors}
      start={{x: 0, y: .1}} end={{x: .1, y: 1}}
    >
      <View style={{marginBottom: 150, alignSelf: 'center', alignItems: 'center'}}>
       <MaterialIcons style={{ backgroundColor: 'transparent', marginTop: 200, paddingBottom: 10 }} name={props.icon1} size={200} color="white" />
       <MaterialCommunityIcons style={{ backgroundColor: 'transparent' }} name={props.icon2} size={200} color="white" />
      
      <View>
        <Text style={styles.titleSliders}>{props.title}</Text>
        <Text style={styles.textSliders}>{props.text}</Text>
      </View>
      </View>
    </LinearGradient>
  );
  

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
        slides={slides}
        renderItem={this._renderItem}
        onDone={this._onDone}
        bottomButton
      />
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
