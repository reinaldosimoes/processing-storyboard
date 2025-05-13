import { ReactNode } from "react";
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
      <div className="h-full w-full lg:w-1/4">
        <div className="h-full flex flex-col items-start">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-sm leading-relaxed">Processing Storyboard</h1>

              <p className="text-sm opacity-70 leading-relaxed">
                Visualize API workflows as an interactive storyboard carousel.
                Each API step is shown as an animated card, making complex
                processes clear for everyone.
              </p>
            </div>

            <div className="flex flex-col text-black/40 dark:text-white/40">
              <p className="text-xs leading-relaxed">
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

              <p className="text-xs leading-relaxed">
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
      </div>

      <div className="h-full w-full lg:w-3/4" role="complementary">
        {children}
      </div>
    </div>
  );
};

export default Layout;
