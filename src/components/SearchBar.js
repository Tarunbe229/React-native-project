import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  onBackPress    // Pass a function to handle back navigation
}) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={onBackPress}>
          <Icon name="arrow-back" size={20} color="#888" style={styles.leftIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search dish for your party..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />
        <Icon name="search-outline" size={20} color="#888" style={styles.rightIcon} />
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
    borderRadius: 12,         // Small boxy corners
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 12,
    paddingRight: 12,
    height: 50,
    marginTop: 15,
  },
  leftIcon: {
    marginRight: 10,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    height: '100%',
  },
  rightIcon: {
    marginLeft: 8,
  },
});
