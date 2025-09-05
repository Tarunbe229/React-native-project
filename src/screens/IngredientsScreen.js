import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

export default function IngredientsScreen({ route }) {
  const { dish } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredient list</Text>

      {/* Dish Image */}
      <Image
        source={{ uri: dish.image ? dish.image : dish.category?.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Dish Name */}
      <Text style={styles.dishName}>{dish.name}</Text>

      {/* Dish Description */}
      <Text style={styles.description}>
        {dish.description || "No description available"}
      </Text>

      {/* For People */}
      {dish.forPeople && (
        <Text style={styles.forPeople}>For {dish.forPeople} people</Text>
      )}

      {/* Ingredient List */}
      <FlatList
        data={dish.ingredients || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.ingName}>{item.name}</Text>
            <Text style={styles.ingQty}>{item.quantity}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#999" }}>No ingredients available</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  dishName: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  description: { fontSize: 14, color: "#555", marginBottom: 5 },
  forPeople: { fontSize: 13, color: "#007AFF", marginBottom: 15 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 8,
  },
  ingName: { fontSize: 14, color: "#333" },
  ingQty: { fontSize: 14, color: "#666" },
});