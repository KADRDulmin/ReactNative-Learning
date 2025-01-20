import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'

const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/Doc-Assist_Pro_Logo.png')} style={{width: '100%', height: '100%'}}>
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
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center', 
  }
})