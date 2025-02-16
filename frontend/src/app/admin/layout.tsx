import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return { title: "Admin Dashboard" };
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
