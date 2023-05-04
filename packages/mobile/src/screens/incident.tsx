import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Box, Flex, Heading, Pressable, Text } from "native-base";
import React from "react";
import { Layout } from "../components/Layout/Layout";
import { client } from "../lib/client";

export const IncidentScreen = ({ route, navigation }) => {
  const { data: incident, isLoading } = useQuery(["incident", route.params.id], async () => {
    return await client.incident.retrieve(route.params.id);
  });

  if (isLoading) {
    return null;
  }

  return (
    <Layout>
      <Pressable onPress={() => navigation.pop()}>
        <Flex direction="row" alignItems="center" mb={4}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" style={{ marginRight: 8 }} />
          <Heading>{incident!.title}</Heading>
        </Flex>
      </Pressable>

      <Box padding={4} backgroundColor="white" rounded="lg" mb={4}>
        <Text>{incident!.content}</Text>
      </Box>
      {incident!.createdUser && (
        <Box padding={4} backgroundColor="white" rounded="lg">
          <Text>
            Reported by {incident!.createdUser.firstName} {incident!.createdUser.lastName}
          </Text>
        </Box>
      )}
    </Layout>
  );
};
