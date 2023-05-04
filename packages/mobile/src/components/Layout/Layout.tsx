import { Box, ScrollView } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <Box padding={4}>{children}</Box>
      </ScrollView>
    </SafeAreaView>
  );
};
