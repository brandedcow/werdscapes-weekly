import { toCapitalCase } from "@/lib/utils";
import { CardDescription } from "../ui/card";
import { RandomAnimalIcon } from "./random-animal-icon";

interface NoDataFoundProps {
  type: string;
  description: string;
  buttonComponent: (props?: any) => React.ReactNode;
}
export function NoDataFound({
  type,
  description,
  buttonComponent,
}: NoDataFoundProps) {
  return (
    <div className="flex flex-col items-center gap-y-3">
      <RandomAnimalIcon />
      <h2 className="font-semibold">No {toCapitalCase(type)} Found</h2>
      <CardDescription className="text-center">{description}</CardDescription>
      {buttonComponent && buttonComponent()}
    </div>
  );
}
