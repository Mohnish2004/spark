import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-deck-swiper';
import { X, Heart, MapPin, Clock, Briefcase, Filter, Zap, Calendar, MessageSquare } from 'lucide-react-native';

const { height, width } = Dimensions.get('window');

const mockProfiles = [
  {
    id: 1,
    name: 'Sarah Boyd',
    title: 'Senior Product Manager',
    department: 'Microsoft Teams',
    location: 'Redmond, WA',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['Leadership', 'Product Strategy', 'Teams Platform'],
    matchScore: 92,
    availability: 'Available this week',
    bio: 'Passionate about building products that connect people. Leading the next generation of collaboration tools at Microsoft Teams.',
    interests: ['Product Management', 'User Experience', 'Team Leadership'],
    experience: '8 years at Microsoft',
    mutualConnections: 12,
    recentActivity: 'Spoke at Product Leadership Summit'
  },
  {
    id: 2,
    name: 'Carolina O\'clock',
    title: 'Executive Vice President',
    department: 'Cloud + AI',
    location: 'Seattle, WA',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['Executive Leadership', 'Cloud Strategy', 'AI Innovation'],
    matchScore: 87,
    availability: 'Available next week',
    bio: 'Driving Microsoft\'s cloud and AI strategy. Passionate about empowering organizations through intelligent technology.',
    interests: ['Cloud Computing', 'Artificial Intelligence', 'Digital Transformation'],
    experience: '15 years in tech leadership',
    mutualConnections: 8,
    recentActivity: 'Keynote at Microsoft Build'
  },
  {
    id: 3,
    name: 'Marcus Chen',
    title: 'Principal Engineer',
    department: 'Azure Infrastructure',
    location: 'Redmond, WA',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['Engineering Excellence', 'Azure', 'Distributed Systems'],
    matchScore: 94,
    availability: 'Available today',
    bio: 'Building the future of cloud infrastructure. Focused on scalable, reliable systems that power millions of applications.',
    interests: ['System Architecture', 'Cloud Infrastructure', 'Performance Engineering'],
    experience: '12 years in distributed systems',
    mutualConnections: 15,
    recentActivity: 'Published paper on distributed computing'
  },
  {
    id: 4,
    name: 'Jennifer Walsh',
    title: 'Design Director',
    department: 'Microsoft Design',
    location: 'San Francisco, CA',
    image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['Design Leadership', 'User Experience', 'Design Systems'],
    matchScore: 89,
    availability: 'Available this afternoon',
    bio: 'Leading design innovation across Microsoft\'s product ecosystem. Advocate for inclusive and accessible design.',
    interests: ['Design Systems', 'Accessibility', 'Design Leadership'],
    experience: '10 years in design',
    mutualConnections: 6,
    recentActivity: 'Launched new design system'
  }
];

