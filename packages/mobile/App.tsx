import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loadAsync } from "expo-font";
import { NativeBaseProvider } from "native-base";
import { useEffect } from "react";
import "react-native-gesture-handler";
import { AuthContextProvider } from "./src/components/AuthContextProvider/AuthContextProvider";
import { Navigation } from "./src/navigators";

export const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    async function loadFont() {
      await loadAsync("../../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf");
    }
    loadFont();
  }, []);

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <Navigation />
        </NativeBaseProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
