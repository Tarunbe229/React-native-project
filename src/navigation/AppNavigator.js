import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import IngredientsScreen from '../screens/IngredientsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Ingredients" 
        component={IngredientsScreen}
        options={{
          title: 'Ingredient list',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000',
          },
          headerTintColor: '#000',
        }}
      />
    </Stack.Navigator>
  );
}
