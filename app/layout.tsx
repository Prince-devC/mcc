import './globals.css'
import { Inter } from 'next/font/google'
import { HomeProvider } from './admin/context/HomeContext'
import { SettingsProvider } from './context/SettingsContext'
import type { Metadata } from "next"
import type { Settings } from "@/types/prisma"
import PublicLayout from './components/PublicLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MCC - Mission Chrétienne pour les Enfants',
  description: 'Protéger, accompagner et insérer les enfants, jeunes et femmes vulnérables',
}

// Données par défaut pour les paramètres du site
const defaultSettings: Settings = {
  id: "1",
  siteName: "MCC",
  siteDescription: "Mission Chrétienne pour les Enfants",
  logo: "/images/logo.png",
  favicon: "/favicon.ico",
  primaryColor: "#2563eb",
  secondaryColor: "#facc15",
  accentColor: "#22c55e",
  paymentMethods: "CB, PayPal, Virement",
  stripePublicKey: "",
  stripeSecretKey: "",
  paypalClientId: "",
  paypalSecret: "",
  metaTitle: "MCC - Mission Chrétienne pour les Enfants",
  metaDescription: "Protéger, accompagner et insérer les enfants, jeunes et femmes vulnérables",
  metaKeywords: "MCC, enfants, protection, éducation, Sénégal",
  metaImage: "/images/logo.png",
  facebookUrl: "https://facebook.com/mcc",
  twitterUrl: "https://twitter.com/mcc",
  instagramUrl: "https://instagram.com/mcc",
  linkedinUrl: "https://linkedin.com/company/mcc",
  youtubeUrl: "https://youtube.com/mcc",
  contactEmail: "contact@mcc.org",
  contactPhone: "+221 XX XXX XX XX",
  contactAddress: "Dakar, Sénégal",
  contactCity: "Dakar",
  contactCountry: "Sénégal",
  createdAt: new Date(),
  updatedAt: new Date()
}

async function getSettings(): Promise<Settings> {
  try {
    // Essayer de récupérer depuis la base de données
    const { prisma } = await import("@/lib/prisma")
    const settings = await prisma.settings.findFirst()
    return settings || defaultSettings
  } catch (error) {
    console.error('Error fetching settings, using defaults:', error)
    return defaultSettings
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettings()

  return (
    <html lang="fr">
      <body className={inter.className} data-testim-main-word-scripts-loaded="true">
        <SettingsProvider>
          <HomeProvider>
            <PublicLayout>
              {children}
            </PublicLayout>
          </HomeProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}