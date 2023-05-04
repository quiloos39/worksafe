import { ElementContainer } from "@/components/ElementContainer/ElementContainer";
import { Layout } from "@/components/Layout/Layout";
import { client } from "@/lib/client";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCookie } from "cookies-next";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Incident } from "worksafe-client/dist/services/incident";
import { User } from "worksafe-client/dist/services/user";

export const getServerSideProps: GetServerSideProps<IncidentPageProps, {}> = async ({ req, res, query }) => {
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

  const id = query.id as string;

  try {
    const incident = await client.incident.retrieve(id);
    const user = await client.user.me();

    return {
      props: {
        user,
        incident,
      },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/incidents",
      },
    };
  }
};

type IncidentPageProps = {
  user: User;
  incident: Incident;
};

const IncidentPage: NextPage<IncidentPageProps> = ({ user, incident }) => {
  return (
    <Layout user={user}>
      <Button variant="unstyled" color="rgba(29 78 216)" fontWeight="normal" mb={4}>
        <Link href="/incidents">
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{
              marginRight: "0.5rem",
            }}
          />
          <span>Back</span>
        </Link>
      </Button>
      <Heading size="lg" mb={4}>
        {incident.title}
      </Heading>
      <ElementContainer>
        <Text maxWidth={1200} mb={8}>
          {incident.content}
        </Text>
        <Flex alignItems="center" gap={2}>
          <Box position="relative" width={10} height={10} overflow="hidden" rounded="full">
            {user.avatar ? <Image alt="" src={user.avatar} fill className="object-cover" /> : <div className="bg-black w-full h-full" />}
          </Box>
          <Text>
            {user.firstName} {user.lastName}
          </Text>
        </Flex>
      </ElementContainer>
    </Layout>
  );
};

export default IncidentPage;
