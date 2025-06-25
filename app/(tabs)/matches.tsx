import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, MapPin, Clock } from 'lucide-react-native';

const mockMatches = [
  {
    id: 1,
    name: 'Sarah Boyd',
    title: 'Senior Product Manager',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=200',
    location: 'Redmond, WA',
    matchedAt: '2 hours ago',
    status: 'new'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    title: 'Principal Engineer',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    location: 'Redmond, WA',
    matchedAt: '1 day ago',
    status: 'messaged'
  },
  {
    id: 3,
    name: 'Jennifer Walsh',
    title: 'Design Director',
    image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=200',
    location: 'San Francisco, CA',
    matchedAt: '3 days ago',
    status: 'viewed'
  }
];

export default function MatchesTab() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matches</Text>
        <Text style={styles.headerSubtitle}>
          {mockMatches.length} new connections waiting
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {mockMatches.map((match) => (
          <TouchableOpacity key={match.id} style={styles.matchCard}>
            <Image source={{ uri: match.image }} style={styles.matchImage} />
            
            <View style={styles.matchInfo}>
              <View style={styles.matchHeader}>
                <Text style={styles.matchName}>{match.name}</Text>
                {match.status === 'new' && <View style={styles.newBadge} />}
              </View>
              
              <Text style={styles.matchTitle}>{match.title}</Text>
              
              <View style={styles.matchDetails}>
                <View style={styles.detailRow}>
                  <MapPin size={12} color="#666" />
                  <Text style={styles.detailText}>{match.location}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Clock size={12} color="#666" />
                  <Text style={styles.detailText}>Matched {match.matchedAt}</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity style={styles.messageButton}>
              <MessageCircle size={20} color="#FF6900" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>That's all for now!</Text>
          <Text style={styles.emptyStateText}>
            Keep swiping on Discover to find more connections
          </Text>
        </View>
      </ScrollView>
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  matchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  matchImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  matchInfo: {
    flex: 1,
  },
  matchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  matchName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginRight: 8,
  },
  newBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6900',
  },
  matchTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 8,
  },
  matchDetails: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
  },
});