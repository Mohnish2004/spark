import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-deck-swiper';
import { X, Heart, MapPin, Clock, Briefcase } from 'lucide-react-native';

const { height } = Dimensions.get('window');

const mockProfiles = [
  {
    id: 1,
    name: 'Sarah Boyd',
    title: 'Senior Product Manager',
    department: 'Microsoft Teams',
    location: 'Redmond, WA',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['Leadership', 'Product', 'Teams'],
    matchScore: 92,
    availability: 'Available this week'
  },
  {
    id: 2,
    name: 'Carolina O\'clock',
    title: 'Executive Vice President',
    department: 'Cloud + AI',
    location: 'Seattle, WA',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['Executive', 'Cloud', 'AI'],
    matchScore: 87,
    availability: 'Available next week'
  },
  {
    id: 3,
    name: 'Marcus Chen',
    title: 'Principal Engineer',
    department: 'Azure Infrastructure',
    location: 'Redmond, WA',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['Engineering', 'Azure', 'Infrastructure'],
    matchScore: 94,
    availability: 'Available today'
  },
  {
    id: 4,
    name: 'Jennifer Walsh',
    title: 'Design Director',
    department: 'Microsoft Design',
    location: 'San Francisco, CA',
    image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['Design', 'UX', 'Leadership'],
    matchScore: 89,
    availability: 'Available this afternoon'
  }
];

export default function DiscoverTab() {
  const [cardIndex, setCardIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Career');
  const swiperRef = useRef<Swiper<any>>(null);

  const categories = ['Career', 'Serendipity', 'Casual'];

  const handleSwipeLeft = () => {
    swiperRef.current?.swipeLeft();
  };

  const handleSwipeRight = () => {
    swiperRef.current?.swipeRight();
  };

  const renderCard = (profile: any) => {
    // Check if profile is undefined or null
    if (!profile) {
      return null;
    }

    return (
      <View style={styles.card}>
        <Image source={{ uri: profile.image }} style={styles.cardImage} />
        
        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>{profile.matchScore}% Match</Text>
        </View>
        
        <View style={styles.cardContent}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.title}>{profile.title}</Text>
          
          <View style={styles.infoRow}>
            <Briefcase size={14} color="#666" />
            <Text style={styles.infoText}>{profile.department}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MapPin size={14} color="#666" />
            <Text style={styles.infoText}>{profile.location}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Clock size={14} color="#666" />
            <Text style={styles.infoText}>{profile.availability}</Text>
          </View>
          
          <View style={styles.tagsContainer}>
            {profile.tags.map((tag: string, index: number) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        
        <View style={styles.categoryTabs}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryTab,
                selectedCategory === category && styles.activeCategoryTab
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryTabText,
                selectedCategory === category && styles.activeCategoryTabText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={mockProfiles}
          renderCard={renderCard}
          onSwipedLeft={(cardIndex) => {
            console.log('Swiped left:', mockProfiles[cardIndex]);
          }}
          onSwipedRight={(cardIndex) => {
            console.log('Swiped right:', mockProfiles[cardIndex]);
          }}
          cardIndex={cardIndex}
          backgroundColor="transparent"
          stackSize={2}
          stackSeparation={15}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          overlayLabels={{
            left: {
              title: 'PASS',
              style: {
                label: {
                  backgroundColor: 'red',
                  color: 'white',
                  fontSize: 24,
                  fontFamily: 'Inter-Bold',
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: -20,
                },
              },
            },
            right: {
              title: 'CONNECT',
              style: {
                label: {
                  backgroundColor: '#FF6900',
                  color: 'white',
                  fontSize: 24,
                  fontFamily: 'Inter-Bold',
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: 20,
                },
              },
            },
          }}
        />
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.passButton} onPress={handleSwipeLeft}>
          <X size={24} color="#FF4444" />
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
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  categoryTabs: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  activeCategoryTab: {
    backgroundColor: '#FF6900',
  },
  categoryTabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  activeCategoryTabText: {
    color: '#FFFFFF',
  },
  swiperContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    height: height * 0.6,
  },
  cardImage: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  matchBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FF6900',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  matchText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  cardContent: {
    padding: 20,
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#666',
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
    color: '#666',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  tag: {
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#0078D4',
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#0078D4',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 48,
    paddingVertical: 32,
    gap: 32,
  },
  passButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  connectButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF6900',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});