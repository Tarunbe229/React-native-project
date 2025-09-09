import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import DishCard from '../components/DishCard';
import dishesData from '../data/dishes.json';

// ✅ ToggleSwitch with pill-shaped container, grey background, transparent border
const ToggleSwitch = ({ isActive, onPress, activeColor }) => {
  const animatedValue = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isActive ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 25], // small knob travels from left to right
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.toggleContainer}>
        {/* Small Knob Circle with Square Border */}
        <Animated.View
          style={[
            styles.knobCircle,
            {
              borderColor: activeColor, // square border matches circle color
              transform: [{ translateX }],
            },
          ]}
        >
          {/* Inner Circle */}
          <View
            style={[
              styles.innerCircle,
              { backgroundColor: activeColor }
            ]}
          />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('STARTER');
  const [vegFilter, setVegFilter] = useState(null);
  const [selectedDishes, setSelectedDishes] = useState({});

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = {
      'STARTER': 0,
      'MAIN COURSE': 0,
      'DESSERT': 0,
      'SIDES': 0,
    };

    Object.entries(selectedDishes).forEach(([dishId, count]) => {
      if (count > 0) {
        const dish = dishesData.find(d => d.id.toString() === dishId);
        if (dish && counts.hasOwnProperty(dish.mealType)) {
          counts[dish.mealType] += count;
        }
      }
    });

    return counts;
  }, [selectedDishes]);

  const totalSelected = Object.values(selectedDishes).reduce(
    (sum, count) => sum + count,
    0
  );

  const filteredDishes = useMemo(() => {
    return dishesData.filter(dish => {
      if (dish.mealType !== selectedCategory) return false;
      if (
        searchQuery &&
        !dish.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (vegFilter && dish.type !== vegFilter) return false;
      return true;
    });
  }, [selectedCategory, searchQuery, vegFilter]);

  const handleDishCountChange = (dishId, count) => {
    setSelectedDishes(prev => ({
      ...prev,
      [dishId]: count,
    }));
  };

  const toggleVegFilter = filterType => {
    setVegFilter(vegFilter === filterType ? null : filterType);
  };

  const getCategoryDisplayName = () => {
    switch (selectedCategory) {
      case 'STARTER':
        return 'Starters Selected';
      case 'MAIN COURSE':
        return 'Main Courses Selected';
      case 'DESSERT':
        return 'Desserts Selected';
      case 'SIDES':
        return 'Sides Selected';
      default:
        return 'Items Selected';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Category Tabs */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      {/* Veg / Non-Veg Filter */}
      <View style={styles.filterHeader}>
        <Text style={styles.filterLabel}>
          {getCategoryDisplayName()} ({categoryCounts[selectedCategory] || 0})
        </Text>
        <View style={styles.filterButtons}>
          <View style={styles.toggleWrapper}>
            <ToggleSwitch
              isActive={vegFilter === 'VEG'}
              onPress={() => toggleVegFilter('VEG')}
              activeColor="#4CAF50" // green
            />
          </View>
          <View style={styles.toggleWrapper}>
            <ToggleSwitch
              isActive={vegFilter === 'NONVEG'}
              onPress={() => toggleVegFilter('NONVEG')}
              activeColor="#F44336" // red
            />
          </View>
        </View>
      </View>

      {/* Dish List */}
      <FlatList
        data={filteredDishes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <DishCard
            dish={item}
            count={selectedDishes[item.id] || 0}
            onCountChange={count => handleDishCountChange(item.id, count)}
            onIngredientPress={() =>
              navigation.navigate('Ingredients', { dish: item })
            }
          />
        )}
        contentContainerStyle={styles.dishList}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.totalText}>Total Dish Selected {totalSelected}</Text>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
  },
  filterLabel: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#333' 
  },
  filterButtons: { 
    flexDirection: 'row', 
    gap: 12,
  },

  // ✅ NEW STYLE ADDED: Individual wrapper with grey border for each toggle
  toggleWrapper: {
    borderWidth: 1.5,
    borderColor: '#f1f1f1ff',
    borderRadius: 17,
    paddingHorizontal: 7,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },

  // ✅ Toggle Styles - pill-shaped container with grey background and transparent border
  toggleContainer: {
    width: 42,
    height: 12,
    borderRadius: 6, // perfectly pill-shaped (half of height)
    backgroundColor: '#f1f1f1ff', // grey background
    borderWidth: 0,
    borderColor: '#666',
    justifyContent: 'center',
    position: 'relative',
  },
  knobCircle: {
    width: 20, // small knob-like size
    height: 20,
    borderRadius: 6, // square border (small radius for slightly rounded corners)
    borderWidth: 1.5, // outline thickness
    backgroundColor: 'white', // transparent background for square border
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 2,
  },
  innerCircle: {
    width: 10, // inner circle size
    height: 10,
    borderRadius: 5, // perfect inner circle
  },

  dishList: { 
    paddingHorizontal: 20, 
    paddingBottom: 80 
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalText: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#000' 
  },
  continueButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  continueButtonText: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: '600' 
  },
});
