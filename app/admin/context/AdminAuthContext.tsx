"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface AdminAuthContextType {
  isAuthenticated: boolean
  adminUser: string | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Vérifie la session au chargement
    const checkAuth = () => {
      const storedUser = localStorage.getItem("adminUser")
      if (storedUser) {
        setIsAuthenticated(true)
        setAdminUser(storedUser)
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (username: string, password: string) => {
    try {
      // Ici, tu peux remplacer par un appel API réel
      if (username === "admin" && password === "admin") {
        setIsAuthenticated(true)
        setAdminUser(username)
        localStorage.setItem("adminUser", username)
        return true
      }
      return false
    } catch (error) {
      console.error("Erreur de connexion:", error)
      return false
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setAdminUser(null)
    localStorage.removeItem("adminUser")
    router.push("/admin")
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, adminUser, login, logout, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) throw new Error("useAdminAuth must be used within AdminAuthProvider")
  return context
} 