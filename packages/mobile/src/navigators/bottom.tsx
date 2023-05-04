import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { HomeScreen } from "../screens/home";

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Incidents"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="human-dolly" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
