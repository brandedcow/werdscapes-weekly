"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { toCapitalCase } from "@/lib/utils";
import { v4 } from "uuid";

const pages = [
  "dashboard",
  "team-tournament",
  "upload-scores",
  "edit",
  "player",
  "team",
];
const pagesWithId = ["team-tournament", "edit", "player", "team"];

export function PageBreadcrumb() {
  const pathname = usePathname();
  // Pathname: /dashboard/team-tournament/edit/clw7drcz700025mhz5ydcksy7
  // => /dashboard
  // => /dashboard/team-tournament/${id}
  // => /dashboard/team-tournament/edit/${id}

  const pathnameTokens = pathname.split("/").filter((item) => !!item) ?? [];
  const breadCrumbPages = pathnameTokens.filter((token) =>
    pages.includes(token)
  );
  const id =
    breadCrumbPages.length < pathnameTokens.length
      ? pathnameTokens[pathnameTokens.length - 1]
      : null;
  const breadcrumbPaths = breadCrumbPages.map((page, index) => {
    let path = "/" + pathnameTokens.slice(0, index + 1).join("/");
    if (pagesWithId.includes(page) && !!id) {
      path += `/${id}`;
    }
    return { path, page };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbPaths.map(({ path, page }, index) => (
          <div key={v4()} className="flex items-center">
            <BreadcrumbItem>
              <BreadcrumbLink href={path}>
                {toCapitalCase(page, { from: "kebab-case" })}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== breadcrumbPaths.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
