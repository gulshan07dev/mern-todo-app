import { NavLink, useNavigate } from "react-router-dom";
import { LucideTimer, SearchIcon, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "./LogoutButton";
import useAuthStore from "@/app/authStore";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuthStore();
  return (
    <header className="sticky top-0 flex h-16 bg-background items-center justify-between border-b px-4 sm:px-6">
      <NavLink to="/" className="flex items-center gap-2">
        <LucideTimer className="h-6 w-6" />
        <span className="text-lg font-semibold">Todo App</span>
      </NavLink>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <SearchIcon className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
              {isLoggedIn ? <span className="bg-secondary size-full flex justify-center items-center text-primary text-lg font-roboto">{user?.name?.split("")[0]}</span> : <User />}
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/me")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            {isLoggedIn && <LogoutButton />}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
