export const ElementContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="shadow bg-white rounded-lg p-8 mb-5 flex flex-col items-start overflow-auto">{children}</div>;
};
