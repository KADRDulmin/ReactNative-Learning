import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native'
import React from 'react'

import { Link } from 'expo-router'

import backgroundImage from '../assets/images/Test_image_2.png'

const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage}
      resizeMode='cover'
       style={styles.bgimage}>
        <Text style={styles.title}>Doc-Assist Pro</Text>
        <Link href="/explore" style={{marginHorizontal: 'auto'}} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.ButtonText} >Explore</Text>
        </Pressable>
        </Link>
        <Link href="/ex" style={{marginHorizontal: 'auto'}} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.ButtonText} >Error Page</Text>
        </Pressable>
        </Link>
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
  title: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 120,
  },
  link: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center', 
    textDecorationLine: 'underline',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 4,
  },
  button: {
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 6,
  },
  ButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', 
    padding: 4,
  }
})