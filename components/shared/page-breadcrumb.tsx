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

export function PageBreadcrumb() {
  const pathname = usePathname();
  const breadcrumbItems = pathname.split("/").filter((item) => !!item);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={v4()}>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={`/${item}`}>
                {toCapitalCase(item)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== breadcrumbItems.length - 1 && (
              <BreadcrumbItem key={index}>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
