import { AxiosInstance } from "axios";
import qs from "qs";
import { BaseService, IPagination } from "./base";

interface IList extends IPagination {}

export interface Announcement {
  title: string;
  description: string;
}

export class AnnouncementService extends BaseService {
  constructor(client: AxiosInstance) {
    super(client);
  }

  async list({ start, limit }: IList) {
    const query = qs.stringify({
      pagination: {
        start,
        limit,
      },
    });
    const { data: announcementResponse } = await this.client.get(`/announcements?${query}`);
    const announcement = announcementResponse.data.map((announcement: any) => ({
      id: announcement.id,
      title: announcement.attributes.title,
      description: announcement.attributes.description,
    }));
    return announcement as Announcement;
  }
}
