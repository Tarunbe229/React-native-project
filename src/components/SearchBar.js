import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';



// Custom Search Icon Component with partial inner circle border
const SearchIcon = () => (
  <View style={styles.searchIconContainer}>
    {/* Main circle with thinner border */}
    <View style={styles.searchCircle}>
      {/* Inner arc - very short arc (20% of the inner circle) */}
      <View style={styles.innerArcContainer}>
        <View style={styles.innerArc} />
      </View>
    </View>
    {/* Handle/line part of magnifying glass */}
    <View style={styles.searchHandle} />
  </View>
);



export default function SearchBar({
  searchQuery,
  setSearchQuery,
  onBackPress
}) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        {/* Back Button with Simple Unicode Arrow */}
        <TouchableOpacity onPress={onBackPress} style={styles.iconContainer}>
          <Text style={styles.iconText}>‹</Text>
        </TouchableOpacity>
        
        {/* Search Input */}
        <TextInput
          style={styles.input}
          placeholder="Search dish for your party......"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        
        {/* Custom Search Icon */}
        <TouchableOpacity style={styles.iconContainer}>
          <SearchIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ccc',
    paddingLeft: 12,
    paddingRight: 12,
    height: 50,
    marginTop: 16,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  iconText: {
    fontSize: 28,
    color: '#2c2b2bff',
    fontWeight: 600,
    textAlignVertical: 'center',
    lineHeight: 30,
    marginTop: -5,  // ADDED: Move arrow slightly above center
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    height: '100%',
    marginLeft: 10,
    marginRight: 10,
  },
  // Custom Search Icon Styles - 20x20 container
  searchIconContainer: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  searchCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.7,      // thinner outer circle border
    borderColor: '#868383ff',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  // Container for inner arc positioning
  innerArcContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  // Very short inner arc (20% of circle)
  innerArc: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 1,
    left: 1,
    borderLeftColor: '#9b9696ff',
    opacity: 0.4,
    transform: [{ rotate: '-1deg' }],
  },
  searchHandle: {
    width: 10,
    height: 2,
    backgroundColor: '#c7c3c3ff',
    position: 'absolute',
    bottom: 1,
    right: -1,
    transform: [{ rotate: '45deg' }],
    borderRadius: 1,
  },
});
