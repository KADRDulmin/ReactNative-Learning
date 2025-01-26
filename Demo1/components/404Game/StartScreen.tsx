// app/components/404Game/StartScreen.tsx
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles as gameStyles } from './styles';

interface StartScreenProps {
  startGame: () => void;
}

function StartScreen({ startGame }: StartScreenProps) {
  return (
    <Animated.View
      entering={FadeInUp.delay(300)}
      style={styles.startContainer}
    >
      <ThemedText style={styles.errorDescription}>
        The page you're looking for doesn't exist, but while you're here...
      </ThemedText>
      <Pressable onPress={startGame} style={[gameStyles.startButton]}>
        <ThemedText style={gameStyles.buttonTextStyle}>
          Play Catch The Medical Icons!
        </ThemedText>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  startContainer: {
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
  errorDescription: {
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.8,
  },
});

export default StartScreen;