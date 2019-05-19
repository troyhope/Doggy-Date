import React from 'react';
import { createAppContainer ,createStackNavigator} from 'react-navigation';
import createMaterialTopTabNavigator from './TabNavigator.js';
import Chat from '../screens/Chat.js';
import Admin from '../screens/Admin.js';


const RootStackNavigator = createStackNavigator(
  {
    Main: {
      screen: createMaterialTopTabNavigator,
    },
    Chat: {
    	screen: Chat,
    },
    Admin: {
      screen: Admin,
    },
  }
);

const AppContainer = createAppContainer(RootStackNavigator)

export default class RootNavigator extends React.Component {
  render() {
    
    return (
  
     <AppContainer/>
      
      )
    
  }
}