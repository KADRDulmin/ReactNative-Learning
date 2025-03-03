import { Link, Stack } from 'expo-router';
import { StyleSheet, useColorScheme, Pressable, Dimensions, Platform, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  runOnJS,
  Easing, // Add Easing from reanimated
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ICON_SIZE = 40;
const GAME_DURATION = 30; // seconds
const ICONS_COUNT = 5;

type MedicalIconName = 'local-hospital' | 'favorite' | 'healing' | 'medical-services' | 'remove-red-eye';

interface FloatingIconProps {
  onCatch: () => void;
  position: number;
}

interface GameIcon {
  id: string;
  position: number;
  startY: number;
  iconType: MedicalIconName;
}

interface BenefitTooltipProps {
  benefit: string;
  visible: boolean;
}

type WebViewStyle = {
  WebkitTapHighlightColor?: string;
  cursor?: string;
} & ViewStyle;

const MEDICAL_ICONS: { name: MedicalIconName; color: string }[] = [
  { name: 'local-hospital', color: '#F44336' },
  { name: 'favorite', color: '#E91E63' },
  { name: 'healing', color: '#2196F3' },
  { name: 'medical-services', color: '#4CAF50' },
  { name: 'remove-red-eye', color: '#9C27B0' }
];

const MEDICAL_BENEFITS = [
  "Improves hand-eye coordination essential for medical procedures",
  "Enhances rapid decision making skills needed in emergency care",
  "Develops pattern recognition important for diagnosis",
  "Boosts reaction time critical for emergency response",
  "Trains multitasking abilities needed in healthcare"
];

const SCORE_MESSAGES = {
  beginner: "You're developing medical reflexes!",
  intermediate: "Your clinical coordination is improving!",
  expert: "You're showing surgeon-level precision!"
};

const MOVEMENT_PATTERNS = [
  {
    vertical: (duration: number) => withRepeat(
      withSequence(
        withTiming(SCREEN_HEIGHT * 0.3, { duration: duration * 0.7 }),
        withTiming(0, { duration: duration * 0.3 })
      ), -1, true
    ),
    horizontal: (position: number) => withRepeat(
      withSequence(
        withTiming(position + 100, { duration: 2000 }),
        withTiming(position - 100, { duration: 2000 })
      ), -1, true
    )
  },
  {
    vertical: (duration: number) => withRepeat(
      withTiming(SCREEN_HEIGHT * 0.4, { duration }), -1, true
    ),
    horizontal: (position: number) => withRepeat(
      withSequence(
        withTiming(position + 30, { duration: 800 }),
        withTiming(position - 30, { duration: 800 })
      ), -1, true
    )
  },
  {
    vertical: (duration: number) => withRepeat(
      withSequence(
        withSpring(SCREEN_HEIGHT * 0.2),
        withSpring(0)
      ), -1, true
    ),
    horizontal: (position: number) => withRepeat(
      withSequence(
        withSpring(position + 50),
        withSpring(position - 50)
      ), -1, true
    )
  },
  {
    vertical: (duration: number, startY: number) => withRepeat(
      withSequence(
        withSpring(startY + 100),
        withSpring(startY - 100)
      ), -1, true
    ),
    horizontal: (position: number) => withRepeat(
      withSequence(
        withSpring(position + 70, { damping: 8 }),
        withSpring(position - 70, { damping: 8 })
      ), -1, true
    )
  },
  {
    vertical: (duration: number, startY: number) => withRepeat(
      withSequence(
        withTiming(startY + 150, { 
          duration: 1500, 
          easing: Easing.bezierFn(0.25, 0.1, 0.25, 1) // Use bezierFn instead of bezier
        }),
        withTiming(startY - 50, { 
          duration: 1000, 
          easing: Easing.bezierFn(0.25, 0.1, 0.25, 1)
        })
      ), -1, true
    ),
    horizontal: (position: number) => withRepeat(
      withSequence(
        withTiming(position + 100, { 
          duration: 1500,
          easing: Easing.inOut(Easing.ease)
        }),
        withTiming(position - 100, { 
          duration: 1500,
          easing: Easing.inOut(Easing.ease)
        })
      ), -1, true
    )
  }
];

// Add starting position patterns
const STARTING_POSITIONS = {
  corners: [
    { x: ICON_SIZE, y: ICON_SIZE },
    { x: SCREEN_WIDTH - ICON_SIZE * 3, y: ICON_SIZE },
    { x: ICON_SIZE, y: SCREEN_HEIGHT * 0.3 },
    { x: SCREEN_WIDTH - ICON_SIZE * 3, y: SCREEN_HEIGHT * 0.3 },
  ],
  sides: [
    { x: 0, y: SCREEN_HEIGHT * 0.15 },
    { x: SCREEN_WIDTH - ICON_SIZE * 2, y: SCREEN_HEIGHT * 0.15 },
  ],
  top: (index: number, total: number) => ({
    x: (SCREEN_WIDTH / (total + 1)) * (index + 1),
    y: 0
  })
};

const STARTING_PATTERNS = {
  circle: (index: number, total: number) => {
    const angle = (2 * Math.PI * index) / total;
    const radius = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.3;
    return {
      x: SCREEN_WIDTH / 2 + radius * Math.cos(angle),
      y: SCREEN_HEIGHT * 0.3 + radius * Math.sin(angle),
      delay: index * 200
    };
  },
  random: () => ({
    x: Math.random() * (SCREEN_WIDTH - ICON_SIZE * 3),
    y: Math.random() * (SCREEN_HEIGHT * 0.4),
    delay: Math.random() * 1000
  }),
  diagonal: (index: number, total: number) => ({
    x: (SCREEN_WIDTH / total) * index,
    y: (SCREEN_HEIGHT * 0.4 / total) * index,
    delay: index * 300
  }),
  wave: (index: number, total: number) => ({
    x: (SCREEN_WIDTH / total) * index,
    y: Math.sin(index) * 50 + SCREEN_HEIGHT * 0.2,
    delay: index * 150
  })
};

function BenefitTooltip({ benefit, visible }: BenefitTooltipProps) {
  return (
    <Animated.View 
      entering={FadeInUp.duration(500)}
      exiting={FadeInDown.duration(500)}
      style={[styles.benefitTooltip, !visible && { display: 'none' }]}>
      <ThemedText style={styles.benefitText}>{benefit}</ThemedText>
    </Animated.View>
  );
}

function FloatingIcon({ onCatch, position, startY = 0 }: FloatingIconProps & { startY?: number }) {
  const translateY = useSharedValue(startY);
  const translateX = useSharedValue(position);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const icon = MEDICAL_ICONS[Math.floor(Math.random() * MEDICAL_ICONS.length)];
  
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

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(1.5, { damping: 10 }),
      withSpring(0, { damping: 15 })
    );
    opacity.value = withTiming(0, { duration: 200 });
    onCatch();
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.touchArea, { left: position - ICON_SIZE }]}>
      <Animated.View style={[styles.floatingIcon, animatedStyle]}>
        <ThemedView style={styles.iconWrapper}>
          <MaterialIcons name={icon.name} size={ICON_SIZE} color={icon.color} />
        </ThemedView>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [icons, setIcons] = useState<GameIcon[]>([]);
  const [currentBenefit, setCurrentBenefit] = useState(MEDICAL_BENEFITS[0]);
  const [showBenefit, setShowBenefit] = useState(true);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    generateIcons();
  };

  const generateIcons = () => {
    const newIcons: GameIcon[] = [];
    const totalIcons = ICONS_COUNT;
    const pattern = Object.values(STARTING_PATTERNS)[
      Math.floor(Math.random() * Object.values(STARTING_PATTERNS).length)
    ];
    
    // Distribute icons across different starting positions
    for (let i = 0; i < totalIcons; i++) {
      const randomIcon = MEDICAL_ICONS[Math.floor(Math.random() * MEDICAL_ICONS.length)];
      const position = pattern(i, ICONS_COUNT);
      
      newIcons.push({
        id: `${Date.now()}-${i}`,
        position: position.x,
        startY: position.y,
        iconType: randomIcon.name
      });
    }
    
    // Shuffle array for random appearance
    const shuffled = newIcons.sort(() => Math.random() - 0.5);
    setIcons(shuffled);
  };

  const handleCatch = () => {
    setScore(prev => prev + 1);
    generateIcons();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameStarted(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStarted, timeLeft]);

  useEffect(() => {
    if (gameStarted) {
      const benefitInterval = setInterval(() => {
        setShowBenefit(false);
        setTimeout(() => {
          setCurrentBenefit(MEDICAL_BENEFITS[Math.floor(Math.random() * MEDICAL_BENEFITS.length)]);
          setShowBenefit(true);
        }, 500);
      }, 5000);

      return () => clearInterval(benefitInterval);
    }
  }, [gameStarted]);

  const getScoreMessage = (score: number) => {
    if (score < 5) return SCORE_MESSAGES.beginner;
    if (score < 15) return SCORE_MESSAGES.intermediate;
    return SCORE_MESSAGES.expert;
  };

  return (
    <ThemedView style={styles.container}>
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
        <ThemedText type="title" style={styles.errorCode}>404</ThemedText>
      </Animated.View>

      {!gameStarted ? (
        <Animated.View 
          entering={FadeInUp.delay(300)}
          style={styles.startContainer}>
          <ThemedText style={styles.errorDescription}>
            The page you're looking for doesn't exist, but while you're here...
          </ThemedText>
          <Pressable onPress={startGame} style={styles.startButton}>
            <ThemedText style={styles.buttonTextStyle}>
              Play Catch The Medical Icons!
            </ThemedText>
          </Pressable>
        </Animated.View>
      ) : (
        <ThemedView style={styles.gameContainer}>
          <ThemedText style={styles.gameStats}>
            Score: {score} | Time: {timeLeft}s
          </ThemedText>
          <ThemedText style={styles.scoreMessage}>
            {getScoreMessage(score)}
          </ThemedText>
          <BenefitTooltip benefit={currentBenefit} visible={showBenefit} />
          {icons.map(icon => (
            <FloatingIcon
              key={icon.id}
              position={icon.position}
              startY={icon.startY}
              onCatch={handleCatch}
            />
          ))}
        </ThemedView>
      )}

      {timeLeft === 0 && (
        <Animated.View 
          entering={FadeInDown.springify()} 
          style={[
            styles.gameOver,
            { backgroundColor: colorScheme === 'dark' ? '#2C2C2C' : '#FFFFFF' }
          ]}>
          <ThemedText type="title">Game Over!</ThemedText>
          <ThemedText style={styles.scoreText}>Final Score: {score}</ThemedText>
          <ThemedText style={styles.benefitSummary}>
            You've practiced skills essential for medical precision!
          </ThemedText>
          <Pressable onPress={startGame} style={styles.retryButtonStyle}>
            <ThemedText style={styles.buttonText}>Play Again</ThemedText>
          </Pressable>
        </Animated.View>
      )}

      <Link href="/" style={styles.link}>
        <ThemedText type="link">Return Home</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 30,
  },
  logo: {
    width: 200,
    height: 60,
  },
  errorContainer: {
    alignItems: 'center',
    gap: 10,
  },
  errorCode: {
    marginTop: 10,
    paddingTop: 45,
    fontSize: 80,
    fontWeight: 'bold',
  },
  errorTitle: {
    fontSize: 24,
    textAlign: 'center',
  },
  errorDescription: {
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.8,
  },
  buttonContainer: {
    marginTop: 20,
    overflow: 'hidden',
    borderRadius: 25,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 60,
  },
  gameContainer: {
    position: 'relative',
    width: '100%',
    height: Platform.OS === 'android' ? SCREEN_HEIGHT * 0.5 : SCREEN_HEIGHT * 0.6,
    alignItems: 'center',
    marginVertical: 20,
    overflow: 'visible', // Changed to visible to allow touches
    borderRadius: 20,
    ...(Platform.OS === 'android' && {
      backgroundColor: 'rgba(255,255,255,0.05)',
      paddingBottom: 40,
    }),
  },
  gameStats: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: Platform.OS === 'ios' ? '#007AFF' : '#2196F3',
    marginBottom: 5, // Add this to accommodate scoreMessage
  },
  floatingIcon: {
    width: ICON_SIZE * 1.5,
    height: ICON_SIZE * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Add this for better touch handling on Android
  },
  startButton: {
    backgroundColor: Platform.select({
      web: '#007AFF',
      ios: '#007AFF',
      android: '#2196F3'
    }),
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    ...(Platform.OS === 'web' ? {
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
      transition: 'transform 0.2s ease',
      ':hover': {
        transform: 'scale(1.05)'
      }
    } as WebViewStyle : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: Platform.OS === 'android' ? 5 : 0,
    })
  },
  gameOver: {
    position: 'absolute',
    top: '40%',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    ...(Platform.OS === 'web' ? {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      transform: 'translateZ(0)'
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    })
  },
  scoreText: {
    fontSize: 20,
    marginVertical: 10,
  },
  iconWrapper: {
    width: ICON_SIZE * 1.5,
    height: ICON_SIZE * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (ICON_SIZE * 1.5) / 2,
    backgroundColor: Platform.select({
      ios: 'rgba(255, 255, 255, 0.9)',
      android: 'rgba(255, 255, 255, 0.95)',
      web: 'rgba(255, 255, 255, 0.95)'
    }),
    ...(Platform.OS === 'android' ? {
      elevation: 12, // Increased elevation
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
      backgroundColor: '#FFFFFF',
    } : undefined),
  },
  startContainer: {
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  retryButtonStyle: {
    backgroundColor: Platform.select({
      web: '#007AFF',
      ios: '#007AFF',
      android: '#2196F3'
    }),
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
      cursor: 'pointer'
    } as WebViewStyle : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: Platform.OS === 'android' ? 5 : 0,
    })
  },
  benefitTooltip: {
    position: 'absolute',
    top: 70,
    backgroundColor: Platform.OS === 'web' ? 'rgba(0, 122, 255, 0.9)' : '#007AFF',
    padding: 12,
    borderRadius: 8,
    maxWidth: '80%',
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
    } : {}),
  },
  
  benefitText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  
  scoreMessage: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  
  benefitSummary: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
    opacity: 0.8,
    maxWidth: '80%',
  },
  touchArea: {
    position: 'absolute',
    width: ICON_SIZE * 3, // Increased touch area
    height: ICON_SIZE * 3,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    // Debug style (remove in production)
    // backgroundColor: 'rgba(255,0,0,0.1)',
  },
});
