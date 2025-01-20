import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'

import backgroundImage from '../../assets/images/Test_image_2.png'

const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage}
      resizeMode='cover'
       style={styles.bgimage}>
        <Text style={styles.text}>Doc-Assist Pro</Text>
      </ImageBackground>
    </View> 
  )
}

export default app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bgimage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)',
  }
})