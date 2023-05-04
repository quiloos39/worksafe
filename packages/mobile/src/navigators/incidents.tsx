import { createStackNavigator } from "@react-navigation/stack";
import { IncidentScreen } from "../screens/incident";
import { IncidentsScreen } from "../screens/incidents";

const Stack = createStackNavigator();

export const IncidentNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Incidents" component={IncidentsScreen} />
      <Stack.Screen name="Incident" component={IncidentScreen} />
    </Stack.Navigator>
  );
};
