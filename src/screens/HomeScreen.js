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
import BottomSheetModal from '../components/BottomSheetModal';
import dishesData from '../data/dishes.json';

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
    outputRange: [3, 25],
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.toggleContainer}>
        <Animated.View
          style={[
            styles.knobCircle,
            {
              borderColor: activeColor,
              transform: [{ translateX }],
            },
          ]}
        >
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

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
      case 'STARTER': return 'Starters Selected';
      case 'MAIN COURSE': return 'Main Courses Selected';
      case 'DESSERT': return 'Desserts Selected';
      case 'SIDES': return 'Sides Selected';
      default: return 'Items Selected';
    }
  };

  const handleDishPress = (dish) => {
    setSelectedDish(dish);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedDish(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <CategoryTabs
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      <View style={styles.filterHeader}>
        <Text style={styles.filterLabel}>
          {getCategoryDisplayName()} ({categoryCounts[selectedCategory] || 0})
        </Text>
        <View style={styles.filterButtons}>
          <View style={styles.toggleWrapper}>
            <ToggleSwitch
              isActive={vegFilter === 'VEG'}
              onPress={() => toggleVegFilter('VEG')}
              activeColor="#4CAF50"
            />
          </View>
          <View style={styles.toggleWrapper}>
            <ToggleSwitch
              isActive={vegFilter === 'NONVEG'}
              onPress={() => toggleVegFilter('NONVEG')}
              activeColor="#F44336"
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.northIndianSection}>
        <Text style={styles.northIndianText}>North Indian</Text>
        <Text style={styles.arrowUp}>⌃</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredDishes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <DishCard
            dish={item}
            count={selectedDishes[item.id] || 0}
            onCountChange={count => handleDishCountChange(item.id, count)}
            onIngredientPress={() => navigation.navigate('Ingredients', { dish: item })}
            onCardPress={() => handleDishPress(item)}
            onReadMorePress={() => handleDishPress(item)}
          />
        )}
        contentContainerStyle={styles.dishList}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.bottomBar}>
        <View style={styles.totalTextContainer}>
          <View style={styles.totalTextRow}>
            <Text style={styles.totalLabel}>Total Dish Selected</Text>
            <Text style={styles.totalNumber}>{totalSelected}</Text>
          </View>
          <Text style={styles.arrowIcon}>{'>'}</Text>
        </View>
        <View style={styles.continueButtonContainer}>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheetModal
        visible={modalVisible}
        dish={selectedDish}
        count={selectedDish ? (selectedDishes[selectedDish.id] || 0) : 0}
        onClose={handleCloseModal}
        onCountChange={handleDishCountChange}
        onIngredientPress={() => {
          handleCloseModal();
          if (selectedDish) {
            navigation.navigate('Ingredients', { dish: selectedDish });
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
  },
  filterLabel: { fontSize: 16, fontWeight: '600', color: '#333', fontFamily: 'OpenSans-Italic' },
  filterButtons: { flexDirection: 'row', gap: 12 },
  toggleWrapper: {
    borderWidth: 1.5,
    borderColor: '#f1f1f1ff',
    borderRadius: 17,
    paddingHorizontal: 7,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  toggleContainer: {
    width: 42,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#f1f1f1ff',
    borderWidth: 0,
    borderColor: '#666',
    justifyContent: 'center',
    position: 'relative',
  },
  knobCircle: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    backgroundColor: 'white',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 2,
  },
  innerCircle: { width: 10, height: 10, borderRadius: 5 },
  northIndianSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    marginBottom: 8,
  },
  northIndianText: { fontSize: 18, fontWeight: '600', color: '#000', fontFamily: 'OpenSans-Italic' },
  arrowUp: { fontSize: 20, color: '#666', fontWeight: '400', fontFamily: 'OpenSans-Italic' },
  dishList: { paddingHorizontal: 20, paddingBottom: 110 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFAF4',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  totalTextRow: { flexDirection: 'row', alignItems: 'center' },
  totalLabel: { fontSize: 15, fontWeight: '600', color: '#666', fontFamily: 'OpenSans-Bold' },
  totalNumber: { fontSize: 15, fontWeight: '700', color: '#000', fontFamily: 'OpenSans-Bold', marginLeft: 5 },
  arrowIcon: { fontSize: 20, color: '#666', fontWeight: '700', fontFamily: 'OpenSans-Bold' },
  continueButtonContainer: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#fff' },
  continueButton: { backgroundColor: '#000', paddingVertical: 12, borderRadius: 7, width: '100%', alignItems: 'center' },
  continueButtonText: { color: '#fff', fontSize: 16, fontWeight: '700', fontFamily: 'OpenSans-Bold' },
});
