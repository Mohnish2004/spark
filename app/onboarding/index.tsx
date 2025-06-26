import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function OnboardingWelcome() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0078D4', '#106EBE']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>✨</Text>
            </View>
            <Text style={styles.brandName}>Spark</Text>
            <Text style={styles.tagline}>Ignite. Connect. Grow.</Text>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              Connect with colleagues, mentors, and industry leaders. 
              Build meaningful professional relationships that spark growth.
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={() => router.push('/onboarding/profile')}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
          
          <View style={styles.microsoftBranding}>
            <Text style={styles.microsoftText}>A Microsoft Experience</Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 48,
  },
  brandName: {
    fontSize: 36,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  descriptionContainer: {
    marginBottom: 80,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  getStartedButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 4,
    marginBottom: 40,
  },
  getStartedText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#0078D4',
  },
  microsoftBranding: {
    position: 'absolute',
    bottom: 40,
  },
  microsoftText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
  },
});