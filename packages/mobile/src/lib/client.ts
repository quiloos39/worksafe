import Constants from "expo-constants";
import { WorkSafe } from "worksafe-client";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

export const client = new WorkSafe({
  baseURL: apiUrl,
});
