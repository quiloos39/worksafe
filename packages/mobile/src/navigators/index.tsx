import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContextProvider/AuthContextProvider";
import { AuthScreen } from "../screens/auth";
import { BottomNavigator } from "./bottom";

const Stack = createStackNavigator();

export const Navigation = () => {
  const { token } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!token ? <Stack.Screen name="Auth" component={AuthScreen} /> : <Stack.Screen name="BottomTabStack" component={BottomNavigator} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
