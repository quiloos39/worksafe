import { Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";

export type IAuthFormInputs = {
  email: string;
  password: string;
  remember: string;
  networkError: string;
};

type AuthFormProps = {
  onSubmit: (data: IAuthFormInputs) => void;
};

export const AuthForm = ({ onSubmit }: AuthFormProps) => {
  const {
    handleSubmit,
    register,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<IAuthFormInputs>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  useLayoutEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      resetField("email", { defaultValue: email });
      resetField("remember", { defaultValue: "true" });
    }
  }, [resetField]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl className="mb-5" isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="email" {...register("email", { required: "Email is required" })} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl className="mb-5" isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            {...register("password", { required: "Password is required" })}
          />
          <InputRightElement width="4.5rem">
            <Button size="sm" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <div className="flex justify-between mb-10">
        <Checkbox {...register("remember")}>Remember Me</Checkbox>
        {/* <Link href="/forget-password">Forgot password ?</Link> */}
      </div>
      <Button className="w-full" isLoading={isSubmitting} type="submit">
        Sign In
      </Button>
    </form>
  );
};
