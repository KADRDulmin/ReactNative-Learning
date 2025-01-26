// app/components/404Game/BenefitTooltip.tsx
import React from 'react';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { styles } from './styles';
import { BenefitTooltipProps } from './types';

function BenefitTooltip({ benefit, visible }: BenefitTooltipProps) {
  return (
    <Animated.View
      entering={FadeInUp.duration(500)}
      exiting={FadeInDown.duration(500)}
      style={[styles.benefitTooltip, !visible && { display: 'none' }]}
    >
      <ThemedText style={styles.benefitText}>{benefit}</ThemedText>
    </Animated.View>
  );
}

export default BenefitTooltip;