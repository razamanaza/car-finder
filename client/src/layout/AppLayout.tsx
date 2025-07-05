import { Button } from "@/components/ui/button";
import { Outlet } from "@tanstack/react-router";

const AppLayout = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Car tracker start app</h1>
      <Button variant={"default"}>Button</Button>
      <Outlet />
    </>
  );
};

export default AppLayout;
