import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';

export default function IngredientsScreen({ route, navigation }) {
  const { dish } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const getImageSource = () => {
    if (dish.image) {
      return { uri: dish.image };
    } else if (dish.category?.image) {
      return { uri: dish.category.image };
    } else {
      return { uri: 'https://via.placeholder.com/200x160' };
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
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ingredient list</Text>
      </View>

      {/* Dish Card */}
      <View style={styles.dishCard}>
        {/* Dish Info */}
        <View style={styles.dishInfo}>
          <Text style={styles.dishName} numberOfLines={1} ellipsizeMode="tail">
            {dish.name}
          </Text>
          <Text style={styles.dishDescription}>
            {dish.description}
          </Text>
        </View>

        {/* Image with C-shaped border */}
        <View style={styles.imageContainer}>
          <Image source={getImageSource()} style={styles.dishImage} />
        </View>
      </View>

      {/* Ingredient list container */}
      <View style={styles.ingredientsSection}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View>
          <Text style={styles.forPeople}>For {dish.forPeople || 2} people</Text>
          <View style={styles.underline} />
        </View>
        <FlatList
          data={dish.ingredients || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderIngredient}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
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

const screenHeight = Dimensions.get('window').height;

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f2f2ff',
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 15,
    padding: 4,
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  dishCard: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#fff',
    alignItems: 'stretch', // ensures image takes full height
  },
  dishInfo: {
    flex: 1,
    marginRight: 20,
  },
  dishName: {
    fontSize: 25,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  dishDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 30,
  },
  imageContainer: {
    width: 160,
    height: screenHeight * 0.25, // dynamically take ~25% of screen height
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 0, // remove right border
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dishImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 0,
    paddingLeft: 20,
  },
  ingredientsSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  forPeople: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 14,
  },
  underline: {
    height: 1,
    backgroundColor: '#D1D1D1',
    width: '100%',
    marginBottom: 12,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  ingredientName: {
    fontSize: 15,
    color: '#000',
    fontWeight: '400',
  },
  ingredientQuantity: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
    minWidth: 80,
    textAlign: 'right',
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
};
