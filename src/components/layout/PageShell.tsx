import { SiteHeader } from "./SiteHeader";

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
    </>
  );
}
