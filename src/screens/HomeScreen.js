import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DishCard from "../components/DishCard";
import dishes from "../data/dishes.json";

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [vegFilter, setVegFilter] = useState(null); // null = all, "VEG" or "NONVEG"
  const [selectedCount, setSelectedCount] = useState(0);
  const [dishCounts, setDishCounts] = useState({}); // track per-dish counts

  // ✅ Filtering Logic
  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || dish.mealType === selectedCategory;

    const matchesVeg =
      vegFilter === null || dish.type.toUpperCase() === vegFilter;

    return matchesSearch && matchesCategory && matchesVeg;
  });

  const categories = ["All", "Starter", "Main Course", "Dessert", "Sides"];

  // ✅ Handle count update from DishCard
  const handleCountChange = (dishId, newCount) => {
    setDishCounts((prev) => {
      const updated = { ...prev, [dishId]: newCount };
      // recalc total
      const total = Object.values(updated).reduce((sum, c) => sum + c, 0);
      setSelectedCount(total);
      return updated;
    });
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.search}
        placeholder="Search dish for your party..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
      />

      {/* Veg/Non-Veg Buttons */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            vegFilter === "VEG" && styles.activeVeg,
          ]}
          onPress={() => setVegFilter(vegFilter === "VEG" ? null : "VEG")}
        >
          <Text style={styles.vegSymbol}>🟢</Text>
          <Text style={styles.filterText}>Veg</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            vegFilter === "NONVEG" && styles.activeNonVeg,
          ]}
          onPress={() => setVegFilter(vegFilter === "NONVEG" ? null : "NONVEG")}
        >
          <Text style={styles.nonVegSymbol}>🔴</Text>
          <Text style={styles.filterText}>Non-Veg</Text>
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <View style={styles.tabs}>
        {categories.map((cat) => (
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
                styles.tabText,
                selectedCategory === cat && styles.activeTabText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Dish List */}
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DishCard
            dish={item}
            onCountChange={(count) => handleCountChange(item.id, count)}
            onPressIngredients={() =>
              navigation.navigate("Ingredients", { dish: item })
            }
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Footer with Counter */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Total Dish Selected {selectedCount}
        </Text>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    gap: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  vegSymbol: { fontSize: 16, marginRight: 5 },
  nonVegSymbol: { fontSize: 16, marginRight: 5 },
  filterText: { fontSize: 14 },
  activeVeg: { borderColor: "green", backgroundColor: "#e6ffe6" },
  activeNonVeg: { borderColor: "red", backgroundColor: "#ffe6e6" },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tab: { paddingVertical: 6, paddingHorizontal: 10 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: "#007AFF" },
  tabText: { fontSize: 14, color: "#555" },
  activeTabText: { color: "#007AFF", fontWeight: "bold" },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  footerText: { fontSize: 14, fontWeight: "bold" },
  continueButton: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  continueText: { color: "white", fontWeight: "bold" },
});