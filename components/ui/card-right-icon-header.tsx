import { CardDescription, CardHeader, CardTitle } from "./card";

interface CardRightIconHeaderProps {
  title: string;
  description: string;
  renderIcon?: () => React.ReactElement;
}

export function CardRightIconHeader({
  title,
  description,
  renderIcon,
}: CardRightIconHeaderProps) {
  return (
    <CardHeader className="flex flex-row justify-between items-center">
      <div className="flex flex-col space-y-1.5">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      {renderIcon && <>{renderIcon()}</>}
    </CardHeader>
  );
}
