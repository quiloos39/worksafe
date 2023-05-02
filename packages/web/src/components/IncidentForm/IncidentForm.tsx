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
  Select,
  Textarea,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

export type IncidentInterface = {
  title: string;
  content: string;
  user: string;
  date: string;
  network: string;
};

type IncidentFormProps = {
  users?: {
    id: string;
    firstName: string;
    lastName: string;
  }[];
  onSubmit?: SubmitHandler<IncidentInterface>;
  isSubmitting?: boolean;
};

export const IncidentForm = ({ onSubmit, isSubmitting = false, users }: IncidentFormProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IncidentInterface>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!!errors.network && (
        <Alert status="error" mb={8}>
          <AlertDescription>{errors.network.message}</AlertDescription>
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
            <FormLabel>Attach User</FormLabel>
            <Select placeholder={!users ? "Loading.." : "Select user"} disabled={!users} {...register("user")}>
              {users &&
                users.map((user) => (
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

      <Button colorScheme="purple" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};
