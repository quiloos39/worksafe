import { WorkSafe } from "worksafe-client";

export const client = new WorkSafe({
  baseURL: "http://localhost:1337/api",
});
