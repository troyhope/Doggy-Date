import React from 'react';
import Home from '../screens/Home';
import Profiles from '../screens/Profiles';
import Matches from '../screens/Matches';
import { Image, Button,Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
import styles from '../styles'

export default createMaterialTopTabNavigator(
  {
    Profiles: {
      screen: Profiles,
      navigationOptions: {
        label: 'Profile',
        showLabel: true,
        tabBarIcon: ({ focused }) => (

          <Image style={styles.profile} source={require('../assets/blankprofile.png')} />
        ),

      },
    },
    Home: {
      screen: Home,
      navigationOptions: {

        showLabel: false,
        tabBarIcon: ({ focused }) => (

          <Image style={Platform.OS === 'android' ?styles.logoAndroid : styles.logo} source={require('../assets/doggydate.png')} />
        ),
        
        tabBarOnPress:({navigation, defaultHandler})=>{
         navigation.state.params.getCards()
         defaultHandler()
        }

      }
    },
    Matches: {
      screen: Matches,
      navigationOptions: {

        showLabel: false,

        tabBarIcon: ({ focused, navigation }) => (
          <Image style={styles.messages} source={require('../assets/squaremessage.png')} />

        ),
        tabBarOnPress:({navigation, defaultHandler})=>{
         navigation.state.params.getMatches()
         defaultHandler()
        }
      },
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#212121',
      },
      header: null
    },
    flexDirection: 'row',
    tabBarPosition: 'top',
    initialRouteName: 'Home',
    animationEnabled: true,
    swipeEnabled: false,
    


    tabBarOptions: {
      
      width: deviceWidth,
      showIcon: true,
      showLabel: false,
      activeTintColor: "#249bbf",
      inactiveTintColor: 'grey',
      flex: 1,
      margin: 0,


      iconStyle: {

      },




      style: {
        height: 90,
        backgroundColor: 'transparent',
        // position: 'left-align',
      },
      tabStyle: {
        
        height: 100,
        backgroundColor: 'transparent',
        

      },

      indicatorStyle: {
        borderBottomColor: null,
        borderBottomWidth: -1,
        height: 0,
      },




    }
  }
);