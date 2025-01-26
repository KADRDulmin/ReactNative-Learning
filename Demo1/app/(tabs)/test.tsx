import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TestScreen() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Test',
          headerShown: true,
        }} 
      />
      
      <View style={styles.section}>
        <ThemedText type="title" style={styles.title}>
          Test Screen
        </ThemedText>
        <ThemedText style={styles.description}>
          This screen can be used for testing new components and features.
        </ThemedText>
      </View>

      {/* Add test components here */}
      <View style={styles.testArea}>
        <ThemedText style={styles.testLabel}>Test Area</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginVertical: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    opacity: 0.8,
  },
  testArea: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.3)',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testLabel: {
    fontSize: 18,
    opacity: 0.5,
  },
});
