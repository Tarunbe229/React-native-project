import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const categories = ['STARTER', 'MAIN COURSE', 'DESSERT', 'SIDES'];

export default function CategoryTabs({ selectedCategory, setSelectedCategory }) {
  return (
    <View style={styles.row}>
      {categories.map(cat => (
        <TouchableOpacity
          key={cat}
          style={[
            styles.tab,
            selectedCategory === cat && styles.activeTab,
          ]}
          onPress={() => setSelectedCategory(cat)}
        >
          <Text
            style={[
              styles.text,
              selectedCategory === cat && styles.activeText,
            ]}
          >
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12 },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
  },
  activeTab: { backgroundColor: '#007bff' },
  text: { fontSize: 14, color: '#555' },
  activeText: { color: '#fff', fontWeight: 'bold' },
});