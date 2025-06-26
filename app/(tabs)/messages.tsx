import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MoveHorizontal as MoreHorizontal, Phone, Video, Calendar, Paperclip, Send } from 'lucide-react-native';

const mockConversations = [
  {
    id: 1,
    name: 'Sarah Boyd',
    title: 'Senior Product Manager',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=200',
    lastMessage: 'Thanks for connecting! Would love to chat about product strategy sometime. I\'ve been working on some interesting initiatives around user engagement.',
    timestamp: '2h',
    unread: true,
    unreadCount: 2,
    isOnline: true,
    department: 'Microsoft Teams'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    title: 'Principal Engineer',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    lastMessage: 'Sounds good! I\'m free Thursday afternoon for coffee. The new Azure features we discussed should be perfect for your use case.',
    timestamp: '1d',
    unread: false,
    unreadCount: 0,
    isOnline: false,
    department: 'Azure Infrastructure'
  },
  {
    id: 3,
    name: 'Jennifer Walsh',
    title: 'Design Director',
    image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=200',
    lastMessage: 'The design thinking workshop was great! Let\'s follow up next week to discuss how we can implement these concepts in our current projects.',
    timestamp: '3d',
    unread: false,
    unreadCount: 0,
    isOnline: true,
    department: 'Microsoft Design'
  },
  {
    id: 4,
    name: 'Alex Rivera',
    title: 'Data Scientist',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
    lastMessage: 'I\'ve attached the research paper we discussed. The machine learning models show promising results for our customer insights project.',
    timestamp: '1w',
    unread: false,
    unreadCount: 0,
    isOnline: false,
    department: 'AI Research'
  }
];

export default function MessagesTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');

  const filteredConversations = mockConversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = mockConversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  if (selectedConversation) {
    const conversation = mockConversations.find(c => c.id === selectedConversation);
    if (!conversation) return null;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.chatHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedConversation(null)}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          
          <View style={styles.chatHeaderInfo}>
            <View style={styles.chatHeaderLeft}>
              <View style={styles.chatImageContainer}>
                <Image source={{ uri: conversation.image }} style={styles.chatHeaderImage} />
                {conversation.isOnline && <View style={styles.onlineIndicator} />}
              </View>
              <View>
                <Text style={styles.chatHeaderName}>{conversation.name}</Text>
                <Text style={styles.chatHeaderTitle}>{conversation.title}</Text>
              </View>
            </View>
            
            <View style={styles.chatHeaderActions}>
              <TouchableOpacity style={styles.chatActionButton}>
                <Phone size={18} color="#605E5C" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatActionButton}>
                <Video size={18} color="#605E5C" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatActionButton}>
                <Calendar size={18} color="#605E5C" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatActionButton}>
                <MoreHorizontal size={18} color="#605E5C" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView style={styles.chatMessages}>
          <View style={styles.messageContainer}>
            <View style={styles.messageReceived}>
              <Text style={styles.messageText}>{conversation.lastMessage}</Text>
              <Text style={styles.messageTime}>{conversation.timestamp}</Text>
            </View>
          </View>
          
          <View style={styles.messageContainer}>
            <View style={styles.messageSent}>
              <Text style={styles.messageTextSent}>That sounds really interesting! I'd love to learn more about your approach.</Text>
              <Text style={styles.messageTimeSent}>1h</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.messageInput}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip size={20} color="#605E5C" />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            value={messageText}
            onChangeText={setMessageText}
            multiline
            placeholderTextColor="#605E5C"
          />
          <TouchableOpacity style={styles.sendButton}>
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Messages</Text>
          {totalUnread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{totalUnread}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Search size={16} color="#605E5C" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search conversations..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#605E5C"
            />
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredConversations.map((conversation) => (
          <TouchableOpacity 
            key={conversation.id} 
            style={styles.conversationCard}
            onPress={() => setSelectedConversation(conversation.id)}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: conversation.image }} style={styles.conversationImage} />
              {conversation.isOnline && <View style={styles.onlineIndicator} />}
              {conversation.unread && conversation.unreadCount > 0 && (
                <View style={styles.unreadIndicator}>
                  <Text style={styles.unreadIndicatorText}>{conversation.unreadCount}</Text>
                </View>
              )}
            </View>
            
            <View style={styles.conversationInfo}>
              <View style={styles.conversationHeader}>
                <Text style={styles.conversationName}>{conversation.name}</Text>
                <Text style={styles.timestamp}>{conversation.timestamp}</Text>
              </View>
              
              <Text style={styles.conversationTitle}>{conversation.title}</Text>
              <Text style={styles.conversationDepartment}>{conversation.department}</Text>
              
              <Text 
                style={[
                  styles.lastMessage,
                  conversation.unread && styles.unreadMessage
                ]}
                numberOfLines={2}
              >
                {conversation.lastMessage}
              </Text>
            </View>

            <View style={styles.conversationActions}>
              <TouchableOpacity style={styles.quickActionButton}>
                <Phone size={16} color="#605E5C" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton}>
                <Video size={16} color="#605E5C" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        
        {filteredConversations.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>
              {searchQuery ? 'No conversations found' : 'No messages yet'}
            </Text>
            <Text style={styles.emptyStateText}>
              {searchQuery 
                ? 'Try adjusting your search terms' 
                : 'Start connecting with people to begin conversations'
              }
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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
    color: '#323130',
    marginRight: 12,
  },
  unreadBadge: {
    backgroundColor: '#D13438',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  unreadBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  conversationCard: {
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
  imageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  conversationImage: {
    width: 56,
    height: 56,
    borderRadius: 4,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#107C10',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  unreadIndicator: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#D13438',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadIndicatorText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#323130',
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
  },
  conversationTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
    marginBottom: 2,
  },
  conversationDepartment: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
    marginBottom: 8,
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
    lineHeight: 20,
  },
  unreadMessage: {
    fontFamily: 'Inter-Medium',
    color: '#323130',
  },
  conversationActions: {
    flexDirection: 'column',
    gap: 8,
    marginLeft: 12,
  },
  quickActionButton: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#F3F2F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatHeader: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEBE9',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#0078D4',
  },
  chatHeaderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chatImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  chatHeaderImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  chatHeaderName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#323130',
  },
  chatHeaderTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
  },
  chatHeaderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  chatActionButton: {
    width: 36,
    height: 36,
    borderRadius: 4,
    backgroundColor: '#F3F2F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatMessages: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  messageReceived: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F2F1',
    borderRadius: 8,
    borderBottomLeftRadius: 2,
    padding: 12,
    maxWidth: '80%',
  },
  messageSent: {
    alignSelf: 'flex-end',
    backgroundColor: '#0078D4',
    borderRadius: 8,
    borderBottomRightRadius: 2,
    padding: 12,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#323130',
    lineHeight: 20,
    marginBottom: 4,
  },
  messageTextSent: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    lineHeight: 20,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#605E5C',
  },
  messageTimeSent: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EDEBE9',
    gap: 12,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#F3F2F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#EDEBE9',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#323130',
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#0078D4',
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