"use client";

import { Button } from "@nextui-org/button";
import { useState } from "react";

import { SunFilledIcon } from "../icons";

import SidebarOptions from "./Sidevar/SidebarOptions";
import { ADMIN_ROUTES, USER_ROUTES } from "./Sidevar/contstants";

import { useUser } from "@/src/context/user.provider";

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const { user } = useUser();

  return (
    <>
      <div className="h-screen lg:w-[15%] md:w-[25%] w-[30%] z-[99] md:visible invisible left-0 md:relative absolute transition-all  overflow-y-auto bg-gradient-to-l from-indigo-900 to-indigo-500 dark:from-slate-900 dark:to-slate-800">
        <Button
          isIconOnly
          aria-label="Toggle sidebar"
          className={`absolute top-4 ${toggleSidebar === true ? "left-4" : "right-4"} md:hidden`}
          size="sm"
          onClick={() => setToggleSidebar(!toggleSidebar)}
        >
          <SunFilledIcon />
        </Button>
        <nav className="mt-16 space-y-2 rounded-xl dark:bg-default-100 p-2">
          <SidebarOptions
            routes={
              user?.role === "admin"
                ? ADMIN_ROUTES
                : user?.role === "user"
                  ? USER_ROUTES
                  : []
            }
          />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
