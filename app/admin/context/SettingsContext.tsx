"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface Settings {
  id?: string
  siteName: string
  siteDescription: string
  logo: string
  contactEmail: string
  contactPhone: string
  address: string
  facebookUrl: string
  twitterUrl: string
  instagramUrl: string
  linkedinUrl: string
  youtubeUrl: string
  tiktokUrl: string
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  favicon?: string
}

interface SettingsContextType {
  settings: Settings | null
  isLoading: boolean
  error: string | null
}

const SettingsContext = createContext<SettingsContextType>({
  settings: null,
  isLoading: true,
  error: null,
})

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/admin/settings')
        const result = await response.json()
        if (result.success) {
          setSettings(result.data)
        } else {
          setError(result.error || 'Erreur lors du chargement des paramètres')
        }
      } catch (error) {
        setError('Erreur lors du chargement des paramètres')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, isLoading, error }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
} 