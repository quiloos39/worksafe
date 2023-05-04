import { Avatar, Box, Center, Heading } from "native-base";
import { User } from "worksafe-client/dist/services/user";

import Constants from "expo-constants";

const imageUrl = Constants.expoConfig?.extra?.imageUrl;

export const Profile = ({ user, isLoading }: { user?: User; isLoading: boolean }) => {
  if (isLoading) {
    return (
      <Center p={8}>
        <Box backgroundColor="gray.400" height={100} width={100} mb={2} rounded="full" />
        <Box backgroundColor="gray.400" height={8} width={200} />
      </Center>
    );
  }
  return (
    <Center p={8}>
      <Avatar
        width={100}
        height={100}
        mb={2}
        source={{
          uri: `${imageUrl}${user.avatar}`,
        }}
      />
      <Heading size="lg">
        {user!.firstName} {user!.lastName}
      </Heading>
    </Center>
  );
};
