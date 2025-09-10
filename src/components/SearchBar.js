import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  onBackPress
}) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={onBackPress}>
          <Image
            source={require('../assets/back.png')}   // ← your back arrow PNG
            style={styles.iconImage}
          />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Search dish for your party......" // six dots
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />

        <Image
          source={require('../assets/search.png')}      // ← your search PNG
          style={styles.iconImage}
        />
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
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 12,
    paddingRight: 12,
    height: 50,
    marginTop: 15,
  },
  iconImage: {
    width: 20,   // size of your PNG
    height: 20,
    tintColor: '#888', // makes the PNG gray if it’s monochrome
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    height: '100%',
  },
});
