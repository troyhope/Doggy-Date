import React from "react";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Text, View, ImageBackground, TouchableOpacity } from "react-native";

class Cards extends React.Component {
  state = {
    num: 0
  };

  nextPhoto() {
    var num = this.state.num;
    var length = this.props.images.length;
    num += 1;
    if (num >= length) {
      this.setState({ num: 0 });
    } else {
      this.setState({ num: num });
    }
  }



  _showAlert = () => {
    Alert.alert(
      'Report',
      'Tell us what happened. Do not worry, this is anonymous.',
      [
        {text: 'Innappropriate content', onPress: () => console.log('Innappropriate content pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Stolen photo', onPress: () => console.log('Stolen photo Pressed')},
        {text: 'I do not want them to see me', onPress: () => console.log('I do not want them to see me pressed'), style: 'default'},
        {text: 'Made me uncomfortable', onPress: () => console.log('Made me uncomfortable pressed')},
      ],
      { cancelable: false }
    )
  }


  render() {
    let firstName=this.props.name.split(' ');

    // let img = this.props.images[this.state.num] ?

    console.log("this.state0000000000000--------",this.state.num)
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => this.nextPhoto()}>
        <ImageBackground
          style={styles.card}
          source={this.props.images.length > 1 ? {
            uri:
              this.props.images[this.state.num].slice(8, 23) ===
              "firebasestorage"
                ? this.props.images[this.state.num]
                : this.props.images[this.state.num] + "?width=900"
          }:{
            uri:
              this.props.images[0].slice(8, 23) ===
              "firebasestorage"
                ? this.props.images[0]
                : this.props.images[0] + "?width=900"
          }}
        >
          <View style={styles.cardDescription}>
            <View style={{ backgroundColor: 'transparent', borderRadius: 20,
    padding: 1,
    color: "#fff"}}>
              <Text style={styles.boldCards}>{firstName[0]}</Text>
              <Text style={styles.aboutMeCards}>{this.props.aboutMe}</Text>
              <TouchableOpacity style={styles.report} onPress={this._showAlert}> 
              <Ionicons style={styles.report} name="ios-alert" size={25}/>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}




export default Cards;
