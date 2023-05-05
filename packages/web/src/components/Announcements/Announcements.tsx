import { Box, Button, Heading, Text } from "@chakra-ui/react";
import type { Announcement as IAnnouncement } from "worksafe-client/dist/services/announcement";
import { ElementContainer } from "../ElementContainer/ElementContainer";

type AnnouncementsProps = {
  announcements: IAnnouncement[];
};

export const Announcement = ({ announcements }: AnnouncementsProps) => {
  return (
    <Box>
      <Heading size="large" mb={4}>
        Announcements
      </Heading>
      <div className="grid lg:grid-cols-3 gap-5">
        {announcements.map((announcement) => (
          <ElementContainer key={announcement.id}>
            <Heading size="md" mb={2}>
              {announcement.title}
            </Heading>
            <Text mb={4}>{announcement.description}</Text>
            <Button size="xs" className="mt-auto w-full max-w-[150px]">
              Read More
            </Button>
          </ElementContainer>
        ))}
      </div>
    </Box>
  );
};
