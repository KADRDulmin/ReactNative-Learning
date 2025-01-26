import { Link, Stack } from 'expo-router';
import { useColorScheme, Image, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import StartScreen from '@/components/404Game/StartScreen';
import GameContainer from '@/components/404Game/GameContainer';
import GameOverModal from '@/components/404Game/GameOverModal';
import { styles as gameStyles } from '@/components/404Game/styles';
import { GAME_DURATION } from '@/components/404Game/constants';
import { useState } from 'react';

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(GAME_DURATION);
  };

  return (
    <ThemedView style={styles.rootContainer}>
      <Stack.Screen options={{ headerShown: false }} />

      <Animated.Image
        source={
          colorScheme === 'dark'
            ? require('@/assets/images/Doc-Assist_Pro_Logo_White.png')
            : require('@/assets/images/Doc-Assist_Pro_Logo.png')
        }
        resizeMode="contain"
        style={[styles.logo, { opacity: gameStarted ? 0.5 : 1 }]}
      />

      <Animated.View entering={FadeInDown.duration(1000)}>
        <ThemedText type="title" style={[styles.errorCode, gameStyles.errorCode]}>404</ThemedText>
      </Animated.View>

      {!gameStarted ? (
        <StartScreen startGame={startGame} />
      ) : (
        <GameContainer
          score={score}
          setScore={setScore}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          setGameStarted={setGameStarted}
        />
      )}

      {timeLeft === 0 && (
        <GameOverModal score={score} onRetry={startGame} />
      )}

      <Link href="/" style={styles.link}>
        <ThemedText type="link">Return Home</ThemedText>
      </Link>
    </ThemedView>
  );
}

// Local styles for the NotFound screen
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 30,
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
  },
  errorCode: {
    fontSize: 80,
    fontWeight: 'bold',
    marginTop: 10,
    paddingTop: 45,
  },
  link: {
    marginTop: 60,
  },
});

// Optional: Export these styles if needed elsewhere
export { styles as notFoundStyles };