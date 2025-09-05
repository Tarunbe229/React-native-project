import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DishDetailScreen from '../screens/DishDetailScreen';
import IngredientsScreen from '../screens/IngredientsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DishDetail" component={DishDetailScreen} />
      <Stack.Screen name="Ingredients" component={IngredientsScreen} />
    </Stack.Navigator>
  );
}