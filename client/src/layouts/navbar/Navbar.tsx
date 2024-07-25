import { useNavigate } from "react-router-dom";
import { SearchIcon, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "./LogoutButton";
import useAuthStore from "@/app/authStore";
import Logo from "@/components/Logo";
import useThemeStore from "@/app/themeStore";

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, setTheme } = useThemeStore();
  const { isLoggedIn, user } = useAuthStore();
  return (
    <header className="sticky top-0 flex h-16 bg-background items-center justify-between border-b border-border px-3.5 sm:px-6 max-md:bg-primary-foreground">
      <Logo />
      <div className="flex items-center gap-4">
        <Button 
        variant={"ghost"}
          size="icon"
          className="text-secondary-foreground"
        >
          <SearchIcon className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant={"ghost"} className="rounded-full overflow-hidden border-[1.5px] border-border">
              {isLoggedIn ? (
                <span className="size-full flex bg-transparent justify-center items-center text-primary text-[20px] font-roboto">
                  {user?.name?.split("")[0]}
                </span>
              ) : (
                <User />
              )}
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/me")}>
              Profile
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>
                  {theme.charAt(0).toUpperCase() +
                    theme.slice(1, theme.length).toLowerCase()}{" "}
                  mode
                </span>
              </DropdownMenuSubTrigger>

              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator />
            {isLoggedIn && <LogoutButton />}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
