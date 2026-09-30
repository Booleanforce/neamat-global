import Link from "next/link";
import { NavigationMenuLink } from "@neamat/ui/components/ui/navigation-menu";
import { cn } from "@neamat/ui/lib/utils";

type NavItemProps = {
  href: string;
  label: string;
  active?: boolean;
  className?: string;
};

/**
 * Header nav link (shadcn `NavigationMenuLink`). The active item gets the design's gold underline.
 */
export function NavItem({ href, label, active = false, className }: NavItemProps) {
  return (
    <NavigationMenuLink
      asChild
      active={active}
      className={cn(
        "relative inline-flex min-h-11 items-center rounded-md bg-transparent px-2.5 text-[13px] font-medium text-on-navy transition-colors hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white xl:px-3.5",
        "after:absolute after:inset-x-2.5 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-gold after:opacity-0 after:transition-opacity xl:after:inset-x-3.5",
        "data-active:bg-transparent data-active:text-white data-active:after:opacity-100 data-active:hover:bg-transparent data-active:focus:bg-transparent",
        className,
      )}
    >
      <Link href={href} aria-current={active ? "page" : undefined}>
        {label}
      </Link>
    </NavigationMenuLink>
  );
}
