// app/components/404Game/FloatingIcon.tsx
import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Platform, Vibration } from 'react-native';
import { Audio } from 'expo-av';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

import { ThemedView } from '@/components/ThemedView';
import { styles } from './styles';
import { MEDICAL_ICONS, MOVEMENT_PATTERNS, ICON_SIZE, SCREEN_HEIGHT } from './constants';
import { FloatingIconProps } from './types';

function FloatingIcon({ onCatch, position, startY = 0 }: FloatingIconProps & { startY?: number }) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const translateY = useSharedValue(startY);
  const translateX = useSharedValue(position);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const icon = MEDICAL_ICONS[Math.floor(Math.random() * MEDICAL_ICONS.length)];

  useEffect(() => {
    // Initialize audio with iOS settings
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });

    // Load sound
    async function loadSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('@/assets/sounds/pop.mp3'),
          { isMuted: false, isLooping: false, volume: 1.0 }
        );
        soundRef.current = sound;
        console.log('Sound loaded successfully');
      } catch (error) {
        console.log('Error loading sound:', error);
      }
    }
    
    loadSound();

    // Cleanup
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const playSound = async () => {
    try {
      if (!soundRef.current) {
        console.log('Sound not loaded yet');
        return;
      }
      await soundRef.current.stopAsync();
      await soundRef.current.setPositionAsync(0);
      await soundRef.current.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  useEffect(() => {
    // Randomly select movement pattern
    const pattern = MOVEMENT_PATTERNS[Math.floor(Math.random() * MOVEMENT_PATTERNS.length)];
    const duration = Math.random() * 1000 + 2000; // Random duration between 2-3s

    // Apply random starting delay
    const startDelay = Math.random() * 1000;

    setTimeout(() => {
      // Adjust vertical movement based on starting position
      const maxHeight = Platform.OS === 'android' ? SCREEN_HEIGHT * 0.3 : SCREEN_HEIGHT - 400;
      const verticalDistance = Math.min(maxHeight - startY, SCREEN_HEIGHT * 0.3);

      translateY.value = pattern.vertical(duration, startY);
      translateX.value = pattern.horizontal(position);
    }, startDelay);

    // Add subtle rotation for some icons
    if (Math.random() > 0.5) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1000 }),
          withTiming(0.9, { duration: 1000 })
        ),
        -1,
        true
      );
    }
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  const handlePress = async () => {
    scale.value = withSequence(
      withSpring(1.5, { damping: 10 }),
      withSpring(0, { damping: 15 })
    );
    opacity.value = withTiming(0, { duration: 200 });
    
    // Play sound on all platforms
    playSound();
    
    // Vibrate on both iOS and Android
    if (Platform.OS === 'ios') {
      Vibration.vibrate([0, 50]); // iOS pattern
    } else if (Platform.OS === 'android') {
      Vibration.vibrate(1); // Android duration
    }
    
    onCatch();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.touchArea, { left: position - ICON_SIZE }]}
    >
      <Animated.View style={[styles.floatingIcon, animatedStyle]}>
        <ThemedView style={styles.iconWrapper}>
          <MaterialIcons name={icon.name} size={ICON_SIZE} color={icon.color} />
        </ThemedView>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default FloatingIcon;