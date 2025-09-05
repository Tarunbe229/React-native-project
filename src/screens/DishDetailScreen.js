import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import dishes from '../data/dishes.json';

export default function DishDetailScreen({ route }) {
  const { dishId } = route.params;
  const dish = dishes.find(d => d.id === dishId);

  if (!dish) return <Text>Dish not found</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: dish.image || 'https://via.placeholder.com/200' }} style={styles.image} />
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.category}>{dish.category.name}</Text>
      <Text style={styles.description}>{dish.description}</Text>

      <Text style={styles.ingredientsTitle}>Ingredients</Text>
      <FlatList
        data={dish.ingredients || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.ingredient}>• {item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 15 },
  name: { fontSize: 22, fontWeight: 'bold' },
  category: { fontSize: 14, color: '#666', marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 15 },
  ingredientsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  ingredient: { fontSize: 14, marginVertical: 2 },
});