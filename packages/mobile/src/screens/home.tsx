import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Avatar, Box, Center, Heading, Pressable, ScrollView, Text, VStack } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Incident } from "worksafe-client/dist/services/incident";
import { User } from "worksafe-client/dist/services/user";
import { client } from "../lib/client";

export const HomeScreen = () => {
  const { data: user } = useQuery(["user"], async () => {
    return await client.user.me();
  });

  const { data: incidents, isLoading } = useQuery(
    ["incidents"],
    async () => {
      return await client.incident.list({});
    },
    {
      enabled: !!user,
    }
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <Box padding={4}>
          {/* <Profile user={user} isLoading={isLoading} /> */}
          <Heading mb={4}>Incidents</Heading>
          <IncidentList incidents={incidents} isLoading={isLoading} />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

const Profile = ({ user, isLoading }: { user?: User; isLoading: boolean }) => {
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
          uri: `http://192.168.1.109:1337${user.avatar}`,
        }}
      />
      <Heading size="lg">
        {user!.firstName} {user!.lastName}
      </Heading>
    </Center>
  );
};

const IncidentList = ({ incidents, isLoading }: { incidents?: Incident[]; isLoading: boolean }) => {
  if (isLoading) {
    return (
      <VStack space={1}>
        <Box backgroundColor="gray.400" height={16} />
        <Box backgroundColor="gray.400" height={16} />
        <Box backgroundColor="gray.400" height={16} />
        <Box backgroundColor="gray.400" height={16} />
        <Box backgroundColor="gray.400" height={16} />
        <Box backgroundColor="gray.400" height={16} />
        <Box backgroundColor="gray.400" height={16} />
        <Box backgroundColor="gray.400" height={16} />
        <Box backgroundColor="gray.400" height={16} />
      </VStack>
    );
  }
  return (
    <>
      <VStack space={1}>
        {incidents!.map((incident) => (
          <Pressable key={incident.id} backgroundColor="white" p={4} rounded="lg" mb={2}>
            <Box>
              <Heading size="md">{incident.title}</Heading>
              <Text fontSize="sm">{moment().diff(moment(incident.date), "days")} days ago</Text>
            </Box>
          </Pressable>
        ))}
      </VStack>
    </>
  );
};
