import { AxiosInstance } from "axios";
import qs from "qs";
import { BaseService, IPagination } from "./base";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

interface AuthenticatedUser extends User {
  token: string;
}

type IAuth = {
  email: string;
  password: string;
};

interface IList extends IPagination {}

export class UserService extends BaseService {
  constructor(client: AxiosInstance) {
    super(client);
  }

  async me() {
    const userQuery = qs.stringify(
      {
        populate: ["avatar"],
      },
      {
        encodeValuesOnly: true,
      }
    );
    const { data: userResponse } = await this.client.get(`/users/me?${userQuery}`);
    const user = {
      id: userResponse.id,
      email: userResponse.email,
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
      avatar: userResponse.avatar?.url || null,
    };
    return user;
  }

  async list({ start = 0, limit = 25 }: IList) {
    const query = qs.stringify({
      populate: ["avatar"],
      pagination: {
        start,
        limit,
      },
    });

    const { data: usersResponse } = await this.client.get(`/users?${query}`);
    const users = usersResponse.map((userResponse: any) => ({
      id: userResponse.id,
      email: userResponse.email,
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
      avatar: userResponse.avatar?.url || null,
    }));
    return users as User[];
  }

  async auth({ email, password }: IAuth) {
    const { data } = await this.client.post("/auth/local", {
      identifier: email,
      password,
    });
    const user = {
      id: data.user.id,
      email: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      token: data.jwt,
    };
    return user as AuthenticatedUser;
  }
}
