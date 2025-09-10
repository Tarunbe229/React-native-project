import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function DishCard({
  dish,
  count,
  onCountChange,
  onIngredientPress,
  onCardPress,
  onReadMorePress
}) {
  const handleAdd = (e) => {
    e?.stopPropagation();
    onCountChange(1);
  };

  const handleRemove = (e) => {
    e?.stopPropagation();
    onCountChange(0);
  };

  const handleIngredientPress = (e) => {
    e?.stopPropagation();
    onIngredientPress();
  };

  const handleReadMorePress = (e) => {
    e?.stopPropagation();
    onReadMorePress();
  };

  const getImageSource = () => {
    if (dish.image) {
      return { uri: dish.image };
    } else if (dish.category?.image) {
      return { uri: dish.category.image };
    } else {
      return { uri: 'https://via.placeholder.com/120x120?text=Dish' };
    }
  };

  const getVegSymbol = () => {
    if (dish.type === 'VEG') {
      return (
        <View style={styles.vegSymbolContainer}>
          <View style={styles.vegDot} />
        </View>
      );
    } else {
      return (
        <View style={styles.nonVegSymbolContainer}>
          <View style={styles.nonVegDot} />
        </View>
      );
    }
  };

  // Truncate description to fit ~1.5 lines including ".... Read more"
  const getShortDescription = () => {
    if (!dish.description) return '';
    const maxChars = 38; // adjust for approx 1.5 lines
    const truncated = dish.description.length > maxChars
      ? dish.description.substring(0, maxChars)
      : dish.description;
    return truncated;
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onCardPress}
      activeOpacity={0.7}
    >
      <View style={styles.details}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{dish.name}</Text>
          {getVegSymbol()}
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            {getShortDescription()}
            <Text style={styles.readMoreText} onPress={handleReadMorePress}>
              .... Read more
            </Text>
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.ingredientButtonContainer} 
          onPress={handleIngredientPress}
        >
          <View style={styles.ingredientIconContainer}>
            <Text style={styles.ingredientIcon}>🍚</Text>
          </View>
          <Text style={styles.ingredientText}>Ingredient</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Image source={getImageSource()} style={styles.image} />
        </View>
        
        {count === 0 ? (
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add +</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  details: {
    flex: 1,
    marginRight: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  vegSymbolContainer: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#4CAF50',
    borderRadius: 5,
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vegDot: {
    width: 8,
    height: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  nonVegSymbolContainer: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#F44336',
    borderRadius: 5,
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nonVegDot: {
    width: 8,
    height: 8,
    backgroundColor: '#F44336',
    borderRadius: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'opensans-italic',
    color: '#000',
    flexShrink: 1,
  },
  descriptionContainer: {
    marginBottom: 16,
    marginTop: 8,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    fontFamily: 'OpenSans-Italic',
  },
  readMoreText: {
    color: '#000',        // dark color
    fontWeight: '700',    // bold
    fontFamily: 'OpenSans-Italic',
  },
  ingredientButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  ingredientIconContainer: {
    backgroundColor: '#FFA500',
    width: 22,
    height: 22,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    padding: 0,
  },
  ingredientIcon: {
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'center',
  },
  ingredientText: {
    fontSize: 14,
    color: '#f4962bff',
    fontWeight: '700',
    fontFamily: 'OpenSans-SemiBold',
  },
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  imageWrapper: {
    width: 120,
    height: 100,
    backgroundColor: '#404040',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 85,
    borderRadius: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: -15,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 26,
    paddingVertical: 8,
    borderRadius: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  addButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Italic',
  },
  removeButton: {
    position: 'absolute',
    bottom: -15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  removeButtonText: {
    color: '#FF941A',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Italic',
  },
});
