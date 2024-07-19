import { NavLink, useLocation } from "react-router-dom";
import { CheckIcon, ClockIcon, ListIcon, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const location = useLocation()
  const navLinks = [
    {
      label: "Todos",
      slug: "/todos",
      icon: <ListIcon className="h-5 w-5" />,
    },
    {
      label: "Completed",
      slug: "/todos/Completed",
      icon: <CheckIcon className="h-5 w-5" />,
    },
    {
      label: "Pending",
      slug: "/todos/pending",
      icon: <ClockIcon className="h-5 w-5" />,
    },
    {
      label: "Profile",
      slug: "/me",
      icon: <UserIcon className="h-5 w-5" />,
    },
  ];
  return (
    <aside className="fixed max-md:bottom-0 max-md:left-0 max-md:right-0 md:sticky md:top-16 h-14 md:border-r max-md:border-t border-border md:h-[calc(100vh-64px)] bg-background md:w-60">
      <nav className="flex flex-1 md:flex-col items-center max-md:justify-between md:items-start gap-2 overflow-auto px-4 py-2 md:px-3 md:py-4 sm:px-6">
        {navLinks.map(({ label, slug, icon }) => (
          <NavLink
            to={slug}
            key={slug}
            className={cn(
              "flex md:w-full items-center gap-1 md:gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors font-lato",
              slug === location.pathname
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent hover:bg-opacity-70 hover:text-accent-foreground"
            )}
          >
            {icon}
            <span
              className={cn(
                "md:text-sm transition-all",
                slug === location.pathname
                  ? "text-sm font-semibold"
                  : "text-xs font-medium"
              )}
            >
              {label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
