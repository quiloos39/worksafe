import { Button, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { HTMLAttributes } from "react";

export const IncidentsTable = ({ incidents }) => {
  return (
    <TableContainer className="w-full">
      <Table variant="striped">
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
                <Status status={incident.status} />
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

const Status = ({ status }: { status: "In Progress" | "Closed" | "Open" }) => {
  const classes: Record<string, HTMLAttributes<HTMLSpanElement>["className"]> = {
    "In Progress": "bg-yellow-700 p-2 text-xs rounded-lg text-white",
    Closed: "bg-red-700 p-2 rounded-lg text-xs text-white",
    Open: "bg-green-700 p-2 rounded-lg text-xs text-white",
  };
  return <span className={classes[status]}>{status}</span>;
};
