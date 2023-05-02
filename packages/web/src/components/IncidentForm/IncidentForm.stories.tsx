import { Meta, StoryObj } from "@storybook/react";
import { IncidentForm } from "./IncidentForm";

const meta = {
  title: "IncidentForm",
  component: IncidentForm,
} as Meta<typeof IncidentForm>;

export default meta;

export const Basic: StoryObj<typeof IncidentForm> = {
  render: () => (
    <IncidentForm
      users={[
        {
          id: "1",
          firstName: "Nallaj",
          lastName: "Kumar",
        },
      ]}
    />
  ),
};
