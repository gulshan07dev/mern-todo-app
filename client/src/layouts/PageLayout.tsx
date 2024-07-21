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
    <section className={cn("w-full min-h-full py-5 px-3.5 sm:px-8", className)}>{children}</section>
  );
}
