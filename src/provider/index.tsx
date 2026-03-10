"use client";

import { ReactNode } from "react";
import QueryProvider from "@/provider/QueryProvider";
import { SidebarProvider } from "@/contexts/SidebarContext";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </QueryProvider>
  );
}
