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

export class IncidentService extends BaseService {
  constructor(client: AxiosInstance) {
    super(client);
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
        id: incidentResponse.attributes.attachedUser.data.id,
        email: incidentResponse.attributes.attachedUser.data.attributes.email,
        firstName: incidentResponse.attributes.attachedUser.data.attributes.firstName,
        lastName: incidentResponse.attributes.attachedUser.data.attributes.lastName,
        avatar: incidentResponse.attributes.attachedUser.data.attributes.avatar?.data?.attributes?.url || null,
      }),
      ...(incidentResponse.attributes?.createdUser?.data && {
        id: incidentResponse.attributes.attachedUser.data.id,
        email: incidentResponse.attributes.attachedUser.data.attributes.email,
        firstName: incidentResponse.attributes.attachedUser.data.attributes.firstName,
        lastName: incidentResponse.attributes.attachedUser.data.attributes.lastName,
        avatar: incidentResponse.attributes.attachedUser.data.attributes.avatar?.data?.attributes?.url || null,
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
      createdAt: incidentResponse.attributes.createdAt,
      content: incidentResponse.data.attributes.content,
      ...(incidentResponse.data.attributes?.attachedUser?.data && {
        id: incidentResponse.data.attributes.attachedUser.data.id,
        email: incidentResponse.data.attributes.attachedUser.data.attributes.email,
        firstName: incidentResponse.data.attributes.attachedUser.data.attributes.firstName,
        lastName: incidentResponse.data.attributes.attachedUser.data.attributes.lastName,
        avatar: incidentResponse.data.attributes.attachedUser.data.attributes.avatar?.data?.attributes?.url || null,
      }),
      ...(incidentResponse.data.attributes?.createdUser?.data && {
        id: incidentResponse.data.attributes.attachedUser.data.id,
        email: incidentResponse.data.attributes.attachedUser.data.attributes.email,
        firstName: incidentResponse.data.attributes.attachedUser.data.attributes.firstName,
        lastName: incidentResponse.data.attributes.attachedUser.data.attributes.lastName,
        avatar: incidentResponse.data.attributes.attachedUser.data.attributes.avatar?.data?.attributes?.url || null,
      }),
    };
    return incident as Incident;
  }

  async create(incident: Incident) {
    const query = qs.stringify({
      populate: ["attachedUser", "attachedUser.avatar", "createdUser", "createdUser.avatar"],
    });
    const { data: incidentResponse } = await this.client.post(`/incidents?${query}`, {
      data: {
        attributes: {
          title: incident.title,
          status: incident.status,
          date: incident.date,
          content: incident.content,
        },
      },
    });
    const createdIncident = {
      id: incidentResponse.data.id,
      title: incidentResponse.data.attributes.title,
      status: incidentResponse.data.attributes.status,
      date: incidentResponse.data.attributes.date,
      createdAt: incidentResponse.attributes.createdAt,
      content: incidentResponse.data.attributes.content,
      ...(incidentResponse.data.attributes?.attachedUser?.data && {
        id: incidentResponse.data.attributes.attachedUser.data.id,
        email: incidentResponse.data.attributes.attachedUser.data.attributes.email,
        firstName: incidentResponse.data.attributes.attachedUser.data.attributes.firstName,
        lastName: incidentResponse.data.attributes.attachedUser.data.attributes.lastName,
        avatar: incidentResponse.data.attributes.attachedUser.data.attributes.avatar?.data?.attributes?.url || null,
      }),
      ...(incidentResponse.data.attributes?.createdUser?.data && {
        id: incidentResponse.data.attributes.attachedUser.data.id,
        email: incidentResponse.data.attributes.attachedUser.data.attributes.email,
        firstName: incidentResponse.data.attributes.attachedUser.data.attributes.firstName,
        lastName: incidentResponse.data.attributes.attachedUser.data.attributes.lastName,
        avatar: incidentResponse.data.attributes.attachedUser.data.attributes.avatar?.data?.attributes?.url || null,
      }),
    };
    return createdIncident as Incident;
  }
}
