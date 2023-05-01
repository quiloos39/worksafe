import { Announcement } from "@/components/Announcements/Announcements";
import { ElementContainer } from "@/components/ElementContainer/ElementContainer";
import { IncidentChart } from "@/components/IncidentChart/IncidentChart";
import { IncidentTable } from "@/components/IncidentTable/IncidentTable";
import { Layout } from "@/components/Layout/Layout";
import { SystemHelloMessage } from "@/components/SystemHelloMessage/SystemHelloMessage";
import { client } from "@/lib/client";
import { getCookie } from "cookies-next";
import { GetServerSideProps, NextPage } from "next";
import type { Announcement as IAnnouncement } from "worksafe-client/dist/services/announcement";
import { Incident } from "worksafe-client/dist/services/incident";
import { User } from "worksafe-client/dist/services/user";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const jwt = getCookie("jwt", { req, res }) as string;
  if (!jwt) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
    };
  }

  client.client.defaults.headers.common = {
    Authorization: `Bearer ${jwt}`,
  };

  // try {
  const user = await client.user.me();
  const announcements = await client.announcement.list({});
  const incidents = await client.incident.list({});

  return {
    props: {
      incidents,
      announcements,
      user,
    },
  };
  // } catch (e) {
  //   // console.warn(e.message);
  //   // deleteCookie("jwt", { req, res });
  //   // return {
  //   //   redirect: {
  //   //     permanent: false,
  //   //     destination: "/auth",
  //   //   },
  //   // };
  // }
};

type HomepageProps = {
  user: User;
  incidents: Incident[];
  announcements: IAnnouncement[];
};

const Homepage: NextPage<HomepageProps> = ({ incidents, user, announcements }) => {
  return (
    <Layout user={user}>
      <SystemHelloMessage user={user} />
      <Announcement announcements={announcements} />
      <div className="grid lg:grid-cols-2 gap-5">
        <ElementContainer>
          <h1 className="mb-4 text-2xl font-bold">Latest Incidents</h1>
          <IncidentTable incidents={incidents} />
        </ElementContainer>
        <IncidentChart incidents={incidents} />
      </div>
    </Layout>
  );
};

export default Homepage;
