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
import { useForm } from "react-hook-form";

export type IncidentInterface = {
  title: string;
  content: string;
  user: string;
  date: string;
};

export const CreateIncidentForm = ({ userQuery, mutateIncidentQuery }) => {
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
