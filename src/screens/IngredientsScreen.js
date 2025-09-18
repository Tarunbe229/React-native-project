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
import vegetableImg from '../assets/vegetable.png';

export default function IngredientsScreen({ route, navigation }) {
  const { dish } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const getImageSource = () => {
    return vegetableImg;
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
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ingredient list</Text>
      </View>
      {/* Dish Card */}
      <View style={styles.dishCard}>
        <View style={styles.dishInfo}>
          <Text style={styles.dishName} numberOfLines={1} ellipsizeMode="tail">
            {dish.name}
          </Text>
          <Text style={styles.dishDescription}>{dish.description}</Text>
          <View style={styles.ingredientsInline}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <Text style={styles.forPeople}>For {dish.forPeople || 2} people</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={getImageSource()} style={styles.dishImage} />
        </View>
      </View>
      {/* underline */}
      <View style={styles.underline} />
      {/* Ingredient List */}
      <View style={styles.ingredientsSection}>
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
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#f9f9f9ff',
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 20,
    padding: 4,
  },
  backArrow: {
    fontSize: 32,
    color: '#000',
    fontWeight: '500',
    marginTop: -7,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  dishCard: {
    flexDirection: 'row',
    paddingHorizontal: 0,          // removed horizontal padding
    paddingVertical: 18,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-between', // push image fully to right
  },
  dishInfo: {
    flex: 1,
    marginRight: 0,                // removed margin
    paddingLeft: 20,               // optional: keep some space from left
  },
  dishName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
    marginTop: 20,
  },
  dishDescription: {
    fontSize: 12,
    color: '#8b8b8bff',
    lineHeight: 18,
    marginBottom: 14,
  },
  ingredientsInline: {
    marginTop: 65,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 3,
  },
  forPeople: {
    fontSize: 14,
    fontWeight: '400',
    color: '#505050ff',
    marginBottom: 2,
    marginTop: 3,
  },
  imageContainer: {
    width: 180,
    height: screenHeight * 0.28,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dishImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  underline: {
    height: 1,
    backgroundColor: '#e0dadaff',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 8,
  },
  ingredientsSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  ingredientName: {
    fontSize: 14,
    color: '#505050ff',
    fontWeight: '400',
  },
  ingredientQuantity: {
    fontSize: 14,
    color: '#505050ff',
    fontWeight: '400',
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
