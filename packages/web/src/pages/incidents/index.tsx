import { ElementContainer } from "@/components/ElementContainer/ElementContainer";
import { IncidentForm, IncidentInput } from "@/components/IncidentForm/IncidentForm";
import { IncidentTable } from "@/components/IncidentTable/IncidentTable";
import { Layout } from "@/components/Layout/Layout";
import { client } from "@/lib/client";
import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { GetServerSideProps, NextPage } from "next";
import { FormProvider, useForm } from "react-hook-form";
import { Incident } from "worksafe-client/dist/services/incident";
import { User } from "worksafe-client/dist/services/user";
import { queryClient } from "../_app";

export const getServerSideProps: GetServerSideProps<IncidentPageProps, {}> = async ({ req, res }) => {
  const jwt = getCookie("jwt", { req, res }) as string;

  if (!jwt) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
    };
  }

  client.client.defaults.headers.common = {
    Authorization: `Bearer ${jwt}`,
  };

  try {
    const user = await client.user.me();
    const incidents = await client.incident.list({});

    return {
      props: {
        user,
        initialIncidents: incidents,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

type IncidentPageProps = {
  initialIncidents: Incident[];
  user: User;
};

const IncidentsPage: NextPage<IncidentPageProps> = ({ initialIncidents, user }) => {
  const { onClose, isOpen, onOpen } = useDisclosure();

  const { data: users } = useQuery(["users"], async () => {
    const jwt = getCookie("jwt") as string;
    client.client.defaults.headers.common = {
      Authorization: `Bearer ${jwt}`,
    };
    const users = await client.user.list({});
    return users;
  });

  const { data: incidents } = useQuery(
    ["incidents"],
    async () => {
      const jwt = getCookie("jwt") as string;
      client.client.defaults.headers.common = {
        Authorization: `Bearer ${jwt}`,
      };
      const incidents = await client.incident.list({});
      return incidents;
    },
    {
      initialData: initialIncidents,
    }
  );

  const { isLoading, mutate: sendIncident } = useMutation(
    ["incidents"],
    async (incident: IncidentInput) => {
      const jwt = getCookie("jwt") as string;
      client.client.defaults.headers.common = {
        Authorization: `Bearer ${jwt}`,
      };
      const newIncident = await client.incident.create({
        content: incident.content,
        title: incident.title,
        userId: incident.user,
        date: incident.date,
      });
      return [...incidents, newIncident];
    },
    {
      onSuccess: (data) => {
        queryClient.setQueriesData(["incidents"], data);
        onClose();
      },
    }
  );

  const form = useForm();

  return (
    <Layout user={user}>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Incident</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormProvider {...form}>
              <IncidentForm users={users} isSubmitting={isLoading} onSubmit={(data) => sendIncident(data)} />
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex mb={4}>
        <Heading size="lg">Incidents</Heading>
        <Spacer />
        <Button colorScheme="purple" size="sm" px="8" onClick={onOpen}>
          Create
        </Button>
      </Flex>
      <ElementContainer>
        <IncidentTable incidents={incidents} />
      </ElementContainer>
    </Layout>
  );
};

export default IncidentsPage;
