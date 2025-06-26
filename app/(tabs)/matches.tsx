import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, MapPin, Clock, Search, Filter, Calendar, Video, Coffee, Users } from 'lucide-react-native';

const mockMatches = [
  {
    id: 1,
    name: 'Sarah Boyd',
    title: 'Senior Product Manager',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=200',
    location: 'Redmond, WA',
    matchedAt: '2 hours ago',
    status: 'new',
    matchScore: 92,
    department: 'Microsoft Teams',
    suggestedMeeting: 'Coffee chat',
    availability: 'Available this week',
    mutualConnections: 12
  },
  {
    id: 2,
    name: 'Marcus Chen',
    title: 'Principal Engineer',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    location: 'Redmond, WA',
    matchedAt: '1 day ago',
    status: 'scheduled',
    matchScore: 94,
    department: 'Azure Infrastructure',
    suggestedMeeting: 'Virtual meeting',
    availability: 'Available today',
    mutualConnections: 15
  },
  {
    id: 3,
    name: 'Jennifer Walsh',
    title: 'Design Director',
    image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=200',
    location: 'San Francisco, CA',
    matchedAt: '3 days ago',
    status: 'messaged',
    matchScore: 89,
    department: 'Microsoft Design',
    suggestedMeeting: 'Lunch meeting',
    availability: 'Available this afternoon',
    mutualConnections: 6
  },
  {
    id: 4,
    name: 'Alex Rivera',
    title: 'Data Scientist',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
    location: 'Seattle, WA',
    matchedAt: '5 days ago',
    status: 'viewed',
    matchScore: 85,
    department: 'AI Research',
    suggestedMeeting: 'Walking meeting',
    availability: 'Available next week',
    mutualConnections: 9
  }
];

export default function MatchesTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All', count: mockMatches.length },
    { key: 'new', label: 'New', count: mockMatches.filter(m => m.status === 'new').length },
    { key: 'scheduled', label: 'Scheduled', count: mockMatches.filter(m => m.status === 'scheduled').length },
    { key: 'messaged', label: 'Messaged', count: mockMatches.filter(m => m.status === 'messaged').length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return '#0078D4';
      case 'scheduled': return '#107C10';
      case 'messaged': return '#FF8C00';
      default: return '#605E5C';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'New match';
      case 'scheduled': return 'Meeting scheduled';
      case 'messaged': return 'Conversation started';
      case 'viewed': return 'Profile viewed';
      default: return status;
    }
  };

  const getMeetingIcon = (meetingType: string) => {
    switch (meetingType.toLowerCase()) {
      case 'coffee chat': return Coffee;
      case 'virtual meeting': return Video;
      case 'lunch meeting': return Coffee;
      case 'walking meeting': return Users;
      default: return MessageCircle;
    }
  };

  const filteredMatches = mockMatches.filter(match => {
    const matchesSearch = match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         match.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         match.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || match.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matches</Text>
        <Text style={styles.headerSubtitle}>
          {mockMatches.length} connections • {mockMatches.filter(m => m.status === 'new').length} new
        </Text>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Search size={16} color="#605E5C" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search matches..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#605E5C"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={16} color="#605E5C" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                selectedFilter === filter.key && styles.activeFilterChip
              ]}
              onPress={() => setSelectedFilter(filter.key)}
            >
              <Text style={[
                styles.filterChipText,
                selectedFilter === filter.key && styles.activeFilterChipText
              ]}>
                {filter.label} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredMatches.map((match) => {
          const MeetingIcon = getMeetingIcon(match.suggestedMeeting);
          return (
            <TouchableOpacity key={match.id} style={styles.matchCard}>
              <View style={styles.matchImageContainer}>
                <Image source={{ uri: match.image }} style={styles.matchImage} />
                <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(match.status) }]} />
                <View style={styles.matchScoreBadge}>
                  <Text style={styles.matchScoreText}>{match.matchScore}%</Text>
                </View>
              </View>
              
              <View style={styles.matchInfo}>
                <View style={styles.matchHeader}>
                  <Text style={styles.matchName}>{match.name}</Text>
                  <Text style={styles.matchTime}>{match.matchedAt}</Text>
                </View>
                
                <Text style={styles.matchTitle}>{match.title}</Text>
                <Text style={styles.matchDepartment}>{match.department}</Text>
                
                <View style={styles.matchDetails}>
                  <View style={styles.detailRow}>
                    <MapPin size={12} color="#605E5C" />
                    <Text style={styles.detailText}>{match.location}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Clock size={12} color="#605E5C" />
                    <Text style={styles.detailText}>{match.availability}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Users size={12} color="#605E5C" />
                    <Text style={styles.detailText}>{match.mutualConnections} mutual connections</Text>
                  </View>
                </View>

                <View style={styles.statusContainer}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(match.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(match.status) }]}>
                      {getStatusText(match.status)}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.scheduleButton}>
                  <Calendar size={16} color="#0078D4" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.meetingButton}>
                  <MeetingIcon size={16} color="#107C10" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.messageButton}>
                  <MessageCircle size={16} color="#FF8C00" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
        
        {filteredMatches.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No matches found</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'Try adjusting your search terms' : 'Keep swiping on Discover to find more connections'}
            </Text>
          </View>
        )}
      </ScrollView>
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
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEBE9',
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
    color: '#323130',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F2F1',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
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
  filtersContainer: {
    marginHorizontal: -24,
  },
  filtersContent: {
    paddingHorizontal: 24,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#F3F2F1',
  },
  activeFilterChip: {
    backgroundColor: '#0078D4',
  },
  filterChipText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#605E5C',
  },
  activeFilterChipText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  matchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  matchImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  matchImage: {
    width: 64,
    height: 64,
    borderRadius: 4,
  },
  statusIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  matchScoreBadge: {
    position: 'absolute',
    bottom: -6,
    left: -6,
    backgroundColor: '#0078D4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  matchScoreText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  matchInfo: {
    flex: 1,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  matchName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#323130',
    flex: 1,
  },
  matchTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
  },
  matchTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
    marginBottom: 2,
  },
  matchDepartment: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
    marginBottom: 8,
  },
  matchDetails: {
    gap: 4,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
  },
  statusContainer: {
    marginTop: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'uppercase',
  },
  actionButtons: {
    flexDirection: 'column',
    gap: 8,
    marginLeft: 12,
  },
  scheduleButton: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#E1F5FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  meetingButton: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#F3F9F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageButton: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#FFF4E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#323130',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
    textAlign: 'center',
  },
});