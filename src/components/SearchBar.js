import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search dishes..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 8, fontSize: 14, color: '#000' },
});