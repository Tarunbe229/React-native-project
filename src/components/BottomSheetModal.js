import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.55;

export default function BottomSheetModal({
  visible,
  dish,
  count,
  onClose,
  onCountChange,
  onIngredientPress
}) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(animatedValue, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    } else {
      Animated.timing(animatedValue, { toValue: 0, duration: 250, useNativeDriver: true }).start();
    }
  }, [visible]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dy) > 5,
    onPanResponderMove: (evt, gestureState) => { if (gestureState.dy > 0) panY.setValue(gestureState.dy); },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 100 || gestureState.vy > 0.5) onClose();
      else Animated.spring(panY, { toValue: 0, useNativeDriver: true }).start();
    },
  });

  if (!dish) return null;

  const handleAdd = () => onCountChange(dish.id, 1);
  const handleRemove = () => onCountChange(dish.id, 0);

  const getImageSource = () => dish.image
    ? { uri: dish.image }
    : dish.category?.image
    ? { uri: dish.category.image }
    : { uri: 'https://via.placeholder.com/300x200?text=Dish' };

  const translateY = animatedValue.interpolate({ inputRange: [0, 1], outputRange: [MODAL_HEIGHT, 0] });

  const getVegSymbol = () => dish.type === 'VEG' ? (
    <View style={styles.vegSymbolContainer}><View style={styles.vegDot} /></View>
  ) : (
    <View style={styles.nonVegSymbolContainer}><View style={styles.nonVegDot} /></View>
  );

  return (
    <Modal visible={visible} animationType="none" transparent={true} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, { opacity: animatedValue.interpolate({ inputRange: [0,1], outputRange: [0,1] }) }]}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View style={[styles.modalContainer, { transform: [{ translateY }, { translateY: panY }] }]} {...panResponder.panHandlers}>
              <View style={styles.handleBar} />

              <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <View style={styles.imageContainer}>
                  <Image source={getImageSource()} style={styles.dishImage} />
                </View>

                <View style={styles.detailsContainer}>
                  {/* Dish Name + Veg/Non-Veg Dot Symbol AFTER name */}
                  <View style={styles.nameRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <Text style={styles.dishName}>{dish.name} </Text>
                      {getVegSymbol()}
                    </View>

                    <TouchableOpacity style={styles.removeButton} onPress={count > 0 ? handleRemove : handleAdd}>
                      <Text style={[styles.removeButtonText, count === 0 && { color: '#4CAF50' }]}>
                        {count > 0 ? 'Remove' : 'Add +'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Full width description */}
                  <Text style={styles.descriptionText}>
                    <Text style={styles.categoryLabel}>{dish.category?.name || 'North Indian'} </Text>
                    {dish.description || 'No description available'}
                  </Text>

                  {/* Ingredient button */}
                  <TouchableOpacity style={styles.ingredientButton} onPress={onIngredientPress}>
                    <Text style={styles.ingredientIcon}>{'\u{1F35A}'}</Text>
                    <Text style={styles.ingredientText}>Ingredient</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContainer: { height: MODAL_HEIGHT, backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 0, paddingTop: 8, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.25, shadowRadius: 10 },
  handleBar: { width: 40, height: 4, backgroundColor: '#ccc', borderRadius: 2, alignSelf: 'center', marginBottom: 15 },
  imageContainer: { width: '90%', height: 200, backgroundColor: '#404040', borderRadius: 20, justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'center', marginBottom: 20 },
  dishImage: { width: '90%', height: '90%', borderRadius: 12 },
  detailsContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, justifyContent: 'space-between' },
  vegSymbolContainer: { width: 18, height: 18, borderWidth: 1.5, borderColor: '#4CAF50', borderRadius: 5, marginLeft: 4, justifyContent: 'center', alignItems: 'center' },
  vegDot: { width: 8, height: 8, backgroundColor: '#4CAF50', borderRadius: 4 },
  nonVegSymbolContainer: { width: 18, height: 18, borderWidth: 1.5, borderColor: '#F44336', borderRadius: 5, marginLeft: 4, justifyContent: 'center', alignItems: 'center' },
  nonVegDot: { width: 8, height: 8, backgroundColor: '#F44336', borderRadius: 4 },
  dishName: { fontSize: 20, fontWeight: '700', color: '#000', fontFamily: 'OpenSans-Bold' },
  descriptionText: { fontSize: 16, color: '#9c9595ff', lineHeight: 22, marginBottom: 16, fontFamily: 'OpenSans-Italic', fontWeight: '600' },
  categoryLabel: { fontWeight: '700', color: '#000', fontFamily: 'OpenSans-Italic' },
  ingredientButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
  ingredientIcon: { fontSize: 18, marginRight: 6, lineHeight: 24, backgroundColor: '#FFA500', borderRadius: 6, paddingHorizontal: 0, color: '#fff', fontWeight: '700', fontFamily: 'OpenSans-SemiBold' },
  ingredientText: { fontSize: 18, color: '#FF941A', fontWeight: '700', fontFamily: 'OpenSans-SemiBold' },
  removeButton: { backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 6, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 2 },
  removeButtonText: { color: '#FF941A', fontSize: 16, fontWeight: 'bold', fontFamily: 'OpenSans-Bold' },
});
