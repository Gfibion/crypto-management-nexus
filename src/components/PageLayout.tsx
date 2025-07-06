
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

const PageLayout = ({ children, className = "" }: PageLayoutProps) => {
  return (
    <div className={`page-container min-h-screen pt-16 ${className}`}>
      {children}
    </div>
  );
};

export default PageLayout;
