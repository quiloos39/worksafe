// @ts-nocheck

import { Button, Table, TableContainer, Tag, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { Incident } from "worksafe-client/dist/services/incident";

type IncidentTableProps = {
  incidents: Incident[];
};

const StatusColors = {
  "In Progress": "yellow",
  Open: "blue",
  Closed: "red",
};

export const IncidentTable = ({ incidents }: IncidentTableProps) => {
  return (
    <TableContainer width="100%">
      <Table size="sm" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Attached User</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {incidents.map((incident) => (
            <Tr key={incident.id}>
              <Th>{incident.title}</Th>
              <Th>{!incident.user ? "None" : `${incident.user.firstName} ${incident.user.lastName}`}</Th>
              <Th>
                <Tag size="sm" colorScheme={StatusColors[incident.status]}>
                  {incident.status}
                </Tag>
              </Th>
              <Th>{moment(incident.createdAt).format("YYYY-MM-DD HH:mm")}</Th>
              <Th>
                <Button size="sm">
                  <Link href={`/incidents/${incident.id}`}>Details</Link>
                </Button>
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
