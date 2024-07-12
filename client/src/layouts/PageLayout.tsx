import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function PageLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("w-full min-h-full py-5 px-2.5 sm:px-4", className)}>{children}</section>
  );
}
