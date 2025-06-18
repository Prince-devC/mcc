"use client";

import { AdminProvider } from "./context/AdminContext";
 
export default function Providers({ children }: { children: React.ReactNode }) {
  return <AdminProvider>{children}</AdminProvider>;
} 