export default function DiscoverTab() {
  const [cardIndex, setCardIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Career');
  const [showFilters, setShowFilters] = useState(false);
  const swiperRef = useRef<Swiper<any>>(null);

  const categories = [
    { name: 'Career', icon: Briefcase, description: 'Professional growth' },
    { name: 'Serendipity', icon: Zap, description: 'Unexpected connections' },
    { name: 'Casual', icon: MessageSquare, description: 'Informal chats' }
  ];

  const handleSwipeLeft = () => {
    swiperRef.current?.swipeLeft();
  };

  const handleSwipeRight = () => {
    swiperRef.current?.swipeRight();
  };

  const renderCard = (profile: any) => {
    if (!profile) return null;

    return (
      <View style={styles.card}>
        <Image source={{ uri: profile.image }} style={styles.cardImage} />
        
        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>{profile.matchScore}% Match</Text>
        </View>
        
        <ScrollView style={styles.cardContent} showsVerticalScrollIndicator={false}>
          <View style={styles.profileHeader}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.title}>{profile.title}</Text>
          </View>
          
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Briefcase size={16} color="#605E5C" />
              <Text style={styles.infoText}>{profile.department}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <MapPin size={16} color="#605E5C" />
              <Text style={styles.infoText}>{profile.location}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Clock size={16} color="#605E5C" />
              <Text style={styles.infoText}>{profile.availability}</Text>
            </View>
          </View>

          <View style={styles.bioSection}>
            <Text style={styles.bioText}>{profile.bio}</Text>
          </View>

          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.mutualConnections}</Text>
              <Text style={styles.statLabel}>Mutual connections</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.experience}</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
          </View>

          <View style={styles.activitySection}>
            <Text style={styles.activityLabel}>Recent activity</Text>
            <Text style={styles.activityText}>{profile.recentActivity}</Text>
          </View>
          
          <View style={styles.tagsContainer}>
            {profile.tags.map((tag: string, index: number) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <View style={styles.interestsSection}>
            <Text style={styles.interestsLabel}>Interests</Text>
            <View style={styles.interestsContainer}>
              {profile.interests.map((interest: string, index: number) => (
                <View key={index} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Discover</Text>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color="#323130" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.categoryTabs}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TouchableOpacity
                key={category.name}
                style={[
                  styles.categoryTab,
                  selectedCategory === category.name && styles.activeCategoryTab
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <IconComponent 
                  size={16} 
                  color={selectedCategory === category.name ? '#FFFFFF' : '#605E5C'} 
                />
                <Text style={[
                  styles.categoryTabText,
                  selectedCategory === category.name && styles.activeCategoryTabText
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.categoryDescription}>
          {categories.find(c => c.name === selectedCategory)?.description}
        </Text>
      </View>

      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={mockProfiles}
          renderCard={renderCard}
          onSwipedLeft={(cardIndex) => {
            console.log('Passed:', mockProfiles[cardIndex]);
          }}
          onSwipedRight={(cardIndex) => {
            console.log('Connected:', mockProfiles[cardIndex]);
          }}
          cardIndex={cardIndex}
          backgroundColor="transparent"
          stackSize={2}
          stackSeparation={12}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          overlayLabels={{
            left: {
              title: 'PASS',
              style: {
                label: {
                  backgroundColor: '#D13438',
                  color: 'white',
                  fontSize: 20,
                  fontFamily: 'Inter-SemiBold',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 4,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 24,
                  marginLeft: -24,
                },
              },
            },
            right: {
              title: 'CONNECT',
              style: {
                label: {
                  backgroundColor: '#0078D4',
                  color: 'white',
                  fontSize: 20,
                  fontFamily: 'Inter-SemiBold',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 4,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 24,
                  marginLeft: 24,
                },
              },
            },
          }}
        />
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.passButton} onPress={handleSwipeLeft}>
          <X size={24} color="#D13438" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.scheduleButton}>
          <Calendar size={20} color="#0078D4" />
          <Text style={styles.scheduleText}>Schedule</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.connectButton} onPress={handleSwipeRight}>
          <Heart size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F8',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEBE9',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
    color: '#323130',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#F3F2F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: '#F3F2F1',
    gap: 8,
  },
  activeCategoryTab: {
    backgroundColor: '#0078D4',
  },
  categoryTabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#605E5C',
  },
  activeCategoryTabText: {
    color: '#FFFFFF',
  },
  categoryDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
  },
  swiperContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    height: height * 0.65,
    borderWidth: 1,
    borderColor: '#EDEBE9',
  },
  cardImage: {
    width: '100%',
    height: '35%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  matchBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#0078D4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  matchText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  cardContent: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#323130',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
  },
  infoSection: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
  },
  bioSection: {
    marginBottom: 16,
  },
  bioText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#323130',
    lineHeight: 20,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: '#F3F2F1',
    borderRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
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
  activitySection: {
    marginBottom: 16,
  },
  activityLabel: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#605E5C',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  activityText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#323130',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#E1F5FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#0078D4',
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#0078D4',
  },
  interestsSection: {
    marginBottom: 16,
  },
  interestsLabel: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#605E5C',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  interestTag: {
    backgroundColor: '#F3F2F1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  interestText: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 24,
    gap: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EDEBE9',
  },
  passButton: {
    width: 56,
    height: 56,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D13438',
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#0078D4',
    gap: 8,
  },
  scheduleText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#0078D4',
  },
  connectButton: {
    width: 56,
    height: 56,
    borderRadius: 4,
    backgroundColor: '#0078D4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});