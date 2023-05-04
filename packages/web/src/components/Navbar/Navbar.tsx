import { Button } from "@chakra-ui/react";
import { faHome, faPersonFallingBurst } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteCookie } from "cookies-next";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = ({ user }) => {
  const router = useRouter();
  const logout = () => {
    deleteCookie("jwt");
    router.push("/auth");
  };
  return (
    <div className="relative bg-white text-black w-[240px] flex-shrink-0 h-full">
      <div className="flex flex-col items-center h-full">
        <div className="p-4">
          <Image alt="" src="/logo.svg" width={150} height={100} />
        </div>
        <ul className="p-4 flex-grow space-y-2">
          <ListElement>
            <Link href="/" className="flex items-center">
              <FontAwesomeIcon icon={faHome} className="mr-4 text-lg" />
              <span className="text-sm">Home</span>
            </Link>
          </ListElement>
          <ListElement>
            <Link href="/incidents" className="flex items-center">
              <FontAwesomeIcon icon={faPersonFallingBurst} className="mr-4 text-lg" />
              <span className="text-sm">Incidents</span>
            </Link>
          </ListElement>
        </ul>
        <div className="flex items-center flex-col py-16">
          <div className="w-16 h-16 rounded-full mb-2 relative overflow-hidden">
            <Image alt="" src={user.avatar} fill className="object-cover" />
          </div>
          <p className="font-bold">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-400 mb-4">{user.email}</p>
          <Button size="sm" variant="ghost" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

const ListElement = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.li
      className="p-2 rounded"
      initial={{
        backgroundColor: "rgba(96, 165, 250, 0)",
      }}
      whileHover={{
        backgroundColor: "rgba(96, 165, 250, 0.2)",
      }}
    >
      {children}
    </motion.li>
  );
};
