"use client";

import { ReactNode } from "react";
import QueryProvider from "@/provider/QueryProvider";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <SidebarProvider>
        {children}
        <Toaster position="top-right" />
      </SidebarProvider>
    </QueryProvider>
  );
}
