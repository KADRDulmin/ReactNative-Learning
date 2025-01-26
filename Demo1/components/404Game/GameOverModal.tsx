// app/components/404Game/GameOverModal.tsx
import React from 'react';
import { Pressable, useColorScheme } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, Platform } from 'react-native';

interface GameOverModalProps {
  score: number;
  onRetry: () => void;
}

function GameOverModal({ score, onRetry }: GameOverModalProps) {
  const colorScheme = useColorScheme();

  return (
    <Animated.View
      entering={FadeInDown.springify()}
      style={[
        styles.gameOver,
        { backgroundColor: colorScheme === 'dark' ? '#2C2C2C' : '#FFFFFF' },
      ]}
    >
      <ThemedText type="title">Game Over!</ThemedText>
      <ThemedText style={styles.scoreText}>Final Score: {score}</ThemedText>
      <ThemedText style={styles.benefitSummary}>
        You've practiced skills essential for medical precision!
      </ThemedText>
      <Pressable onPress={onRetry} style={styles.retryButton}>
        <ThemedText style={styles.buttonText}>Play Again</ThemedText>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gameOver: {
    position: 'absolute',
    top: '40%',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    ...Platform.select({
      web: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    }),
  },
  scoreText: {
    fontSize: 20,
    marginVertical: 10,
  },
  benefitSummary: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
    opacity: 0.8,
    maxWidth: '80%',
  },
  retryButton: {
    backgroundColor: Platform.select({
      web: '#007AFF',
      ios: '#007AFF',
      android: '#2196F3',
    }),
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: Platform.OS === 'android' ? 5 : 0,
      },
    }),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameOverModal;