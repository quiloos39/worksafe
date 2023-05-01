import axios, { AxiosInstance } from "axios";
import { AnnouncementService } from "./services/announcement";
import { IncidentService } from "./services/incident";
import { UserService } from "./services/user";

type WorkSafeConstructor = {
  baseURL: string;
};

export class WorkSafe {
  incident: IncidentService;
  client: AxiosInstance;
  announcement: AnnouncementService;
  user: UserService;

  constructor({ baseURL }: WorkSafeConstructor) {
    this.client = axios.create({
      baseURL,
    });
    this.incident = new IncidentService(this.client);
    this.user = new UserService(this.client);
    this.announcement = new AnnouncementService(this.client);
  }
}