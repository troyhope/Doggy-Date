import React from "react";
import styles from "../styles";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  uploadImages,
  deleteImage,
  updateAbout,
  logout,
  updateInterest
} from "../redux/actions";
import { Content, Icon, Picker, Form } from "native-base";
var deviceWidth = Dimensions.get("window").width;
console.disableYellowBox = true;

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native";

var width = Dimensions.get("window").width; //full width

class Profiles extends React.Component {
  state = {
    interested: this.props.interested,
    isVisible: false
  };

  deleteImage() {
    this.self.props.dispatch(
      deleteImage(this.self.props.user.images, this.key)
    );
  }

  addImage() {
    this.props.dispatch(uploadImages(this.props.user.images));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ interested: nextProps.interested });
  }

  deleteUser = id => {
    firebase
      .database()
      .ref(`cards/${this.props.user.id}`)
      .remove()
      .then(s => {
        this.props.dispatch(logout())
      })
      .catch(e => {
      });
  };

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: "#F8F8FF" }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        keyboardOpeningTime={0}
        extraScrollHeight={40}
      >
        <View style={[styles.container, styles.center]}>
          <View style={styles.container}>
            <Image
              style={styles.img}
              source={{ uri: this.props.user.photoUrl + "?width=900" }}
            />
            <Text style={[styles.center, styles.bold]}>
              {this.props.user.name}
            </Text>
          </View>
          <View style={styles.imgRowProfile}>
            {this.props.user.images.map((uri, key) => {
              return (
                <TouchableOpacity
                  key={key}
                  onPress={this.deleteImage.bind({ self: this, key: key })}
                >
                  <Image
                    style={styles.img}
                    source={{
                      uri:
                        uri.slice(8, 23) === "firebasestorage"
                          ? uri
                          : uri + "?width=900"
                    }}
                  />
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={[styles.img, styles.center]}
              onPress={this.addImage.bind(this)}
            >
              <Ionicons name="ios-add" size={75} style={styles.color1} />
            </TouchableOpacity>
          </View>
          <Text style={styles.bold}>Interest</Text>
          <Text
            style={{
              marginBottom: 10,
              fontWeight: "normal",
              color: "#249bbf"
            }}
          >
            What're you interested in ?
          </Text>
          <Content
            style={{
              backgroundColor: "#fff",
              width: deviceWidth - 27,
              borderRadius: 25,
              borderColor: '#f0f0f0',
              borderWidth: 1,
            }}
          >
            <Form>
              <Picker
                mode="dropdown"
                iosHeader="Select one"
                iosIcon={<Icon style={{marginLeft: -10}} name="arrow-down" />}
                style={{ width: width / 1.1, borderRadius: 20 }}
                selectedValue={this.state.interested}
                onValueChange={value => {
                  this.props.dispatch(updateInterest(value));
                  this.setState({
                    interested: value
                  });
                }}
              >
                <Picker.Item label="Dogs & Pets" value="dogs" />
                <Picker.Item label="Walker / Pet Sitter" value="walker" />
              </Picker>
            </Form>
          </Content>

          <Text style={styles.aboutBold}>About</Text>
          <TextInput
            maxLength={200}
            placeholder="Write something useful (max. 200 characters)"
            multiline={true}
            enableOnAndroid={true} 
            enableAutoAutomaticScroll={(Platform.OS === 'ios')}
            numberOfLines={Platform.OS === 'ios' ?10: 0}
            onChangeText={text => this.props.dispatch(updateAbout(text))}
            value={this.props.user.aboutMe}
            style={Platform.OS === 'android' ?styles.textInputAndroid : styles.textInput}
          />
        </View>


      <View style={styles.logoutDeleteButtons}>
        <TouchableOpacity onPress={() => this.props.dispatch(logout())}>
          <Text style={styles.imgLogout}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>
          this.deleteUser()}>
          <Text style={styles.imgDelete}>Delete Account</Text>
        </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Admin")}>
          <Text style={styles.admin}>Contact us</Text>
        </TouchableOpacity>
       
      </KeyboardAwareScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    interested: state.interested
  };
}

export default connect(mapStateToProps)(Profiles);
