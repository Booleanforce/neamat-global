import type { ReactNode } from "react";
import { cn } from "@neamat/ui/lib/utils";

type ServiceCategoryProps = {
  icon: ReactNode;
  title: string;
  description: string;
  /** Token text-colour utility for the icon (e.g. "text-unit-neopure" for WaterCare's drop). */
  iconClassName?: string;
  className?: string;
};

/** NEAMAT CARE service chip — icon, category name, one-line description. */
export function ServiceCategory({
  icon,
  title,
  description,
  iconClassName = "text-navy",
  className,
}: ServiceCategoryProps) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <span aria-hidden="true" className={cn("mt-0.5 shrink-0 [&_svg]:size-8", iconClassName)}>
        {icon}
      </span>
      <div className="min-w-0">
        <h3 className="text-sm font-bold text-navy-deep">{title}</h3>
        <p className="mt-1 text-xs leading-snug text-muted-text">{description}</p>
      </div>
    </div>
  );
}
