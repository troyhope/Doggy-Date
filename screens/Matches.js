import React from "react";
import styles from "../styles";
import { connect } from "react-redux";
import * as firebase from "firebase";
import Swipeout from "react-native-swipeout";

import {
  Alert,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      sectionID:null,
      delId: null
    };

  }

  showAlert = () => {
    Alert.alert(
      'Report',
      'Tell us what happened. Do not worry, this is anonymous.',
      [
        {text: 'Innappropriate content', onPress: () => console.log('Innappropriate content pressed', this.reportUser(this.state.delId))},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Stolen photo', onPress: () => console.log('Stolen photo Pressed', this.reportUser(this.state.delId))},
        {text: 'I do not want them to see me', onPress: () => console.log('I do not want them to see me pressed', this.reportUser(this.state.delId))},
        {text: 'Made me uncomfortable', onPress: () => console.log('Made me uncomfortable pressed', this.reportUser(this.state.delId))},
      ],
      { cancelable: false }
    )
  }

  reportUser = id => {
    console.log("User ID:", id)
    firebase
      .database()
      .ref(`cards/${this.props.user.id}/chats/${id}`)
  };

  deleteMatch = id => {
    console.log("asdf", id)
    firebase
      .database()
      .ref(`cards/${this.props.user.id}/chats/${id}`)
      .remove()
      .then(s => {
        console.log("ssssss", s)
      })
      .catch(e => {
        console.log("eeeee", e)
      });
  };
  componentWillMount() {
    this.props.navigation.setParams({ getMatches: this.getMatches });
    this.getMatches();
  }

  getMatches = () => {
    firebase
      .database()
      .ref("cards/" + this.props.user.id)
      .once("value", user => {
        firebase
          .database()
          .ref("cards/" + this.props.user.id + "/chats")
          .on("value", snap => {
            var items = [];
            snap.forEach(child => {
              firebase
                .database()
                .ref("cards/" + child.key)
                .on("value", individual => {
                  if (user.val().interested !== individual.val().interested) {
                    item = child.val();
                    items.push(item);
                  }
                });
            });
            this.setState({ chats: items.reverse() });
          });
      });
  };

  render() {
console.log(this.state.chats)

    var swipeBtns = [
    {
          text: "Report",
          backgroundColor: "#f8c536",
          underlayColor: 'rgb(251,224,149)',
          onPress: () => {this.showAlert()}
        },
      {
        text: "Unmatch",
        backgroundColor: "red",
        underlayColor: 'rgb(255,118,118)',
        onPress: (p) => {
          this.deleteMatch(this.state.delId); }
      },
      ];
 
    return (

      <View style={styles.container}>
        <ScrollView>
          {this.state.chats.map((uri,ind) => {
            return (
              <Swipeout
              close={this.state.sectionID !== ind}
                right={swipeBtns}
                autoClose={true}
                backgroundColor="#fff"
                key={ind}
                rowID={ind}
                sectionID={ind}
                onOpen={(sectionID,rowID) =>{
                  this.setState({sectionID: ind, delId: uri.user.id})
                }}
              >
                <TouchableOpacity
                  style={[styles.imgRow, styles.border]}
                  onPress={() =>
                    this.props.navigation.navigate("Chat", {
                      user: uri.user,
                      getMatches: this.getMatches
                    })
                  }
                >
                  <Image
                    style={styles.img1}
                    source={{ uri: uri.user.photoUrl + "?width=900" }}
                  />
                  <Text style={[styles.bold1, Platform.OS === 'android' ?styles.center2 : styles.center1]}>
                    {uri.user.name.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              </Swipeout>
            );
          })}
        </ScrollView>
      </View>

      ///
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Matches);
