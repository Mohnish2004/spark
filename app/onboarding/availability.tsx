import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Check, ChevronLeft, Coffee, Video, Users, MapPin } from 'lucide-react-native';

export default function AvailabilitySetup() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const days = [
    { name: 'Monday', short: 'Mon' },
    { name: 'Tuesday', short: 'Tue' },
    { name: 'Wednesday', short: 'Wed' },
    { name: 'Thursday', short: 'Thu' },
    { name: 'Friday', short: 'Fri' }
  ];

  const times = [
    { name: 'Morning (9-12pm)', icon: '🌅' },
    { name: 'Afternoon (12-5pm)', icon: '☀️' },
    { name: 'Evening (5-8pm)', icon: '🌆' }
  ];

  const formats = [
    { name: 'Coffee Chat', icon: Coffee, color: '#8B4513' },
    { name: 'Virtual Meeting', icon: Video, color: '#0078D4' },
    { name: 'Lunch Meeting', icon: Coffee, color: '#FF8C00' },
    { name: 'Walking Meeting', icon: Users, color: '#107C10' }
  ];

  const locations = [
    { name: 'Redmond Campus', icon: MapPin },
    { name: 'Seattle Office', icon: MapPin },
    { name: 'Remote/Virtual', icon: Video },
    { name: 'Local Coffee Shops', icon: Coffee }
  ];

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
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
          <Text style={styles.progressText}>Step 2 of 2</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Availability & Preferences</Text>
          <Text style={styles.subtitle}>
            Help us suggest the best times and formats for your connections.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred Days</Text>
          <View style={styles.daysGrid}>
            {days.map((day) => (
              <TouchableOpacity
                key={day.name}
                style={[
                  styles.dayOption,
                  selectedDays.includes(day.name) && styles.selectedOption
                ]}
                onPress={() => toggleSelection(day.name, selectedDays, setSelectedDays)}
              >
                <Text style={[
                  styles.dayShort,
                  selectedDays.includes(day.name) && styles.selectedOptionText
                ]}>
                  {day.short}
                </Text>
                <Text style={[
                  styles.dayFull,
                  selectedDays.includes(day.name) && styles.selectedOptionText
                ]}>
                  {day.name}
                </Text>
                {selectedDays.includes(day.name) && (
                  <Check size={16} color="#FFFFFF" style={styles.checkIcon} />
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
                key={time.name}
                style={[
                  styles.timeOption,
                  selectedTimes.includes(time.name) && styles.selectedOption
                ]}
                onPress={() => toggleSelection(time.name, selectedTimes, setSelectedTimes)}
              >
                <Text style={styles.timeIcon}>{time.icon}</Text>
                <Text style={[
                  styles.optionText,
                  selectedTimes.includes(time.name) && styles.selectedOptionText
                ]}>
                  {time.name}
                </Text>
                {selectedTimes.includes(time.name) && (
                  <Check size={16} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meeting Formats</Text>
          <View style={styles.optionsGrid}>
            {formats.map((format) => {
              const IconComponent = format.icon;
              return (
                <TouchableOpacity
                  key={format.name}
                  style={[
                    styles.formatOption,
                    selectedFormats.includes(format.name) && styles.selectedOption
                  ]}
                  onPress={() => toggleSelection(format.name, selectedFormats, setSelectedFormats)}
                >
                  <IconComponent 
                    size={20} 
                    color={selectedFormats.includes(format.name) ? '#FFFFFF' : format.color} 
                  />
                  <Text style={[
                    styles.optionText,
                    selectedFormats.includes(format.name) && styles.selectedOptionText
                  ]}>
                    {format.name}
                  </Text>
                  {selectedFormats.includes(format.name) && (
                    <Check size={16} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred Locations</Text>
          <View style={styles.optionsGrid}>
            {locations.map((location) => {
              const IconComponent = location.icon;
              return (
                <TouchableOpacity
                  key={location.name}
                  style={[
                    styles.locationOption,
                    selectedLocations.includes(location.name) && styles.selectedOption
                  ]}
                  onPress={() => toggleSelection(location.name, selectedLocations, setSelectedLocations)}
                >
                  <IconComponent 
                    size={20} 
                    color={selectedLocations.includes(location.name) ? '#FFFFFF' : '#605E5C'} 
                  />
                  <Text style={[
                    styles.optionText,
                    selectedLocations.includes(location.name) && styles.selectedOptionText
                  ]}>
                    {location.name}
                  </Text>
                  {selectedLocations.includes(location.name) && (
                    <Check size={16} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              );
            })}
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
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#323130',
    marginBottom: 16,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  dayOption: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EDEBE9',
    backgroundColor: '#FFFFFF',
    minWidth: 80,
    position: 'relative',
  },
  dayShort: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#323130',
    marginBottom: 2,
  },
  dayFull: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
  },
  checkIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EDEBE9',
    backgroundColor: '#FFFFFF',
    gap: 8,
    minWidth: 160,
  },
  timeIcon: {
    fontSize: 20,
  },
  formatOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EDEBE9',
    backgroundColor: '#FFFFFF',
    gap: 8,
    minWidth: 140,
  },
  locationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EDEBE9',
    backgroundColor: '#FFFFFF',
    gap: 8,
    minWidth: 150,
  },
  selectedOption: {
    backgroundColor: '#0078D4',
    borderColor: '#0078D4',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#323130',
    flex: 1,
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#EDEBE9',
  },
  finishButton: {
    backgroundColor: '#0078D4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 4,
  },
  finishText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});