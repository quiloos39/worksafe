import { useQuery } from "@tanstack/react-query";
import { Box, Button, Flex } from "native-base";
import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContextProvider/AuthContextProvider";
import { Profile } from "../components/Profile/Profile";
import { client } from "../lib/client";

export const ProfileScreen = () => {
  const { data: user, isLoading } = useQuery(["user"], async () => {
    return await client.user.me();
  });

  const { setToken } = useContext(AuthContext);

  return (
    <Box
      padding={8}
      style={{
        flex: 1,
      }}
    >
      <Profile user={user} isLoading={isLoading} />
      <Flex
        direction="column"
        justifyContent="space-between"
        style={{
          flex: 1,
        }}
      >
        <Box></Box>
        <Button
          onPress={() => {
            setToken(undefined);
          }}
        >
          Log out
        </Button>
      </Flex>
    </Box>
  );
};
