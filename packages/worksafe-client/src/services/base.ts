import { AxiosInstance } from "axios";

export interface IPagination {
  start?: number;
  limit?: number;
}

export class BaseService {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
}
