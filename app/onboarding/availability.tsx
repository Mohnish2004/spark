import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Check } from 'lucide-react-native';

export default function AvailabilitySetup() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times = ['Morning (9-12pm)', 'Afternoon (12-5pm)', 'Evening (5-8pm)'];
  const formats = ['Coffee Chat', 'Virtual Meeting', 'Lunch Meeting', 'Walking Meeting'];

  const toggleSelection = (item: string, selectedArray: string[], setSelectedArray: (arr: string[]) => void) => {
    if (selectedArray.includes(item)) {
      setSelectedArray(selectedArray.filter(i => i !== item));
    } else {
      setSelectedArray([...selectedArray, item]);
    }
  };

  const handleFinish = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Availability & Preferences</Text>
          <Text style={styles.subtitle}>
            Help us suggest the best times and formats for your connections.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred Days</Text>
          <View style={styles.optionsGrid}>
            {days.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.option,
                  selectedDays.includes(day) && styles.selectedOption
                ]}
                onPress={() => toggleSelection(day, selectedDays, setSelectedDays)}
              >
                <Text style={[
                  styles.optionText,
                  selectedDays.includes(day) && styles.selectedOptionText
                ]}>
                  {day}
                </Text>
                {selectedDays.includes(day) && (
                  <Check size={16} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred Times</Text>
          <View style={styles.optionsGrid}>
            {times.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.option,
                  selectedTimes.includes(time) && styles.selectedOption
                ]}
                onPress={() => toggleSelection(time, selectedTimes, setSelectedTimes)}
              >
                <Text style={[
                  styles.optionText,
                  selectedTimes.includes(time) && styles.selectedOptionText
                ]}>
                  {time}
                </Text>
                {selectedTimes.includes(time) && (
                  <Check size={16} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meeting Formats</Text>
          <View style={styles.optionsGrid}>
            {formats.map((format) => (
              <TouchableOpacity
                key={format}
                style={[
                  styles.option,
                  selectedFormats.includes(format) && styles.selectedOption
                ]}
                onPress={() => toggleSelection(format, selectedFormats, setSelectedFormats)}
              >
                <Text style={[
                  styles.optionText,
                  selectedFormats.includes(format) && styles.selectedOptionText
                ]}>
                  {format}
                </Text>
                {selectedFormats.includes(format) && (
                  <Check size={16} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.finishButton}
          onPress={handleFinish}
        >
          <Text style={styles.finishText}>Start Connecting</Text>
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
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    lineHeight: 24,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  selectedOption: {
    backgroundColor: '#FF6900',
    borderColor: '#FF6900',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1A1A1A',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  finishButton: {
    backgroundColor: '#FF6900',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  finishText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});