import { ReactNode } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Link from "../Link/Link";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className="container px-8 py-16 lg:py-0 md:mx-auto flex justify-between items-center min-h-screen gap-16 flex-col lg:flex-row text-black dark:text-white"
      role="main"
    >
      <div className="flex flex-col gap-8 w-full lg:w-1/3">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold">Processing Storyboard</h1>

              <p className="text-xs opacity-70">
                Visualize API workflows as an animated, interactive storyboard.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs">
                Created by{" "}
                <Link
                  href="https://reinaldo.pt"
                  target="_blank"
                  ariaLabel="Visit Reinaldo Simoes' website (opens in new tab)"
                >
                  Reinaldo Simoes
                </Link>
                .
              </p>

              <p className="text-xs">
                Source code available on{" "}
                <Link
                  href="https://github.com/reinaldosimoes/processing-storyboard"
                  target="_blank"
                >
                  GitHub
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="flex">
          <ThemeToggle />
        </div>
      </div>

      <div className="w-full lg:w-2/3" role="complementary">
        {children}
      </div>
    </div>
  );
};

export default Layout;
