import { Outlet } from "@tanstack/react-router";

import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const AppLayout = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Car tracker start app</h1>
      <Button variant={"default"}>Button</Button>
      <ModeToggle />
      <Outlet />
    </>
  );
};

export default AppLayout;
