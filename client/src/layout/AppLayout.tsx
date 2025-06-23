import { Outlet } from "@tanstack/react-router";

const AppLayout = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Car tracker start app</h1>
      <Outlet />
    </>
  );
};

export default AppLayout;
