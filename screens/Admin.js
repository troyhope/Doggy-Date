import React from 'react';
import * as firebase from 'firebase';
import styles from "../styles";
import { connect } from 'react-redux';
import {
  Linking,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native";



class Admin extends React.Component {

  
  

render() {
  return ( 
    <View style={styles.contact}>
    <TouchableOpacity onPress={() => Linking.openURL('mailto:support@example.com?subject=e.g. Report a Technical Issue&body=Description') }
      title="support@example.com">
          <Text style={styles.contactButtons}>Email us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://doggydateconz.wordpress.com/privacy-policy/')}}>
          <Text style={styles.contactButtons}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://doggydateconz.wordpress.com/termsandconditions/')}}>
          <Text style={styles.contactButtons}>Terms & Conditions</Text>
        </TouchableOpacity>
    </View>
    )
}
}


function mapStateToProps(state) {
  return {
  user: state.user,
  };
}

export default connect(mapStateToProps)(Admin);