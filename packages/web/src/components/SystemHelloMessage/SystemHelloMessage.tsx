export const SystemHelloMessage = ({ user }) => {
  return (
    <div className="mb-10">
      <p className="text-2xl font-bold">Hello {user.firstName}</p>
      <p>Welcome work safety management system</p>
    </div>
  );
};
