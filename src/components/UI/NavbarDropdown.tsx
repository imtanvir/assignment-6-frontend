"use client";

import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

import { NavDropdown_ADMIN, NavDropdown_USER } from "./Sidevar/contstants";

import { IUser } from "@/src/types";
type TRoutes = {
  href: string;
  label: string;
};
const NavbarDropdown = ({
  user,
  handleLogout,
}: {
  user: IUser;
  handleLogout: () => void;
}) => {
  const router = useRouter();
  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };
  const getName = (name: string) => {
    const match = name.match(/^(\w)\w*\s*(\w)?/i);

    return match ? (match[1] + (match[2] || "")).toUpperCase() : "";
  };

  const userName = getName(user?.name);

  console.log({ user });

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            className="cursor-pointer"
            name={userName}
            src={user?.image[0]?.url ? user?.image[0]?.url : ""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" className="box-content p-4">
          {user?.role === "user" ? (
            <Fragment>
              {NavDropdown_USER.map((item: TRoutes) => (
                <DropdownItem
                  key={item.label}
                  className="dark:bg-default-100 bg-default-200 my-1"
                  onClick={() => handleNavigation(item?.href)}
                >
                  {item?.label}
                </DropdownItem>
              ))}
            </Fragment>
          ) : (
            <Fragment>
              {NavDropdown_ADMIN.map((item: TRoutes) => (
                <DropdownItem
                  key={item.label}
                  className="dark:bg-default-100 bg-default-200 my-1"
                  onClick={() => handleNavigation(item?.href)}
                >
                  {item?.label}
                </DropdownItem>
              ))}
            </Fragment>
          )}
          <DropdownItem
            key="edit"
            className=" bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0 my-1"
            variant="faded"
            onClick={() => handleLogout()}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default NavbarDropdown;
