"use client"

import { createContext, useContext, ReactNode } from "react"

interface AdminContextType {
  // Ajoutez ici les propriétés et méthodes du contexte si nécessaire
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  return (
    <AdminContext.Provider value={{}}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
} 