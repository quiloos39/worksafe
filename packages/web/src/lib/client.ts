import axios from "axios";
import qs from "qs";

export const client = axios.create({
  baseURL: "http://localhost:1337/api",
});

export const fetchUser = async (jwt: string) => {
  const userQuery = qs.stringify(
    {
      populate: ["avatar"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data: userResponse } = await client.get(`/users/me?${userQuery}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const user = {
    firstName: userResponse.firstName,
    lastName: userResponse.lastName,
    email: userResponse.email,
    avatar: userResponse.avatar.url,
  };

  return user;
};

export const fetchAnnouncements = async (jwt: string) => {
  const announcementQuery = qs.stringify(
    {
      pagination: {
        start: 0,
        limit: 3,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { data: announcementResponse } = await client.get(`/announcements?${announcementQuery}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const announcements = announcementResponse.data.map((announcement) => ({
    id: announcement.id,
    title: announcement.attributes.title,
    shortDescription: announcement.attributes.shortDescription,
  }));

  return announcements;
};

export const fetchIncidents = async (jwt: string) => {
  const incidentsQuery = qs.stringify(
    {
      populate: ["user"],
      pagination: {
        start: 0,
        limit: 10,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { data: incidentsResponse } = await client.get(`/incidents?${incidentsQuery}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const incidents = incidentsResponse.data.map((incident) => {
    return {
      id: incident.id,
      title: incident.attributes.title,
      status: incident.attributes.status,
      createdAt: incident.attributes.createdAt,
      ...(incident.attributes.user.data && { user: incident.attributes.user.data.attributes }),
    };
  });

  return incidents;
};

export const fetchIncident = async (id: string, jwt: string) => {
  const incidentsQuery = qs.stringify(
    {
      populate: ["user"],
      pagination: {
        start: 0,
        limit: 10,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { data: incidentsResponse } = await client.get(`/incidents/${id}?${incidentsQuery}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  console.log(incidentsResponse);

  const incident = {
    id: incidentsResponse.data.id,
    title: incidentsResponse.data.attributes.title,
    status: incidentsResponse.data.attributes.status,
    createdAt: incidentsResponse.data.attributes.createdAt,
    content: incidentsResponse.data.attributes.content,
    ...(incidentsResponse.data.attributes.user && { user: incidentsResponse.data.attributes.user.data.attributes }),
  };

  return incident;
};
