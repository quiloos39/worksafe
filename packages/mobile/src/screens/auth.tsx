import { Image } from "expo-image";
import * as SecureStore from "expo-secure-store";
import { Alert, Box, Button, Center, FormControl, Heading, Input, Text } from "native-base";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "../components/AuthContextProvider/AuthContextProvider";
import { client } from "../lib/client";

interface IAuthForm {
  email: string;
  password: string;
  network?: string;
}

export const AuthScreen = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
    reset,
    clearErrors,
  } = useForm<IAuthForm>();

  const { setToken } = useContext(AuthContext);

  async function onSubmit(data: IAuthForm) {
    client.client.defaults.headers.common["Authorization"] = "";
    try {
      const user = await client.user.auth({
        email: data.email,
        password: data.password,
      });
      await SecureStore.setItemAsync("token", user.token);
      setToken(user.token);
    } catch (e) {
      if (e instanceof Error) {
        setError("network", {
          message: e.message,
          type: "manual",
        });
      }
    }
  }

  return (
    <>
      <Center flex={1} padding={10} background="gray.50">
        <Image source={require("../../assets/logo.svg")} style={{ width: 260, height: 90, alignSelf: "center" }} contentFit="contain" />
        <Heading fontSize="4xl" textAlign="center">
          Hello Again!
        </Heading>
        <Text fontSize="lg" textAlign="center" mb={4}>
          Welcome back you've been missed
        </Text>
        <Box width="full">
          {!!errors.network && (
            <Alert width="full" my={4} status="error">
              <Text>{errors.network.message}</Text>
            </Alert>
          )}
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Enter email"
                  bgColor="white"
                  mb={4}
                  rounded="lg"
                  onChangeText={(text) => onChange(text)}
                  value={value}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Password"
                  type="password"
                  bgColor="white"
                  mb={8}
                  rounded="lg"
                  onChangeText={(text) => onChange(text)}
                  value={value}
                />
              )}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            rounded="lg"
            onPress={(e) => {
              clearErrors("network");
              handleSubmit(onSubmit)(e);
            }}
            isLoading={isSubmitting}
          >
            Sign In
          </Button>
        </Box>
      </Center>
    </>
  );
};
