import { Spinner } from "@nextui-org/react";
import Link from "next/link";

type TRoutes = {
  href: string;
  label: string;
};
const SidebarOptions = ({ routes }: { routes: TRoutes[] }) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        {routes.length === 0 && (
          <div className="flex items-center justify-center gap-2">
            <span>Loading...</span>
            <Spinner size="sm" />
          </div>
        )}
        {routes.map((route) => (
          <Link
            key={route.href}
            className=" whitespace-nowrap px-3 py-2 text-sm font-medium text-slate-900 hover:text-slate-200  rounded dark:text-slate-800 hover:bg-indigo-500 bg-indigo-200 dark:hover:bg-indigo-700 dark:hover:text-white"
            href={route.href}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default SidebarOptions;
