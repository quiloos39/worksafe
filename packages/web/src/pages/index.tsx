import { Announcement } from "@/components/Announcements/Announcements";
import { ElementContainer } from "@/components/ElementContainer/ElementContainer";
import { IncidentChart } from "@/components/IncidentChart/IncidentChart";
import { IncidentsTable } from "@/components/IncidentsTable/IncidentsTable";
import { Layout } from "@/components/Layout/Layout";
import { SystemHelloMessage } from "@/components/SystemHelloMessage/SystemHelloMessage";
import { fetchAnnouncements, fetchIncidents, fetchUser } from "@/lib/client";
import { getCookie } from "cookies-next";
import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const jwt = getCookie("jwt", { req, res }) as string;
  console.log(jwt);
  if (!jwt) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
    };
  }

  // try {
  const user = await fetchUser(jwt);
  const announcements = await fetchAnnouncements(jwt);
  const incidents = await fetchIncidents(jwt);
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

const Homepage: NextPage = ({ incidents, user, announcements }) => {
  return (
    <Layout user={user}>
      <SystemHelloMessage user={user} />
      <Announcement announcements={announcements} />
      <div className="grid lg:grid-cols-2 gap-5">
        <ElementContainer>
          <h1 className="mb-4 text-2xl font-bold">Latest Incidents</h1>
          <IncidentsTable incidents={incidents} />
        </ElementContainer>
        <IncidentChart incidents={incidents} />
      </div>
    </Layout>
  );
};

export default Homepage;
