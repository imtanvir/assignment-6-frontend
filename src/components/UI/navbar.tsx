"use client";
import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";

import NavbarDropdown from "./NavbarDropdown";

import { Logo } from "@/src/components/icons";
import { ThemeSwitch } from "@/src/components/UI/theme-switch";
import { siteConfig } from "@/src/config/site";
import { protectedRoutes } from "@/src/constant";
import { useUser } from "@/src/context/user.provider";
import { logout } from "@/src/services/AuthService";

export const Navbar = () => {
  const { user, setIsLoading: userLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <NextUINavbar
      className="z-[999] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-900 dark:via-slate-900 dark:to-slate-950"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo className="dark:fill-slate-300 fill-indigo-950 " />
            <p className="font-bold text-inherit">PawPedia</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch className="me-4" />
          {user?.email ? (
            <NavbarDropdown handleLogout={handleLogout} user={user} />
          ) : (
            <NextLink
              className="bg-gradient-to-r from-indigo-500 dark:from-indigo-700 via-purple-500 dark:to-pink-500 to-purple-400 font-medium p-2 rounded-lg text-white hover:scale-105 transition-all duration-200 ease-in-out"
              href="/login"
            >
              Login
            </NextLink>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
