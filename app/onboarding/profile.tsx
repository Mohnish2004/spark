import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Camera, ArrowRight, ChevronLeft } from 'lucide-react-native';

export default function ProfileSetup() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  const handleContinue = () => {
    router.push('/onboarding/availability');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ChevronLeft size={24} color="#323130" />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
          <Text style={styles.progressText}>Step 1 of 2</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Your Profile</Text>
          <Text style={styles.subtitle}>
            Tell us about yourself so we can help you connect with the right people.
          </Text>
        </View>

        <View style={styles.photoSection}>
          <View style={styles.photoPlaceholder}>
            <Camera size={32} color="#605E5C" />
          </View>
          <TouchableOpacity style={styles.photoButton}>
            <Text style={styles.photoButtonText}>Add Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor="#605E5C"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Job Title *</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="e.g., Senior Product Manager"
              placeholderTextColor="#605E5C"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Department</Text>
            <TextInput
              style={styles.input}
              value={department}
              onChangeText={setDepartment}
              placeholder="e.g., Product Engineering"
              placeholderTextColor="#605E5C"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="e.g., Redmond, WA"
              placeholderTextColor="#605E5C"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about your interests, goals, and what you're looking to achieve through connections..."
              placeholderTextColor="#605E5C"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.continueButton, (!name || !title) && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!name || !title}
        >
          <Text style={[styles.continueText, (!name || !title) && styles.disabledText]}>
            Continue
          </Text>
          <ArrowRight size={20} color={(!name || !title) ? '#605E5C' : '#FFFFFF'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEBE9',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#F3F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#EDEBE9',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0078D4',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-SemiBold',
    color: '#323130',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
    lineHeight: 24,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#F3F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#EDEBE9',
    borderStyle: 'dashed',
  },
  photoButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#0078D4',
  },
  photoButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#0078D4',
  },
  form: {
    paddingHorizontal: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#323130',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EDEBE9',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#323130',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#EDEBE9',
  },
  continueButton: {
    backgroundColor: '#0078D4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 4,
    gap: 8,
  },
  disabledButton: {
    backgroundColor: '#F3F2F1',
  },
  continueText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  disabledText: {
    color: '#605E5C',
  },
});