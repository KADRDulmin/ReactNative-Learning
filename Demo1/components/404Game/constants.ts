// app/components/404Game/constants.ts
import { Dimensions } from 'react-native';
import {
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
    Easing // Change this import to be from react-native-reanimated
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ICON_SIZE = 40;
const GAME_DURATION = 30; // seconds
const ICONS_COUNT = 5;

type MedicalIconName = 'local-hospital' | 'favorite' | 'healing' | 'medical-services' | 'remove-red-eye';

const MEDICAL_ICONS: { name: MedicalIconName; color: string }[] = [
    { name: 'local-hospital', color: '#F44336' },
    { name: 'favorite', color: '#E91E63' },
    { name: 'healing', color: '#2196F3' },
    { name: 'medical-services', color: '#4CAF50' },
    { name: 'remove-red-eye', color: '#9C27B0' },
];

const MEDICAL_BENEFITS = [
    'Improves hand-eye coordination essential for medical procedures',
    'Enhances rapid decision making skills needed in emergency care',
    'Develops pattern recognition important for diagnosis',
    'Boosts reaction time critical for emergency response',
    'Trains multitasking abilities needed in healthcare',
];

const SCORE_MESSAGES = {
    beginner: "You're developing medical reflexes!",
    intermediate: 'Your clinical coordination is improving!',
    expert: "You're showing surgeon-level precision!",
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
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1)  // Removed .factory()
                }),
                withTiming(startY - 50, {
                    duration: 1000,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1)  // Removed .factory()
                })
            ), -1, true
        ),
        horizontal: (position: number) => withRepeat(
            withSequence(
                withTiming(position + 100, {
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease)  // Removed .factory()
                }),
                withTiming(position - 100, {
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease)  // Removed .factory()
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

export {
    ICON_SIZE,
    GAME_DURATION,
    ICONS_COUNT,
    MEDICAL_ICONS,
    MEDICAL_BENEFITS,
    SCORE_MESSAGES,
    MOVEMENT_PATTERNS,
    STARTING_POSITIONS,
    STARTING_PATTERNS,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
};

export type { MedicalIconName };