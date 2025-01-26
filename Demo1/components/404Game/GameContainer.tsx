// app/components/404Game/GameContainer.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import FloatingIcon from './FloatingIcon';
import BenefitTooltip from './BenefitTooltip';
import { styles } from './styles';
import {
  GAME_DURATION,
  MEDICAL_BENEFITS,
  SCORE_MESSAGES,
  ICONS_COUNT,
  MEDICAL_ICONS,
  STARTING_PATTERNS,
} from './constants';
import { GameIcon } from './types';
import { getScoreMessage } from './utils';

interface GameContainerProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

function GameContainer({ score, setScore, timeLeft, setTimeLeft, setGameStarted }: GameContainerProps) {
  const [icons, setIcons] = useState<GameIcon[]>([]);
  const [currentBenefit, setCurrentBenefit] = useState(MEDICAL_BENEFITS[0]);
  const [showBenefit, setShowBenefit] = useState(true);

  const generateIcons = useCallback(() => {
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
        iconType: randomIcon.name,
      });
    }

    // Shuffle array for random appearance
    const shuffled = newIcons.sort(() => Math.random() - 0.5);
    setIcons(shuffled);
  }, []);

  const handleCatch = useCallback(() => {
    setScore((prevScore: number) => prevScore + 1);
    generateIcons();
  }, [setScore, generateIcons]);

  useEffect(() => {
    generateIcons();
  }, [generateIcons]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev: number) => {
          if (prev <= 1) {
            setGameStarted(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setGameStarted(false);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, setTimeLeft, setGameStarted]);

  useEffect(() => {
    const benefitInterval = setInterval(() => {
      setShowBenefit(false);
      setTimeout(() => {
        setCurrentBenefit(MEDICAL_BENEFITS[Math.floor(Math.random() * MEDICAL_BENEFITS.length)]);
        setShowBenefit(true);
      }, 500);
    }, 5000);

    return () => clearInterval(benefitInterval);
  }, []);


  return (
    <ThemedView style={styles.gameContainer}>
      <ThemedText style={styles.gameStats}>
        Score: {score} | Time: {timeLeft}s
      </ThemedText>
      <ThemedText style={styles.scoreMessage}>
        {getScoreMessage(score)}
      </ThemedText>
      <BenefitTooltip benefit={currentBenefit} visible={showBenefit} />
      {icons.map((icon) => (
        <FloatingIcon
          key={icon.id}
          position={icon.position}
          startY={icon.startY}
          onCatch={handleCatch}
        />
      ))}
    </ThemedView>
  );
}

export default GameContainer;