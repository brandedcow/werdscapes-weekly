import { toCapitalCase } from "@/lib/utils";
import { CardContent, CardDescription, CardTitle } from "../ui/card";
import { RandomAnimalIcon } from "./random-animal-icon";
import { Button } from "../ui/button";
import Link from "next/link";

interface NoDataFoundProps {
  type: string;
  description: string;
  linkHref: string;
  buttonLabel: string;
}
export function NoDataFound({
  type,
  description,
  linkHref,
  buttonLabel,
}: NoDataFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center px-16 text-center">
      <RandomAnimalIcon />
      <h2 className="text-lg my-2">No {toCapitalCase(type)} Found</h2>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <Button className="mt-6" asChild>
          <Link href={linkHref}>{buttonLabel}</Link>
        </Button>
      </CardContent>
    </div>
  );
}
