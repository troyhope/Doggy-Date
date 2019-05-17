import * as firebase from "firebase";
import aws from "../config/aws";
import { ImagePicker, Location, Permissions, FileSystem, Notifications } from "expo";
import { RNS3 } from "react-native-aws3";
import Geohash from "latlon-geohash";
import { Alert } from "react-native";
// import RNFetchBlob from 'rn-fetch-blob'
import uuid from "uuid";

export function login(user) {
  return async function(dispatch) {
    let params = {
      id: user.uid,
      photoUrl: user.photoURL,
      name: user.displayName,
      aboutMe: " ",
      chats: " ",
      geocode: " ",
      images: [user.photoURL],
      notification: false,
      show: false,
      report: false,
      swipes: {
        [user.uid]: {
          status: false,
          choice: false
        }
      },
      token: " ",
      interested: "dogs"
    };

    await firebase
      .database()
      .ref("cards/")
      .child(user.uid)
      .once("value", function(snapshot) {
        if (snapshot.val() !== null) {
          dispatch({ type: "LOGIN", user: snapshot.val(), loggedIn: true });
          dispatch(allowNotifications())
        } else {
          firebase
            .database()
            .ref("cards/" + user.uid)
            .update(params);
          dispatch({ type: "LOGIN", user: params, loggedIn: true });
        }
        
        dispatch(getLocation());

      });
  };
}

export function logout() {
  return function(dispatch) {
    firebase.auth().signOut();
    dispatch({ type: "LOGOUT", loggedIn: false });
  };
}

export function uploadImages(images) {
  return function(dispatch) {
    Permissions.askAsync(Permissions.CAMERA_ROLL);
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      base64: true
    }).then(async function(result) {
      let array = images;
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", result.uri, true);
        xhr.send(null);
      });

      const ref = firebase
        .storage()
        .ref()
        .child(uuid.v4());
      const snapshot = await ref.put(blob);

      blob.close();
      let imageUrl = await snapshot.ref.getDownloadURL();
      array.push(imageUrl);
      firebase
        .database()
        .ref("cards/" + firebase.auth().currentUser.uid + "/images")
        .set(array);
      dispatch({ type: "UPLOAD_IMAGES", payload: array });
    });
  };
}

export function deleteImage(images, key) {
  return function(dispatch) {
    Alert.alert(
      "Are you sure you want to Delete",
      "",
      [
        {
          text: "Ok",
          onPress: () => {
            var array = images;
            array.splice(key, 1);
            dispatch({ type: "UPLOAD_IMAGES", payload: array });
            firebase
              .database()
              .ref("cards/" + firebase.auth().currentUser.uid + "/images")
              .set(array);
          }
        },
        { text: "Cancel", onPress: () => console.log("Cancel Pressed") }
      ],
      { cancelable: true }
    );
  };
}

export function updateAbout(value) {
  return function(dispatch) {
    dispatch({ type: "UPDATE_ABOUT", payload: value });
    setTimeout(function() {
      firebase
        .database()
        .ref("cards/" + firebase.auth().currentUser.uid)
        .update({ aboutMe: value });
    }, 3000);
  };
}
export function getCards(geocode, interest) {
  return function(dispatch) {
    firebase
      .database()
      .ref(`cards/${firebase.auth().currentUser.uid}`)
      .once("value", snapp => {
        var items = [];
        firebase
          .database()
          .ref("cards")
          .orderByChild("geocode")
          .equalTo(geocode)
          .once("value", snap => {
            snap.forEach(child => {
              if (snapp.val().interested === child.val().interested) {
                item = child.val();
                item.id = child.key;
                items.push(item);
              }
            });
            dispatch({ type: "GET_CARDS", payload: items });
          });
      });
  };
}

export function verifyCards(items) {
  return function(dispatch) {
    var array = [];
    items.forEach(item => {
      firebase
        .database()
        .ref("cards/" + firebase.auth().currentUser.uid + "/swipes/" + item.id)
        .once("value", chat => {
          if (chat.key !== firebase.auth().currentUser.uid) {
            if (chat.val() === false) {
              array.push(item);
            }
          }
        });
    });
    dispatch({ type: "VERIFY_CARDS", payload: array });
  };
}

export function getInterest() {
  return function(dispatch) {
    firebase
      .database()
      .ref(`cards/${firebase.auth().currentUser.uid}`)
      .once("value", snapp => {
        dispatch({ type: "GET_INTEREST", payload: snapp.val().interested });
      });
  };
}

export function updateInterest(interested) {
  return function() {
    firebase
      .database()
      .ref("cards/" + firebase.auth().currentUser.uid)
      .update({ interested: interested })
      .then(success => {
        dispatch({ type: "UPDATE_INTEREST", payload: interested });
      });
  };
}

export function getLocation() {
  return function(dispatch) {
    Permissions.askAsync(Permissions.LOCATION).then(function(result) {
      if (result) {
        Location.getCurrentPositionAsync({}).then(function(location) {
          var geocode = Geohash.encode(
            location.coords.latitude,
            location.coords.longitude,
            4
          );
          firebase
            .database()
            .ref("cards/" + firebase.auth().currentUser.uid)
            .update({ geocode: geocode });
          dispatch({ type: "GET_LOCATION", payload: geocode });
        });
      }
    });
  };
}

export function allowNotifications(){
  return function(dispatch){
    Permissions.getAsync(Permissions.NOTIFICATIONS).then(function(result){
      if (result.status === 'granted') {
        Notifications.getExpoPushTokenAsync().then(function(token){
          firebase.database().ref('cards/' + firebase.auth().currentUser.uid ).update({ token: token });
          dispatch({ type: 'ALLOW_NOTIFICATIONS', payload: token });
        })
      }
    })
  }
}

export function sendNotification(id, name, text){
  return function(dispatch){
    firebase.database().ref('cards/' + id).once('value', (snap) => {
      if(snap.val().token != null){

        return fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: snap.val().token,
            title: name,
            body: text,
          }),
        });

      }
    });
  }
}
