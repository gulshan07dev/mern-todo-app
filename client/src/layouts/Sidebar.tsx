import { NavLink } from "react-router-dom";
import { CheckIcon, ClockIcon, ListIcon, UserIcon } from "lucide-react";

export default function Sidebar() {
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
      slug: "/user/me",
      icon: <UserIcon className="h-5 w-5" />,
    },
  ];
  return (
    <aside className="sticky top-16 w-screen h-[calc(100vh-64px)] border-r bg-background sm:w-60">
      <nav className="flex flex-1 flex-col items-start gap-2 overflow-auto px-3 py-4 sm:px-6">
        {navLinks.map(({ label, slug, icon }) => (
          <NavLink
            to={slug}
            key={slug}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {icon}
            <span className="text-sm font-medium sm:block">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
