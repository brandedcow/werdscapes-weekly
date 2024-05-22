import { toCapitalCase } from "@/lib/utils";
import { CardContent, CardDescription, CardTitle } from "../ui/card";
import { RandomAnimalIcon } from "./random-animal-icon";
import { Button } from "../ui/button";
import Link from "next/link";

interface NoDataFoundProps {
  type: string;
  description: string;
  linkHref?: string;
  buttonLabel?: string;
}
export function NoDataFound({
  type,
  description,
  linkHref = "/",
  buttonLabel,
}: NoDataFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <RandomAnimalIcon />
      <CardTitle className="my-4">No {toCapitalCase(type)} Found</CardTitle>
      <CardContent className="w-[27rem]">
        <CardDescription>{description}</CardDescription>
        {!linkHref ||
          (buttonLabel && (
            <Button className="mt-6" asChild>
              <Link href={linkHref}>{buttonLabel}</Link>
            </Button>
          ))}
      </CardContent>
    </div>
  );
}
