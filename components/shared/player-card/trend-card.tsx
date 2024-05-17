import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TrendCardProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  value: number;
};

export function TrendCard({ name, value, ...restOfProps }: TrendCardProps) {
  return (
    <Card {...restOfProps}>
      <CardHeader className="flex flex-col justify-between">
        <CardDescription>{name}</CardDescription>
        <CardTitle>{Math.round(value * 100) / 100}</CardTitle>
      </CardHeader>
    </Card>
  );
}
