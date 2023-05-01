import { ElementContainer } from "@/components/ElementContainer/ElementContainer";
import { IncidentsTable } from "@/components/IncidentsTable/IncidentsTable";
import { Layout } from "@/components/Layout/Layout";
import { client, fetchIncidents, fetchUser } from "@/lib/client";
import {
  Alert,
  AlertDescription,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { FormProvider, useForm } from "react-hook-form";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const jwt = getCookie("jwt", { req, res }) as string;

  if (!jwt) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
    };
  }

  try {
    const user = await fetchUser(jwt);
    const incidents = await fetchIncidents(jwt);

    return {
      props: {
        user,
        incidents,
      },
    };
  } catch (e) {
    deleteCookie("jwt");
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
    };
  }
};

const useCreateIncidentForm = () => {
  const modal = useDisclosure();

  const userQuery = useQuery(
    ["users"],
    async () => {
      const jwt = getCookie("jwt") as string;
      const { data: users } = await client.get("/users", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return users;
    },
    {
      initialData: [],
    }
  );

  const mutateIncidentQuery = useMutation(["incidents"], async (incident: IncidentInterface) => {
    const jwt = getCookie("jwt") as string;
    await client.post(
      "/incidents",
      {
        data: {
          title: incident.title,
          content: incident.content,
          date: incident.date,
          ...(incident.user && {
            user: {
              id: incident.user,
            },
          }),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  });

  const form = useForm<IncidentInterface>();

  return {
    modal,
    userQuery,
    mutateIncidentQuery,
    form,
  };
};

const IncidentsPage = ({ incidents, user }) => {
  const { form, modal, userQuery, mutateIncidentQuery } = useCreateIncidentForm();
  return (
    <Layout user={user}>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose} size="4xl" isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Incident</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormProvider {...form}>
              <CreateIncidentForm userQuery={userQuery} mutateIncidentQuery={mutateIncidentQuery} />
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Incidents</h1>
        <Button colorScheme="purple" size="sm" px="8" onClick={modal.onOpen}>
          Create
        </Button>
      </div>
      <ElementContainer>
        <IncidentsTable incidents={incidents}></IncidentsTable>
      </ElementContainer>
    </Layout>
  );
};

type IncidentInterface = {
  title: string;
  content: string;
  user: string;
  date: string;
};

const CreateIncidentForm = ({ userQuery, mutateIncidentQuery }) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IncidentInterface>();
  const { data: users } = userQuery;
  return (
    <form onSubmit={handleSubmit((data) => mutateIncidentQuery.mutate(data))}>
      {!!mutateIncidentQuery.error && (
        <Alert status="error" mb={8}>
          <AlertDescription>{mutateIncidentQuery.error?.message}</AlertDescription>
        </Alert>
      )}

      <FormControl mb={4} isInvalid={!!errors.title}>
        <FormLabel>Title</FormLabel>
        <Input
          {...register("title", {
            required: "Title is required",
          })}
        />
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!!errors.content}>
        <FormLabel>Content</FormLabel>
        <Textarea
          size="lg"
          {...register("content", {
            required: "Content is required",
          })}
        />
        <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
      </FormControl>

      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem>
          <FormControl mb={4}>
            <FormLabel>User</FormLabel>
            <Select placeholder="Select user" disabled={userQuery.isUsersLoading} {...register("user")}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </Select>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl mb={4} isInvalid={!!errors.date}>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              {...register("date", {
                required: "Date is required",
              })}
            />
            <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>

      <Button colorScheme="purple" isLoading={mutateIncidentQuery.isLoading} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default IncidentsPage;
