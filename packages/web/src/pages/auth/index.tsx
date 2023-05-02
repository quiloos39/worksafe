import { IAuthFormInputs } from "@/components/AuthForm/AuthForm";
import { client } from "@/lib/client";
import { Alert, Box, Divider, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { getCookie, setCookie } from "cookies-next";
import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const jwt = getCookie("jwt", { req, res });

  if (jwt) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};

const Homepage: NextPage = () => {
  const form = useForm<IAuthFormInputs>();
  const {
    setError,
    formState: { errors },
  } = form;
  const router = useRouter();

  const onSubmit = async (data: IAuthFormInputs) => {
    if (data.remember) {
      localStorage.setItem("email", data.email);
    } else {
      localStorage.removeItem("email");
    }

    try {
      client.client.defaults.headers.common = {
        Authorization: ``,
      };
      const user = await client.user.auth({ email: data.email, password: data.password });
      setCookie("jwt", user.token);
      await router.push("/");
    } catch (e) {
      setError("networkError", {
        type: "manual",
        message: "Invalid email or password",
      });
    }
  };

  const AuthForm = dynamic(() => import("@/components/AuthForm/AuthForm").then((e) => e.AuthForm), {
    ssr: false,
    loading: () => (
      <Box>
        <Box className="animate-pulse bg-gray-200 h-[30px] mb-4" />
        <Box className="animate-pulse bg-gray-200 h-[30px] mb-4" />
        <Box className="animate-pulse bg-gray-200 h-[30px] w-[200px]" />
      </Box>
    ),
  });

  return (
    <>
      <SimpleGrid columns={2} h="100vh">
        <Box>
          <Flex height="full" alignItems="center" justifyContent="center">
            <Box>
              <Image alt="" src="/logo.svg" width={200} height={100} style={{ marginBottom: "1rem", objectFit: "cover" }} />
              <Heading size="lg">My Workspace</Heading>
              <Text>Log into your workspace to check safety of employees.</Text>
              <Divider />
              {errors.networkError && (
                <Alert status="error" className="mb-5">
                  {errors.networkError.message}
                </Alert>
              )}
              <FormProvider {...form}>
                <AuthForm onSubmit={onSubmit} />
              </FormProvider>
            </Box>
          </Flex>
        </Box>
        <Box backgroundColor="rgb(107 33 168)" />
      </SimpleGrid>
    </>
  );
};

export default Homepage;
