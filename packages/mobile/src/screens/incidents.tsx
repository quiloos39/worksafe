import { useQuery } from "@tanstack/react-query";
import { Heading } from "native-base";
import React from "react";
import { IncidentList } from "../components/IncidentList/IncidentList";
import { Layout } from "../components/Layout/Layout";
import { client } from "../lib/client";

export const IncidentsScreen = () => {
  const { data: incidents, isLoading } = useQuery(["incidents"], async () => {
    return await client.incident.list({});
  });

  return (
    <Layout>
      <Heading mb={4}>Incidents</Heading>
      <IncidentList incidents={incidents} isLoading={isLoading} />
    </Layout>
  );
};
