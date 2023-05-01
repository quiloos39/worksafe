import { Button } from "@chakra-ui/react";
import { ElementContainer } from "../ElementContainer/ElementContainer";

export const Announcement = ({ announcements }) => {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Announcements</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {announcements.map((announcement) => (
          <ElementContainer key={announcement.id}>
            <p className="text-lg font-bold mb-2">{announcement.title}</p>
            <p className="mb-4 text-sm">{announcement.shortDescription}</p>
            <Button size="xs" className="mt-auto w-full max-w-[150px]">
              Read More
            </Button>
          </ElementContainer>
        ))}
      </div>
    </div>
  );
};
