"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, Search } from "lucide-react";
import { Button } from "@neamat/ui/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@neamat/ui/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@neamat/ui/components/ui/sheet";
import { Separator } from "@neamat/ui/components/ui/separator";
import { GoldPillButton } from "@neamat/ui/components/brand/gold-pill-button";
import { LanguageToggle } from "@neamat/ui/components/brand/language-toggle";
import { Logo } from "@neamat/ui/components/brand/logo";
import { NavItem } from "@neamat/ui/components/brand/nav-item";
import type { CtaLink, LanguageOption, NavLink } from "@neamat/ui/lib/types";
import { cn } from "@neamat/ui/lib/utils";

export type HeaderProps = {
  homeHref: string;
  logoLabel: string;
  nav: NavLink[];
  /** href of the current page/section — gets the gold underline. */
  activeHref?: string;
  languages: LanguageOption[];
  languageLabel: string;
  cta: CtaLink;
  searchLabel: string;
  onSearch?: () => void;
  menuLabel: string;
  menuDescription: string;
  navLabel: string;
  dir?: "ltr" | "rtl";
};

/** A dropdown section is current when its own href or any child's href is the active page. */
function isSectionActive(item: NavLink, activeHref?: string) {
  return (
    item.href === activeHref || Boolean(item.children?.some((child) => child.href === activeHref))
  );
}

/**
 * Site header — deep navy bar with logo, primary nav (shadcn NavigationMenu, "Our Businesses"
 * dropdown), EN/AR toggle, search and gold "Get in Touch" pill. Below `lg` the nav collapses into
 * a shadcn Sheet opened from a hamburger button.
 */
export function Header({
  homeHref,
  logoLabel,
  nav,
  activeHref,
  languages,
  languageLabel,
  cta,
  searchLabel,
  onSearch,
  menuLabel,
  menuDescription,
  navLabel,
  dir = "ltr",
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-navy-deep/85 shadow-glow-navy sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl backdrop-saturate-150">
      <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Logo href={homeHref} label={logoLabel} tone="light" />

        {/* Desktop navigation */}
        <NavigationMenu viewport={false} dir={dir} aria-label={navLabel} className="hidden lg:flex">
          <NavigationMenuList className="gap-0.5 xl:gap-1">
            {nav.map((item) =>
              item.children?.length ? (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger
                    className={cn(
                      "text-on-navy h-11 bg-transparent px-2.5 text-[13px] font-medium hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white data-open:bg-transparent data-open:text-white data-open:hover:bg-transparent data-open:focus:bg-transparent xl:px-3.5",
                      // Same gold underline as NavItem when the section (or one of its children) is current.
                      isSectionActive(item, activeHref) &&
                        "after:bg-gold relative text-white after:absolute after:inset-x-2.5 after:bottom-1.5 after:h-0.5 after:rounded-full xl:after:inset-x-3.5",
                    )}
                  >
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-72">
                    <ul className="grid gap-0.5 p-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavigationMenuLink asChild>
                            <Link href={child.href} className="flex-col items-start gap-0.5">
                              <span className="text-navy-deep font-semibold">{child.label}</span>
                              {child.description && (
                                <span className="text-muted-text text-xs">{child.description}</span>
                              )}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.href}>
                  <NavItem href={item.href} label={item.label} active={item.href === activeHref} />
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageToggle options={languages} label={languageLabel} className="hidden sm:flex" />
          <Separator orientation="vertical" className="mx-1 hidden h-4 bg-white/25 sm:block" />
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label={searchLabel}
            onClick={onSearch}
            className="text-on-navy size-11 hover:bg-white/10 hover:text-white"
          >
            <Search className="size-[18px]" />
          </Button>
          <GoldPillButton href={cta.href} size="sm" className="ms-1 hidden md:inline-flex">
            {cta.label}
          </GoldPillButton>

          {/* Mobile navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label={menuLabel}
                className="size-11 text-white hover:bg-white/10 hover:text-white lg:hidden"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={dir === "rtl" ? "left" : "right"}
              className="bg-navy-deep w-[88vw] max-w-sm gap-0 border-0 p-0 text-white"
            >
              <SheetHeader className="border-b border-white/10 p-5">
                <SheetTitle className="text-start">
                  <Logo href={homeHref} label={logoLabel} tone="light" />
                </SheetTitle>
                <SheetDescription className="sr-only">{menuDescription}</SheetDescription>
              </SheetHeader>
              <nav aria-label={navLabel} className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="grid gap-0.5">
                  {nav.map((item) => (
                    <li key={item.href}>
                      {item.children?.length ? (
                        <details className="group/details">
                          <summary
                            className={cn(
                              "text-on-navy flex min-h-12 cursor-pointer list-none items-center justify-between rounded-md border-s-2 border-transparent px-3 text-[15px] font-medium hover:bg-white/5 hover:text-white [&::-webkit-details-marker]:hidden",
                              isSectionActive(item, activeHref) && "border-gold text-white",
                            )}
                          >
                            {item.label}
                            <ChevronDown className="size-4 transition-transform group-open/details:rotate-180" />
                          </summary>
                          <ul className="ms-3 mb-2 grid gap-0.5 border-s border-white/15 ps-3">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpen(false)}
                                  className="text-on-navy flex min-h-11 items-center rounded-md px-3 text-sm hover:bg-white/5 hover:text-white"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </details>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={item.href === activeHref ? "page" : undefined}
                          className={cn(
                            "text-on-navy flex min-h-12 items-center rounded-md border-s-2 border-transparent px-3 text-[15px] font-medium hover:bg-white/5 hover:text-white",
                            item.href === activeHref && "border-gold text-white",
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="grid gap-4 border-t border-white/10 p-5">
                <LanguageToggle options={languages} label={languageLabel} />
                <GoldPillButton href={cta.href} className="w-full" onClick={() => setOpen(false)}>
                  {cta.label}
                </GoldPillButton>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
