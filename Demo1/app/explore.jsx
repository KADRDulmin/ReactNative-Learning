import { StyleSheet, Image, Platform, Dimensions, useColorScheme } from 'react-native';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  SlideInRight,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function AboutUsScreen() {
  const colorScheme = useColorScheme();
  const floatValue = useSharedValue(0);

  useEffect(() => {
    floatValue.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 1000 }),
        withTiming(-10, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatValue.value }],
  }));

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/Header_Image1.jpg')}
          style={styles.headerImage}
        />
      }>
      
      <Animated.View 
        entering={FadeInDown.duration(1000).springify()}
        style={styles.logoContainer}>
        <Animated.Image 
          source={
            colorScheme === 'dark' 
              ? require('@/assets/images/Doc-Assist_Pro_Logo_White.png')
              : require('@/assets/images/Doc-Assist_Pro_Logo.png')
          }
          style={[styles.logo, floatingStyle]}
        />
      </Animated.View>

      <Animated.View 
        entering={FadeInUp.delay(500)} 
        style={[styles.titleContainer]}>
        <ThemedText type="title">About Doc-Assist Pro</ThemedText>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(800)}>
        <ThemedText style={styles.introText}>
          Revolutionizing healthcare documentation through intelligent automation and seamless collaboration.
        </ThemedText>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(800)}>
        <Collapsible title="Our Mission">
          <ThemedView style={styles.contentWrapper}>
            <ThemedText style={styles.contentText}>
              Doc-Assist Pro aims to transform healthcare documentation by providing an innovative solution 
              that combines AI-powered automation with intuitive user experience, helping healthcare 
              professionals focus more on patient care and less on paperwork.
            </ThemedText>
          </ThemedView>
        </Collapsible>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(1000)}>
        <Collapsible title="The Problem We Solve">
          <ThemedView style={styles.contentWrapper}>
            <ThemedText style={styles.contentText}>
              Healthcare professionals spend excessive time on documentation, facing challenges with:
            </ThemedText>
            <ThemedView style={styles.bulletPoints}>
              <IconSymbol name="arrow-right" size={16} />
              <ThemedText>Manual data entry burden</ThemedText>
            </ThemedView>
            <ThemedView style={styles.bulletPoints}>
              <IconSymbol name="arrow-right" size={16} />
              <ThemedText>Inconsistent documentation quality</ThemedText>
            </ThemedView>
            <ThemedView style={styles.bulletPoints}>
              <IconSymbol name="arrow-right" size={16} />
              <ThemedText>Limited time for patient care</ThemedText>
            </ThemedView>
          </ThemedView>
        </Collapsible>
      </Animated.View>

      <Collapsible title="Key Features">
        <ThemedView style={styles.featureContainer}>
          {[
            {
              icon: 'document',
              title: 'Smart Documentation',
              description: 'AI-powered automated documentation generation',
            },
            {
              icon: 'voice',
              title: 'Voice Recognition',
              description: 'Advanced speech-to-text capabilities',
            },
            {
              icon: 'shield',
              title: 'Security First',
              description: 'HIPAA-compliant data protection',
            },
          ].map((feature, index) => (
            <Animated.View
              key={feature.title}
              entering={SlideInRight.delay(index * 200)}
              style={[styles.feature]}>
              <ThemedView style={styles.featureContent}>
                <IconSymbol name={feature.icon} size={24} style={styles.featureIcon} />
                <ThemedText type="defaultSemiBold">{feature.title}</ThemedText>
                <ThemedText>{feature.description}</ThemedText>
              </ThemedView>
            </Animated.View>
          ))}
        </ThemedView>
      </Collapsible>

      <Collapsible title="Technology Stack">
        <ThemedText style={styles.contentText}>
          Built using cutting-edge technologies:
        </ThemedText>
        <ThemedView style={styles.techStack}>
          <ThemedText type="defaultSemiBold">Frontend:</ThemedText>
          <ThemedText>React Native & Expo</ThemedText>
          <ThemedText type="defaultSemiBold">Backend:</ThemedText>
          <ThemedText>Node.js & Express</ThemedText>
          <ThemedText type="defaultSemiBold">AI Integration:</ThemedText>
          <ThemedText>OpenAI GPT & Azure AI</ThemedText>
        </ThemedView>
      </Collapsible>

      <Animated.View 
        entering={FadeInUp.delay(1200)}
        style={[styles.contactSection]}>
        <ThemedView style={styles.contactContent}>
          <ThemedText type="title">Contact Us</ThemedText>
          <ThemedText style={styles.contactText}>
            Interested in learning more about Doc-Assist Pro?
          </ThemedText>
          <ExternalLink href="mailto:contact@doc-assist.pro">
            <ThemedText type="link">contact@doc-assist.pro</ThemedText>
          </ExternalLink>
        </ThemedView>
      </Animated.View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  introText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  contentText: {
    marginBottom: 12,
  },
  bulletPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 4,
  },
  featureContainer: {
    flexDirection: 'column',
    gap: 20,
    marginTop: 8,
  },
  feature: {
    backgroundColor: Platform.select({
      ios: 'rgba(255, 255, 255, 0.1)',
      android: 'rgba(255, 255, 255, 0.05)',
    }),
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 8,
  },
  featureIcon: {
    marginBottom: 8,
  },
  techStack: {
    marginTop: 12,
    gap: 4,
  },
  contactSection: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
    gap: 8,
  },
  contactText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
    height: 120,
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
  },
  floatingIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 20,
    resizeMode: 'contain',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  contentWrapper: {
    padding: 8,
  },
  featureContent: {
    alignItems: 'center',
    padding: 16,
  },
  contactContent: {
    alignItems: 'center',
    width: '100%',
  },
});
