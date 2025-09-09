import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';

export default function IngredientsScreen({ route }) {
  const { dish } = route.params;

  const getImageSource = () => {
    if (dish.image) {
      return { uri: dish.image };
    } else if (dish.category?.image) {
      return { uri: dish.category.image };
    } else {
      return { uri: 'https://via.placeholder.com/300x200?text=Dish' };
    }
  };

  const renderIngredient = ({ item }) => (
    <View style={styles.ingredientRow}>
      <Text style={styles.ingredientName}>{item.name}</Text>
      <Text style={styles.ingredientQuantity}>{item.quantity}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Dish Image */}
        <Image
          source={getImageSource()}
          style={styles.dishImage}
          resizeMode="cover"
        />

        {/* Dish Info */}
        <View style={styles.dishInfo}>
          <Text style={styles.dishName}>{dish.name}</Text>
          <Text style={styles.categoryName}>{dish.category?.name || 'North Indian'}</Text>
          <Text style={styles.dishDescription}>{dish.description}</Text>
          
          {dish.forPeople && (
            <Text style={styles.forPeople}>For {dish.forPeople} people</Text>
          )}
        </View>

        {/* Ingredients List */}
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <FlatList
          data={dish.ingredients || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderIngredient}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No ingredients available</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  dishImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  dishInfo: {
    marginBottom: 20,
  },
  dishName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  dishDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  forPeople: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  ingredientName: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  ingredientQuantity: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});
