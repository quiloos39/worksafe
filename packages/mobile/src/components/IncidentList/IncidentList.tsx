import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { Box, Heading, Pressable, Text, VStack } from "native-base";
import { Incident } from "worksafe-client/dist/services/incident";

export const IncidentList = ({ incidents, isLoading }: { incidents?: Incident[]; isLoading: boolean }) => {
  const navigation = useNavigation();
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
          <Pressable
            key={incident.id}
            backgroundColor="white"
            p={4}
            rounded="lg"
            mb={2}
            onPress={() => {
              navigation.navigate("Incident", { id: incident.id });
            }}
          >
            <Box>
              <Heading size="md">{incident.title}</Heading>
              <Text fontSize="sm">{moment().diff(moment(incident.date), "days") + 1} days ago</Text>
            </Box>
          </Pressable>
        ))}
      </VStack>
    </>
  );
};
