import { WorkSafe } from "worksafe-client";

export const client = new WorkSafe({
  baseURL: "http://192.168.1.109:1337/api",
});
