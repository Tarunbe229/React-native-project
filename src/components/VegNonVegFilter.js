import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MainCourseHeader({ count, vegFilter, setVegFilter }) {
  // vegFilter will be an object like: { veg: false, nonVeg: false }

  const toggleVeg = () => {
    setVegFilter(prev => ({ ...prev, veg: !prev.veg }));
  };

  const toggleNonVeg = () => {
    setVegFilter(prev => ({ ...prev, nonVeg: !prev.nonVeg }));
  };

  return (
    <View style={styles.container}>
      {/* Left: Label with count */}
      <Text style={styles.label}>
        Main Course Selected ({count})
      </Text>

      {/* Right: Veg + Non-Veg filter buttons */}
      <View style={styles.filterContainer}>
        {/* Veg Button */}
        <TouchableOpacity
          style={[
            styles.circle,
            vegFilter.veg && styles.activeVeg,
          ]}
          onPress={toggleVeg}
        />

        {/* Non-Veg Button */}
        <TouchableOpacity
          style={[
            styles.circle,
            vegFilter.nonVeg && styles.activeNonVeg,
          ]}
          onPress={toggleNonVeg}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#bbb',
    backgroundColor: '#fff',
  },
  activeVeg: {
    backgroundColor: '#268A2F',
    borderColor: '#268A2F',
  },
  activeNonVeg: {
    backgroundColor: '#d63e3d',
    borderColor: '#d63e3d',
  },
});
