import { cn } from "@/lib/utils";
import { LucideTimer } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-2 text-lg text-primary", className)}
    >
      <LucideTimer className="h-6 w-6" />
      <span className="font-poppins font-semibold">Todo App</span>
    </Link>
  );
}
