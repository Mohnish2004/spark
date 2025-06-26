import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, CreditCard as Edit3, MapPin, Briefcase, Calendar, Award, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, Users, TrendingUp, Clock, Star } from 'lucide-react-native';

export default function ProfileTab() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [availabilityEnabled, setAvailabilityEnabled] = useState(true);

  const stats = [
    { label: 'Connections', value: '24', icon: Users, color: '#0078D4' },
    { label: 'Meetings', value: '12', icon: Calendar, color: '#107C10' },
    { label: 'Reviews', value: '8', icon: Star, color: '#FF8C00' },
    { label: 'Growth', value: '+15%', icon: TrendingUp, color: '#D13438' }
  ];

  const achievements = [
    {
      title: 'Top Performer Q2 2024',
      description: 'Recognized for exceptional project delivery and team collaboration',
      icon: Award,
      color: '#FF8C00',
      date: 'June 2024'
    },
    {
      title: 'Mentor of the Year',
      description: 'Helped 15+ engineers grow their careers through dedicated mentorship',
      icon: Users,
      color: '#107C10',
      date: 'December 2023'
    },
    {
      title: 'Innovation Champion',
      description: 'Led breakthrough initiative in cloud architecture optimization',
      icon: TrendingUp,
      color: '#0078D4',
      date: 'March 2024'
    }
  ];

  const menuItems = [
    { title: 'Edit Profile', icon: Edit3, color: '#0078D4' },
    { title: 'Availability Settings', icon: Clock, color: '#107C10' },
    { title: 'Privacy & Security', icon: Shield, color: '#D13438' },
    { title: 'Help & Support', icon: HelpCircle, color: '#FF8C00' },
    { title: 'Sign Out', icon: LogOut, color: '#605E5C' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={20} color="#605E5C" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Edit3 size={16} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.statusIndicator} />
          </View>
          
          <Text style={styles.profileName}>Alex Thompson</Text>
          <Text style={styles.profileTitle}>Senior Software Engineer</Text>
          <Text style={styles.profileDepartment}>Microsoft Azure</Text>
          
          <View style={styles.profileStats}>
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <View key={index} style={styles.statItem}>
                  <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                    <IconComponent size={16} color={stat.color} />
                  </View>
                  <Text style={styles.statNumber}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Briefcase size={20} color="#605E5C" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Department</Text>
                <Text style={styles.infoValue}>Microsoft Azure</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <MapPin size={20} color="#605E5C" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>Redmond, WA</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <Calendar size={20} color="#605E5C" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Joined</Text>
                <Text style={styles.infoValue}>March 2019</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expertise</Text>
          <View style={styles.tagsContainer}>
            {['Cloud Architecture', 'Microservices', 'DevOps', 'Kubernetes', 'Node.js', 'React', 'Azure', 'Docker'].map((tag, index) => (
              <View key={index} style={styles.expertiseTag}>
                <Text style={styles.expertiseTagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievementsList}>
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <View key={index} style={styles.achievementItem}>
                  <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '20' }]}>
                    <IconComponent size={20} color={achievement.color} />
                  </View>
                  <View style={styles.achievementContent}>
                    <View style={styles.achievementHeader}>
                      <Text style={styles.achievementTitle}>{achievement.title}</Text>
                      <Text style={styles.achievementDate}>{achievement.date}</Text>
                    </View>
                    <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.preferencesCard}>
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <Bell size={20} color="#605E5C" />
                <Text style={styles.preferenceText}>Push Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#EDEBE9', true: '#0078D4' }}
                thumbColor="#FFFFFF"
              />
            </View>
            
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <Clock size={20} color="#605E5C" />
                <Text style={styles.preferenceText}>Show Availability</Text>
              </View>
              <Switch
                value={availabilityEnabled}
                onValueChange={setAvailabilityEnabled}
                trackColor={{ false: '#EDEBE9', true: '#0078D4' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuCard}>
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity key={index} style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <IconComponent size={20} color={item.color} />
                    <Text style={styles.menuItemText}>{item.title}</Text>
                  </View>
                  <ChevronRight size={16} color="#605E5C" />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Spark v1.0.0</Text>
          <Text style={styles.footerSubtext}>A Microsoft Experience</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F8',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  editImageButton: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 36,
    height: 36,
    borderRadius: 4,
    backgroundColor: '#0078D4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  statusIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#107C10',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileName: {
    fontSize: 28,
    fontFamily: 'Inter-SemiBold',
    color: '#323130',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
    marginBottom: 2,
  },
  profileDepartment: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
    marginBottom: 24,
  },
  profileStats: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EDEBE9',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#323130',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
    textAlign: 'center',
  },
  infoSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#323130',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EDEBE9',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#323130',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  expertiseTag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#0078D4',
  },
  expertiseTagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#0078D4',
  },
  achievementsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EDEBE9',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 16,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementContent: {
    flex: 1,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#323130',
    flex: 1,
  },
  achievementDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
    lineHeight: 20,
  },
  preferencesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EDEBE9',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  preferenceText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#323130',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: '#EDEBE9',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#323130',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
  },
});