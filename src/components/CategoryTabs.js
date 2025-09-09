import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CATEGORIES = [
  { id: 'STARTER', name: 'Starter' },
  { id: 'MAIN COURSE', name: 'Main Course' },
  { id: 'DESSERT', name: 'Desert' },
  { id: 'SIDES', name: 'Sides' },
];

export default function CategoryTabs({ selectedCategory, setSelectedCategory, categoryCounts }) {
  return (
    <View style={styles.container}>
      {CATEGORIES.map(category => {
        const isActive = selectedCategory === category.id;
        return (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.tab,
              isActive ? styles.activeTab : styles.normalTab,
            ]}
            onPress={() => setSelectedCategory(category.id)}
            activeOpacity={0.85}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {category.name} {categoryCounts[category.id] || 0}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',        // All tabs in a row
    justifyContent: 'center',    // Center them horizontally
    marginBottom: 15,
    flexWrap: 'wrap',            // In case text is long, wrap to next line
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,       // ✅ Reduced horizontal space
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 4,         // Space between tabs
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalTab: {
    backgroundColor: '#fff',
    borderColor: '#bbb',
  },
  activeTab: {
    backgroundColor: '#FF941A',
    borderColor: '#FF941A',
  },
  tabText: {
    fontSize: 13,
    color: '#424242',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
