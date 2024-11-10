"use client";

import Container from "@/src/components/UI/Container";
import UserSidebar from "@/src/components/UI/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <section className="flex justify-center h-[calc(100vh-64px)] overflow-hidden scr">
        <UserSidebar />
        <div className="lg:w-[85%] md:w-[75%] w-full bg-gradient-to-l from-blue-200 to-pink-100 dark:from-slate-900 dark:to-slate-800 overflow-auto">
          <Container>{children}</Container>
        </div>
      </section>
    </>
  );
};

export default layout;
