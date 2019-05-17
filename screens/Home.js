import React from "react";
import * as firebase from "firebase";
import styles from "../styles";
import { connect } from "react-redux";
import { getCards, getInterest, verifyCards } from "../redux/actions";
import SwipeCards from "react-native-swipe-cards";
import Cards from "../components/Cards.js";
import NoCards from "../components/NoCards.js";
import dismissKeyboard from "dismissKeyboard";
import { Text, ScrollView, RefreshControl,Image,Dimensions } from "react-native";
const win = Dimensions.get('window');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      actualcards: [],
      refreshing: false
    };
    this.props.navigation.setParams({ getCards: this.getMyself });
    this.getMyself();
  }

  componentDidMount() {
    dismissKeyboard();
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

  render() {
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
            renderCard={cardData => <Cards {...cardData} />}
            renderNoMoreCards={() => <NoCards />}
            showYup={true}
            showNope={true}
            handleYup={this.handleYup.bind(this)}
            handleNope={this.handleNope.bind(this)}
            handleMaybe={this.handleMaybe}
            hasMaybeAction={false}
          />
        ) : (
        <Image style={styles.cardsNo} source={require('../assets/testNoCards.png')} />
          //<Image style={{flex: 1,
          //  width: 370,
          //  height: 500,
          //  resizeMode: 'contain'}} source={require('../assets/hello.png')} />
        )}
      </ScrollView>
    );
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
