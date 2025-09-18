import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

// 👇 import your ingredient image from assets
import ingredientImg from '../assets/ingredient.png'; // adjust the path as needed

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

  const getShortDescription = () => {
    if (!dish.description) return '';
    const maxChars = 43;
    return dish.description.length > maxChars
      ? dish.description.substring(0, maxChars)
      : dish.description;
  };

  return (
    <View>
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
              {/* normal dots */}
              <Text style={styles.description}>.... </Text>
              {/* bold Read more */}
              <Text style={styles.readMoreText} onPress={handleReadMorePress}>
                Read more
              </Text>
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.ingredientButtonContainer} 
            onPress={handleIngredientPress}
          >
            <View style={styles.ingredientIconContainer}>
              {/* 👇 replaced emoji with image */}
              <Image source={ingredientImg} style={styles.ingredientImage} resizeMode="contain" />
            </View>
            <Text style={styles.ingredientText}>Ingredient</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image source={getImageSource()} style={styles.image} />
          </View>

          {count === 0 ? (
            <TouchableOpacity style={styles.actionButton} onPress={handleAdd}>
              <Text style={styles.addButtonText}>Add +</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.actionButton} onPress={handleRemove}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0,
    marginBottom: 6,
    marginTop: 6,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 0,
    shadowOpacity: 0,
  },
  details: {
    flex: 1,
    marginRight: 12,
    justifyContent: 'center',
    paddingTop: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  vegSymbolContainer: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderColor: '#4CAF50',
    borderRadius: 5,
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vegDot: {
    width: 6,
    height: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  nonVegSymbolContainer: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderColor: '#F44336',
    borderRadius: 5,
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nonVegDot: {
    width: 6,
    height: 6,
    backgroundColor: '#F44336',
    borderRadius: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
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
    color: '#000',
    fontWeight: '700',
    fontFamily: 'OpenSans-Italic',
  },
  ingredientButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  ingredientIconContainer: {
    width: 22,
    height: 22,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    padding: 0,
  },
  ingredientImage: {
    width: 18,
    height: 18,
  },
  ingredientText: {
    fontSize: 13,
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
    height: 110,
    backgroundColor: '#404040',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 0,
  },
  actionButton: {
    position: 'absolute',
    bottom: -16,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 90,
    alignItems: 'center',

    borderWidth: 0,
    elevation: 2,
    shadowColor: '#b3a6a6ff',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1.5,
  },
  addButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Italic',
  },
  removeButtonText: {
    color: '#FF941A',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Italic',
  },
  separator: {
    height: 1,
    width: '94%',
    alignSelf: 'center',
    backgroundColor: '#00000010',
    marginBottom: 6,
    marginTop: 10,
    borderRadius: 2,
  },
});
