import React from "react";
import styles from "../styles";
import RootNavigator from "../navigation/RootNavigator";
import { connect } from "react-redux";
import { login } from "../redux/actions";
import * as firebase from "firebase";
import firebaseConfig from "../config/firebase.js";
firebase.initializeApp(firebaseConfig);
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions
} from "react-native";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full width

class Login extends React.Component {
  state = {};

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.props.dispatch(login(user));
      }
    });
  }

  login = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "1512084618926540",
      {
        permissions: ["public_profile"],
        behavior: this.isAStandaloneApp() ? 'native' : 'web',
      }

    );
    if (type === "success") {
      // Build Firebase credential with the Facebook access token.
      const credential = await firebase.auth.FacebookAuthProvider.credential(
        token
      );
      // Sign in with credential from the Facebook user.
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .catch(error => {
          // Handle Errors here.
          Alert.alert(JSON.stringify(error));
        });
    }
  };

  isAStandaloneApp = () => {
    return !(Platform.OS === 'ios' && Expo.Constants.appOwnership === 'expo');
  }

  render() {
    if (this.props.loggedIn) {
      return <RootNavigator />;
    } else {
      return (
        <View style={styles.containerLogin}>
          <View style={{height: "43%",paddingLeft:55}}>
            <View>
              
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center', flex: 1,height: "38%", marginTop: -150, marginBottom: 100 }}>
            <View>
              <Image
                style={styles.logoMain}
                source={require("../assets/logotestregular.png")}
              />
            </View>
          </View>
          <View style={{height: "25%"}}>
            <View>
              <TouchableOpacity onPress={this.login.bind(this)}>
                <Text style={styles.logInbutton}>Login with Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={{ width: "90%", alignSelf: "flex-end" }}>
            <Image
              // style={[styles.logoPaws, styles.center]}
              style={{ width: "100%", height: "50%" }}
              source={require("../assets/whitepaws.png")}
            />
          </View>
          <View>
            <Image
              style={[styles.logoMain, styles.center]}
              source={require("../assets/logotest.png")}
            />
          </View>
          <TouchableOpacity onPress={this.login.bind(this)}>
            <Text style={styles.logInbutton}>Login with Facebook</Text>
          </TouchableOpacity> */}
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn
  };
}

export default connect(mapStateToProps)(Login);
