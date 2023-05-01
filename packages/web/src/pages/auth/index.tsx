import { IAuthFormInputs } from "@/components/AuthForm/AuthForm";
import { client } from "@/lib/client";
import { Alert } from "@chakra-ui/react";
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
      const { data: user } = await client.post("/auth/local", {
        identifier: data.email,
        password: data.password,
      });

      setCookie("jwt", user.jwt);

      await router.push("/");
    } catch (e) {
      setError("networkError", {
        type: "manual",
        message: "Invalid email or password",
      });
      return new Error("Invalid");
    }
  };

  const AuthForm = dynamic(() => import("@/components/AuthForm/AuthForm").then((e) => e.AuthForm), {
    ssr: false,
    loading: () => (
      <div>
        <div className="animate-pulse bg-gray-200 h-[30px] mb-4" />
        <div className="animate-pulse bg-gray-200 h-[30px] mb-4" />
        <div className="animate-pulse bg-gray-200 h-[30px] w-[200px]" />
      </div>
    ),
  });

  return (
    <>
      <div className="grid h-screen grid-cols-2">
        <div className="flex flex-col items-center justify-center lg:col-span-1 col-span-2">
          <div className="max-w-[500px] w-full">
            <Image alt="" src="/logo.svg" width={200} height={100} className="mb-8 pointer-events-none" />
            <h1 className="text-4xl font-bold mb-2">My Workspace</h1>
            <p className="text-gray-400">Log into your workspace to check safety of employees.</p>
            <hr className="my-5" />
            {errors.networkError && (
              <Alert status="error" className="mb-5">
                {errors.networkError.message}
              </Alert>
            )}
            <FormProvider {...form}>
              <AuthForm onSubmit={onSubmit} />
            </FormProvider>
          </div>
        </div>
        <div className="bg-purple-800 lg:block hidden" />
      </div>
    </>
  );
};

export default Homepage;
