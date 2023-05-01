import { ElementContainer } from "@/components/ElementContainer/ElementContainer";
import { Layout } from "@/components/Layout/Layout";
import { fetchIncident, fetchUser } from "@/lib/client";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCookie } from "cookies-next";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const id = query.id as string;
  const jwt = getCookie("jwt", { req, res }) as string;
  if (!jwt) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
    };
  }

  const incident = await fetchIncident(id, jwt);
  const user = await fetchUser(jwt);

  return {
    props: {
      user,
      incident,
    },
  };
};

const IncidentPage: NextPage = ({ user, incident }) => {
  const router = useRouter();
  return (
    <Layout user={user}>
      <button className="mb-5 text-blue-700" onClick={() => router.back()}>
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-sm" />
        <span>Back</span>
      </button>
      <h1 className="text-2xl font-bold mb-4">{incident.title}</h1>
      <ElementContainer>
        <p className="mb-8 max-w-[1200px]">{incident.content}</p>
        <div className="flex items-center gap-2">
          <div className="overflow-hidden w-[30px] h-[30px] relative rounded-full">
            <Image alt="" src={user.avatar} fill className="object-cover" />
          </div>
          <p>
            {user.firstName} {user.lastName}
          </p>
        </div>
      </ElementContainer>
    </Layout>
  );
};

export default IncidentPage;
