import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

interface LayoutProps extends PropsWithChildren {
  className?: string;
}

export const Layout: FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div
        className={clsx(
          "mx-auto flex w-full max-w-[1280px] grow flex-col px-10",
          className,
        )}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};
