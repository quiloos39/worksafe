import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { ProfileScreen } from "../screens/profile";
import { IncidentNavigator } from "./incidents";

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
        component={IncidentNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="human-dolly" size={size - 6} color={color} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="human-male" size={size - 6} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
