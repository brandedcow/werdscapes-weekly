import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TrendCardProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  value: number | string | null;
};

export function TrendCard({ name, value, ...restOfProps }: TrendCardProps) {
  if (!value) return null;

  return (
    <Card {...restOfProps}>
      <CardHeader className="flex flex-col justify-between">
        <CardDescription>{name}</CardDescription>
        <CardTitle>
          {typeof value === "string" ? value : Math.round(value * 100) / 100}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
