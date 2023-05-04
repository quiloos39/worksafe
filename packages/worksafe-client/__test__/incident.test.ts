import { AxiosInstance } from "axios";
import { WorkSafe } from "../src";

const INCIDENTS = [
  {
    id: "1",
    attributes: {
      title: "Incident 1",
      status: "open",
      date: "2021-01-01",
      createdAt: "2021-01-01",
      attachedUser: {
        data: null,
      },
      createdUser: {
        data: {
          id: "1",
          attributes: {
            firstName: "John",
            lastName: "Doe",
            email: "",
            avatar: "",
          },
        },
      },
    },
  },
  {
    id: "2",
    attributes: {
      title: "Incident 2",
      status: "open",
      date: "2021-01-01",
      createdAt: "2021-01-01",
      attachedUser: {
        data: null,
      },
      createdUser: {
        data: {
          id: "1",
          attributes: {
            firstName: "John",
            lastName: "Doe",
            email: "",
            avatar: "",
          },
        },
      },
    },
  },
];

describe("Incident Service Test", () => {
  let workSafeClient: WorkSafe;

  beforeAll(() => {
    const client = {
      get: jest.fn((pathStr: string) => {
        const [path, query] = pathStr.split("?");
        if (path.match(/\/incidents$/)) {
          return {
            data: {
              data: INCIDENTS,
            },
          };
        } else if (path.match(/\/incidents\/\d+/)) {
          const id = path.match(/\/incidents\/(\d+)/)[1];
          return {
            data: {
              data: INCIDENTS[id],
            },
          };
        }
      }),
      post: jest.fn((pathStr: string, data: any) => {
        const [path, query] = pathStr.split("?");
        if (path.match(/\/incidents$/)) {
          INCIDENTS.push({
            id: "3",
            attributes: {
              title: data.title,
              status: "open",
              date: data.date,
              createdAt: "2021-01-01",
              attachedUser: {
                data: null,
              },
              createdUser: {
                data: {
                  id: "1",
                  attributes: {
                    firstName: "John",
                    lastName: "Doe",
                    email: "",
                    avatar: "",
                  },
                },
              },
            },
          });
          return {
            data: {
              data: INCIDENTS[2],
            },
          };
        }
      }),
    } as any as AxiosInstance;

    workSafeClient = new WorkSafe({
      baseURL: "http://localhost:1337/api",
      client,
    });
  });

  it("List incident", async () => {
    const incidents = await workSafeClient.incident.list({});
    expect(incidents).toHaveLength(2);
  });

  it("Retrieve incident", async () => {
    const incident = await workSafeClient.incident.retrieve("1");
    expect(incident).toHaveProperty("id", "1");
  });

  it("Create incident", async () => {
    const incident = await workSafeClient.incident.create({
      title: "Incident 3",
      date: "2021-01-01",
      content: "",
    });
    expect(incident).toHaveProperty("id", "3");
  });
});
