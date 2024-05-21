import Link from "next/link";
import { CardDescription, CardHeader, CardTitle } from "./card";

interface CardRightIconHeaderProps {
  title: string;
  titleHref?: string;
  description?: string;
  renderIcon?: () => React.ReactElement;
}

export function CardRightIconHeader({
  title,
  titleHref,
  description,
  renderIcon,
}: CardRightIconHeaderProps) {
  return (
    <CardHeader className="flex flex-row justify-between items-center">
      <div className="flex flex-col space-y-1.5 pr-4">
        {titleHref ? (
          <Link href={titleHref}>
            <CardTitle>{title}</CardTitle>
          </Link>
        ) : (
          <CardTitle>{title}</CardTitle>
        )}
        {description && <CardDescription>{description}</CardDescription>}
      </div>
      {renderIcon && <>{renderIcon()}</>}
    </CardHeader>
  );
}
