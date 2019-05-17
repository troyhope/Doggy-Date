import React from 'react';
import styles from '../styles'

import { 
  Image,	
  Text, 
  View,
} from 'react-native';

class NoCards extends React.Component {
  render() {
    return (
      <View>
        <Image style={styles.cardsNo} source={require('../assets/testNoCards.png')} />
      </View>
    )
  }
}

export default NoCards