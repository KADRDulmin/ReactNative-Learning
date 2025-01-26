import { View, Text, StyleSheet, ImageBackground, Pressable, Platform } from 'react-native'
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
        
        <View style={styles.buttonContainer}>
          <Link href="/explore" asChild>
            <Pressable 
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed
              ]}>
              <Text style={styles.ButtonText}>Explore</Text>
            </Pressable>
          </Link>

          <Link href="/ex" asChild>
            <Pressable 
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed
              ]}>
              <Text style={styles.ButtonText}>Error Page</Text>
            </Pressable>
          </Link>

          <Link href="/test" asChild>
            <Pressable 
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed
              ]}>
              <Text style={styles.ButtonText}>Test Screen</Text>
            </Pressable>
          </Link>
        </View>
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
  buttonContainer: {
    gap: 15,
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    minHeight: 60,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: Platform.select({
      ios: 'rgba(0, 122, 255, 0.8)',
      android: 'rgba(33, 150, 243, 0.8)',
      web: 'rgba(0, 122, 255, 0.8)',
    }),
    padding: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ':hover': {
          transform: 'scale(1.05)',
          backgroundColor: 'rgba(0, 122, 255, 1)',
        },
      },
    }),
  },
  buttonPressed: {
    opacity: 0.8,
    transform: Platform.select({
      ios: [{ scale: 0.95 }],
      android: [{ scale: 0.95 }],
      web: [{ scale: 0.95 }],
    }),
  },
  ButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', 
    padding: 4,
    ...Platform.select({
      web: {
        userSelect: 'none',
      },
    }),
  }
})