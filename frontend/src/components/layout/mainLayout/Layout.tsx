import { Navbar } from "@/components/common";
import React, { forwardRef, ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
  subHeader?: ReactNode;
}

const Layout = forwardRef<HTMLDivElement, ILayoutProps>(
  ({ children, subHeader }, ref) => {
    return (
      <>
        <Navbar />
        <main>
          <div>
            {subHeader}
            <div>
              <div ref={ref}>{children}</div>
            </div>
          </div>
        </main>
      </>
    );
  },
);

export default Layout;
