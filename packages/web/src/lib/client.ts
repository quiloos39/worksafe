import { WorkSafe } from "worksafe-client";

export const client = new WorkSafe({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
});
