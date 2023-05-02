// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";
import { IncidentTable } from "./IncidentTable";

const meta: Meta<typeof IncidentTable> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "IncidentTable",
  component: IncidentTable,
};

export default meta;
type Story = StoryObj<typeof IncidentTable>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Basic: Story = {
  render: () => (
    <IncidentTable
      incidents={[
        {
          id: "1",
          content: "",
          createdAt: new Date().toString(),
          status: "Open",
          title: "Test",
        },
      ]}
    />
  ),
};
