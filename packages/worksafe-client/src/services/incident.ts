import { AxiosInstance } from "axios";
import qs from "qs";
import { BaseService, IPagination } from "./base";
import { User } from "./user";

interface IList extends IPagination {}

export interface Incident {
  id: string;
  title: string;
  status: string;
  date: string;
  content: string;
  createdAt: string;
  attachedUser?: User;
  createdUser?: User;
}

interface INewIncident {
  title: string;
  date: string;
  content: string;
  userId?: string;
}

export class IncidentService extends BaseService {
  constructor(client: AxiosInstance) {
    super(client);
  }

  private transformUserResponse(userResponse: any) {
    return {
      id: userResponse.id,
      email: userResponse.attributes.email,
      firstName: userResponse.attributes.firstName,
      lastName: userResponse.attributes.lastName,
      avatar: userResponse.attributes.avatar?.data?.attributes?.url || null,
    };
  }

  async list({ start = 0, limit = 25 }: IList) {
    const query = qs.stringify({
      populate: ["attachedUser", "attachedUser.avatar", "createdUser", "createdUser.avatar"],
      pagination: {
        start,
        limit,
      },
    });

    const { data: incidentsResponse } = await this.client.get(`/incidents?${query}`);
    const incidents = incidentsResponse.data.map((incidentResponse: any) => ({
      id: incidentResponse.id,
      title: incidentResponse.attributes.title,
      status: incidentResponse.attributes.status,
      date: incidentResponse.attributes.date,
      createdAt: incidentResponse.attributes.createdAt,
      content: incidentResponse.attributes.content,
      ...(incidentResponse.attributes?.attachedUser?.data && {
        user: this.transformUserResponse(incidentResponse.attributes.attachedUser.data),
      }),
      ...(incidentResponse.attributes?.createdUser?.data && {
        user: this.transformUserResponse(incidentResponse.attributes.createdUser.data),
      }),
    }));
    return incidents as Incident[];
  }

  async retrieve(id: string) {
    const query = qs.stringify({
      populate: ["attachedUser", "attachedUser.avatar", "createdUser", "createdUser.avatar"],
    });
    const { data: incidentResponse } = await this.client.get(`/incidents/${id}?${query}`);
    const incident = {
      id: incidentResponse.data.id,
      title: incidentResponse.data.attributes.title,
      status: incidentResponse.data.attributes.status,
      date: incidentResponse.data.attributes.date,
      createdAt: incidentResponse.data.attributes.createdAt,
      content: incidentResponse.data.attributes.content,
      ...(incidentResponse.data.attributes?.attachedUser?.data && {
        user: this.transformUserResponse(incidentResponse.data.attributes.attachedUser.data),
      }),
      ...(incidentResponse.data.attributes?.createdUser?.data && {
        user: this.transformUserResponse(incidentResponse.data.attributes.createdUser.data),
      }),
    };
    return incident as Incident;
  }

  async create(incident: INewIncident) {
    const query = qs.stringify({
      populate: ["attachedUser", "attachedUser.avatar", "createdUser", "createdUser.avatar"],
    });

    const { data: incidentResponse } = await this.client.post(`/incidents?${query}`, {
      data: {
        title: incident.title,
        date: incident.date,
        content: incident.content,
        ...(incident.userId && {
          id: incident.userId,
        }),
      },
    });

    const createdIncident = {
      id: incidentResponse.data.id,
      title: incidentResponse.data.attributes.title,
      status: incidentResponse.data.attributes.status,
      date: incidentResponse.data.attributes.date,
      createdAt: incidentResponse.data.attributes.createdAt,
      content: incidentResponse.data.attributes.content,
      ...(incidentResponse.data.attributes?.attachedUser?.data && {
        user: this.transformUserResponse(incidentResponse.data.attributes.attachedUser.data),
      }),
      ...(incidentResponse.data.attributes?.createdUser?.data && {
        user: this.transformUserResponse(incidentResponse.data.attributes.createdUser.data),
      }),
    };
    return createdIncident as Incident;
  }
}
