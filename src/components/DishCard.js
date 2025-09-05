import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

export default function DishCard({ dish, onPressIngredients, onCountChange }) {
  const [count, setCount] = useState(0);

  const updateCount = (newCount) => {
    // update local count
    setCount(newCount);
    // notify parent (HomeScreen)
    onCountChange(newCount);
  };

  return (
    <View style={styles.card}>
      {/* Dish Image */}
      <Image
        source={{ uri: dish.image ? dish.image : dish.category?.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Dish Details */}
      <View style={styles.details}>
        {/* Veg/Non-Veg Symbol + Name */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.symbol}>
            {dish.type.toUpperCase() === "VEG" ? "🟢" : "🔴"}
          </Text>
          <Text style={styles.name}>{dish.name}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {dish.description}
        </Text>

        {/* Ingredient Button */}
        <TouchableOpacity onPress={onPressIngredients}>
          <Text style={styles.ingredientLink}>Ingredient</Text>
        </TouchableOpacity>
      </View>

      {/* Add / Counter */}
      {count === 0 ? (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => updateCount(1)}
        >
          <Text style={styles.addText}>Add +</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.counter}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => updateCount(count - 1)}
          >
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.count}>{count}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => updateCount(count + 1)}
          >
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    elevation: 2,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
  },
  details: { flex: 1 },
  symbol: { fontSize: 14, marginRight: 5 },
  name: { fontSize: 16, fontWeight: "bold", marginBottom: 3 },
  description: { fontSize: 13, color: "#555", marginBottom: 5 },
  ingredientLink: { fontSize: 13, color: "orange" },
  addButton: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  addText: { color: "green", fontWeight: "bold" },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 5,
    alignSelf: "center",
  },
  counterButton: { paddingHorizontal: 8, paddingVertical: 3 },
  counterText: { fontSize: 16, fontWeight: "bold" },
  count: { fontSize: 14, marginHorizontal: 5 },
});