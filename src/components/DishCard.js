import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function DishCard({ dish, count, onCountChange, onIngredientPress }) {
  const handleIncrement = () => {
    onCountChange(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      onCountChange(count - 1);
    }
  };

  const handleAdd = () => {
    onCountChange(1);
  };

  const getImageSource = () => {
    if (dish.image) {
      return { uri: dish.image };
    } else if (dish.category?.image) {
      return { uri: dish.category.image };
    } else {
      // Fallback to a placeholder or default image
      return { uri: 'https://via.placeholder.com/90x90?text=Dish' };
    }
  };

  return (
    <View style={styles.card}>
      {/* Dish Image */}
      <Image
        source={getImageSource()}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Dish Details */}
      <View style={styles.details}>
        {/* Veg/Non-Veg Symbol + Name */}
        <View style={styles.nameRow}>
          <Text style={styles.vegSymbol}>
            {dish.type === 'VEG' ? '🟢' : '🔴'}
          </Text>
          <Text style={styles.name} numberOfLines={1}>
            {dish.name}
          </Text>
        </View>

        {/* Category Name */}
        <Text style={styles.category}>{dish.category?.name || 'North Indian'}</Text>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {dish.description}
        </Text>

        {/* Ingredient Button */}
        <TouchableOpacity onPress={onIngredientPress} style={styles.ingredientButton}>
          <Text style={styles.ingredientText}>🧅 Ingredient</Text>
        </TouchableOpacity>
      </View>

      {/* Add / Counter Controls */}
      <View style={styles.controls}>
        {count === 0 ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAdd}
          >
            <Text style={styles.addText}>Add +</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.counter}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={handleDecrement}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.count}>{count}</Text>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={handleIncrement}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
    marginRight: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  vegSymbol: {
    fontSize: 12,
    marginRight: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  category: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 8,
  },
  ingredientButton: {
    alignSelf: 'flex-start',
  },
  ingredientText: {
    fontSize: 13,
    color: '#FF8C00',
    fontWeight: '500',
  },
  controls: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  addText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  counterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 32,
    alignItems: 'center',
  },
  counterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  count: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 8,
    minWidth: 20,
    textAlign: 'center',
  },
});