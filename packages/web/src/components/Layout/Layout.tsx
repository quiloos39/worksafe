import { Navbar } from "../Navbar/Navbar";
export const Layout = ({ user, children }: { user: any; children?: React.ReactNode }) => {
  return (
    <>
      <div className="h-screen flex bg-gray-100">
        <Navbar user={user} />
        <div className="flex-grow p-10 overflow-y-auto">{children}</div>
      </div>
    </>
  );
};
