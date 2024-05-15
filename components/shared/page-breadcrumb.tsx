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

const pages = ["dashboard", "team-tournament", "upload-screenshots", "edit"];

export function PageBreadcrumb() {
  const pathname = usePathname();
  const breadcrumbItems = pathname
    .split("/")
    .filter((item) => !!item)
    .filter((item) => pages.includes(item));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={v4()} className="flex items-center">
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={`/${item}`}>
                {toCapitalCase(item)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
