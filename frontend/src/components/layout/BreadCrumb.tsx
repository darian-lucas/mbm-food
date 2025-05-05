"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";

type TBreadCrumbProps = {
  homeElement: ReactNode;
  container?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

const Breadcrumb = ({
  homeElement,
  listClasses,
  activeClasses,
  capitalizeLinks,
  container,
}: TBreadCrumbProps) => {
  const pathname = usePathname();
  const [names, setNames] = useState<Record<string, string>>({});

  const pathNames = pathname.split("/").filter((path) => path);

  useEffect(() => {
    const fetchNames = async () => {
      const newNames: Record<string, string> = {};
      await Promise.all(
        pathNames.map(async (slug) => {
          try {
            const res = await axios.get(`http://localhost:3001/api/breadcrum?slug=${slug}`);
            newNames[slug] = res.data.name || slug;
          } catch {
            newNames[slug] = slug;
          }
        })
      );
      setNames(newNames);
    };

    if (pathNames.length > 0) fetchNames();
  }, [pathname]);

  if (pathname === "/") return null;

  return (
    <section className="w-full py-3 bg-[#ddd] md:mt-0 mt-12 mb-6 text-sm">
      <nav className={`flex items-center max-w-[1300px] px-3 mx-auto ${container || ""}`}>
        <div className="flex items-center">
          <Link href="/" className="hover:text-breadcrumb">
            {homeElement}
          </Link>
        </div>

        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`;
          const isActive = pathname === href;
          const itemClasses = isActive ? activeClasses : listClasses;

          let label = names[link] || link;
          if (capitalizeLinks) {
            label = label[0].toUpperCase() + label.slice(1);
          }

          return (
            <div key={index} className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              <Link href={href} className={`${itemClasses || ""}`}>
                {label}
              </Link>
            </div>
          );
        })}
      </nav>
    </section>
  );
};

export default Breadcrumb;
