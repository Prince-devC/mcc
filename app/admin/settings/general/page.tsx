"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Save, Upload, Palette, CreditCard, Globe, Settings, Eye, Smartphone, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SettingsType {
  siteName: string
  siteDescription: string
  logo: string
  favicon: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  paymentMethods: {
    stripe: boolean
    paypal: boolean
    orangeMoney: boolean
    mtnMomo: boolean
  }
  stripePublicKey: string
  stripeSecretKey: string
  paypalClientId: string
  paypalSecret: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  metaImage: string
  facebookUrl: string | null
  twitterUrl: string | null
  instagramUrl: string | null
  linkedinUrl: string | null
  youtubeUrl: string | null
  contactEmail: string | null
  contactPhone: string | null
  contactAddress: string | null
  contactCity: string | null
  contactCountry: string | null
}

const defaultSettings: SettingsType = {
  siteName: "MCC",
  siteDescription: "Mouvement des Citoyens pour le Changement",
  logo: "/images/logomccnoir@300x-8.png",
  favicon: "/images/favicon.ico",
  primaryColor: "#1B2537",
  secondaryColor: "#F59E0B",
  accentColor: "#4B5563",
  paymentMethods: {
    stripe: false,
    paypal: false,
    orangeMoney: false,
    mtnMomo: false,
  },
  stripePublicKey: "",
  stripeSecretKey: "",
  paypalClientId: "",
  paypalSecret: "",
  metaTitle: "MCC - Mouvement des Citoyens pour le Changement",
  metaDescription:
    "Le Mouvement des Citoyens pour le Changement (MCC) est une organisation à but non lucratif qui œuvre pour le développement social et économique.",
  metaKeywords: "MCC, développement, social, économique, Cameroun",
  metaImage: "/images/meta-image.jpg",
  facebookUrl: null,
  twitterUrl: null,
  instagramUrl: null,
  linkedinUrl: null,
  youtubeUrl: null,
  contactEmail: null,
  contactPhone: null,
  contactAddress: null,
  contactCity: null,
  contactCountry: null,
}

// Animated Card Component
const AnimatedCard = ({
  children,
  delay = 0,
  className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) => {
  return (
    <div
      className={`animate-fade-in-up opacity-0 ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  )
}

// Loading Component
const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
    {/* Geometric shapes */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <div className="text-center space-y-4 relative z-10">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
        <div
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"
          style={{ animationDirection: "reverse", animationDuration: "1s" }}
        ></div>
      </div>
      <p className="text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Chargement des paramètres...
      </p>
    </div>
  </div>
)

export default function GeneralSettings() {
  const [settings, setSettings] = useState<SettingsType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/admin/settings")
        const result = await response.json()
        if (result.success && result.data) {
          setSettings(result.data)
        } else {
          setSettings(defaultSettings)
          const saveResponse = await fetch("/api/admin/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(defaultSettings),
          })
          if (!saveResponse.ok) {
            console.error("Erreur lors de la sauvegarde des paramètres par défaut")
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error)
        setSettings(defaultSettings)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleSave = async () => {
    if (!settings) return
    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      if (!response.ok) throw new Error("Erreur lors de la sauvegarde")
      setSuccess("Paramètres sauvegardés avec succès !")
    } catch (error: any) {
      setError("Erreur : " + error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = async (file: File, type: "logo" | "favicon" | "metaImage") => {
    if (!settings) return
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Erreur lors du téléchargement")

      const result = await response.json()

      setSettings((prev) =>
        prev
          ? {
              ...prev,
              [type]: result.path,
            }
          : null,
      )
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error)
      setError("Erreur lors du téléchargement de l'image")
    }
  }

  if (isLoading || !settings) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg rotate-45 opacity-10 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full opacity-10 animate-float delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto py-10 px-5">
        {/* Hero Section */}
        <AnimatedCard>
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg">
                  <Settings className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Paramètres Généraux
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Configurez tous les aspects de votre site web depuis cette interface centralisée
              </p>
            </div>
          </div>
        </AnimatedCard>

        {/* Alerts */}
        {error && (
          <AnimatedCard delay={100}>
            <Alert variant="destructive" className="mb-6 bg-red-50/80 backdrop-blur-sm border-red-200">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          </AnimatedCard>
        )}

        {success && (
          <AnimatedCard delay={100}>
            <Alert className="mb-6 bg-green-50/80 backdrop-blur-sm border-green-200">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          </AnimatedCard>
        )}

        {/* Main Content */}
        <AnimatedCard delay={200}>
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-0">
              <Tabs defaultValue="general" className="w-full">
                <div className="border-b border-gray-200 bg-gray-50/50 rounded-t-xl">
                  <TabsList className="grid w-full grid-cols-6 bg-transparent p-2">
                    <TabsTrigger
                      value="general"
                      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
                    >
                      <Settings className="h-4 w-4" />
                      <span className="hidden sm:inline">Général</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="appearance"
                      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
                    >
                      <Palette className="h-4 w-4" />
                      <span className="hidden sm:inline">Apparence</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="payments"
                      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
                    >
                      <CreditCard className="h-4 w-4" />
                      <span className="hidden sm:inline">Paiements</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="seo"
                      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
                    >
                      <Globe className="h-4 w-4" />
                      <span className="hidden sm:inline">SEO</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="social"
                      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
                    >
                      <Smartphone className="h-4 w-4" />
                      <span className="hidden sm:inline">Réseaux</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="contact"
                      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="hidden sm:inline">Contact</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-8">
                  {/* General Tab */}
                  <TabsContent value="general" className="mt-0 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <AnimatedCard delay={100}>
                        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                          <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                                <Settings className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-gray-800">Informations Générales</CardTitle>
                                <CardDescription className="text-gray-600">
                                  Configurez les informations de base de votre site
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="space-y-3">
                              <Label className="text-gray-700 font-medium">Nom du site</Label>
                              <Input
                                value={settings.siteName}
                                onChange={(e) => setSettings((prev) => ({ ...prev!, siteName: e.target.value }))}
                                className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 rounded-xl"
                              />
                            </div>
                            <div className="space-y-3">
                              <Label className="text-gray-700 font-medium">Description du site</Label>
                              <Textarea
                                value={settings.siteDescription}
                                onChange={(e) => setSettings((prev) => ({ ...prev!, siteDescription: e.target.value }))}
                                className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 min-h-[100px] rounded-xl"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedCard>

                      <AnimatedCard delay={200}>
                        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                          <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                                <Upload className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-gray-800">Médias</CardTitle>
                                <CardDescription className="text-gray-600">
                                  Gérez le logo et favicon de votre site
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="space-y-3">
                              <Label className="text-gray-700 font-medium">Logo</Label>
                              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-gray-200/50">
                                <div className="relative h-16 w-16 bg-white rounded-lg shadow-sm border border-gray-200/50 overflow-hidden group">
                                  <Image
                                    src={settings.logo || "/placeholder.svg"}
                                    alt="Logo"
                                    fill
                                    className="object-contain transition-transform duration-200 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                                    <Eye className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) handleImageUpload(file, "logo")
                                    }}
                                    className="hidden"
                                    id="logo-upload"
                                  />
                                  <Button
                                    variant="outline"
                                    className="w-full bg-white/70 border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 rounded-xl"
                                    onClick={() => document.getElementById("logo-upload")?.click()}
                                  >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Changer le logo
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <Label className="text-gray-700 font-medium">Favicon</Label>
                              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-gray-200/50">
                                <div className="relative h-12 w-12 bg-white rounded-lg shadow-sm border border-gray-200/50 overflow-hidden group">
                                  <Image
                                    src={settings.favicon || "/placeholder.svg"}
                                    alt="Favicon"
                                    fill
                                    className="object-contain transition-transform duration-200 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                                    <Eye className="h-3 w-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) handleImageUpload(file, "favicon")
                                    }}
                                    className="hidden"
                                    id="favicon-upload"
                                  />
                                  <Button
                                    variant="outline"
                                    className="w-full bg-white/70 border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 rounded-xl"
                                    onClick={() => document.getElementById("favicon-upload")?.click()}
                                  >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Changer le favicon
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedCard>
                    </div>
                  </TabsContent>

                  {/* Appearance Tab */}
                  <TabsContent value="appearance" className="mt-0 space-y-6">
                    <AnimatedCard delay={100}>
                      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                              <Palette className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-gray-800">Apparence</CardTitle>
                              <CardDescription className="text-gray-600">
                                Personnalisez les couleurs de votre site
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                              <Label className="text-gray-700 font-medium">Couleur principale</Label>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <Input
                                      type="color"
                                      value={settings.primaryColor}
                                      onChange={(e) =>
                                        setSettings((prev) => ({ ...prev!, primaryColor: e.target.value }))
                                      }
                                      className="w-16 h-12 p-1 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition-colors duration-200"
                                    />
                                  </div>
                                  <Input
                                    value={settings.primaryColor}
                                    onChange={(e) =>
                                      setSettings((prev) => ({ ...prev!, primaryColor: e.target.value }))
                                    }
                                    className="flex-1 bg-white/70 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200 rounded-xl"
                                  />
                                </div>
                                <div
                                  className="h-8 rounded-lg border border-gray-200/50 shadow-sm"
                                  style={{ backgroundColor: settings.primaryColor }}
                                />
                              </div>
                            </div>

                            <div className="space-y-3">
                              <Label className="text-gray-700 font-medium">Couleur secondaire</Label>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <Input
                                      type="color"
                                      value={settings.secondaryColor}
                                      onChange={(e) =>
                                        setSettings((prev) => ({ ...prev!, secondaryColor: e.target.value }))
                                      }
                                      className="w-16 h-12 p-1 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition-colors duration-200"
                                    />
                                  </div>
                                  <Input
                                    value={settings.secondaryColor}
                                    onChange={(e) =>
                                      setSettings((prev) => ({ ...prev!, secondaryColor: e.target.value }))
                                    }
                                    className="flex-1 bg-white/70 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200 rounded-xl"
                                  />
                                </div>
                                <div
                                  className="h-8 rounded-lg border border-gray-200/50 shadow-sm"
                                  style={{ backgroundColor: settings.secondaryColor }}
                                />
                              </div>
                            </div>

                            <div className="space-y-3">
                              <Label className="text-gray-700 font-medium">Couleur d'accent</Label>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <Input
                                      type="color"
                                      value={settings.accentColor}
                                      onChange={(e) =>
                                        setSettings((prev) => ({ ...prev!, accentColor: e.target.value }))
                                      }
                                      className="w-16 h-12 p-1 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition-colors duration-200"
                                    />
                                  </div>
                                  <Input
                                    value={settings.accentColor}
                                    onChange={(e) => setSettings((prev) => ({ ...prev!, accentColor: e.target.value }))}
                                    className="flex-1 bg-white/70 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200 rounded-xl"
                                  />
                                </div>
                                <div
                                  className="h-8 rounded-lg border border-gray-200/50 shadow-sm"
                                  style={{ backgroundColor: settings.accentColor }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 p-6 bg-white/50 rounded-xl border border-gray-200/50">
                            <h4 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              Aperçu des couleurs
                            </h4>
                            <div className="flex gap-2">
                              <div
                                className="flex-1 h-12 rounded-lg shadow-sm border border-white/50 flex items-center justify-center text-white font-medium text-sm"
                                style={{ backgroundColor: settings.primaryColor }}
                              >
                                Principale
                              </div>
                              <div
                                className="flex-1 h-12 rounded-lg shadow-sm border border-white/50 flex items-center justify-center text-white font-medium text-sm"
                                style={{ backgroundColor: settings.secondaryColor }}
                              >
                                Secondaire
                              </div>
                              <div
                                className="flex-1 h-12 rounded-lg shadow-sm border border-white/50 flex items-center justify-center text-white font-medium text-sm"
                                style={{ backgroundColor: settings.accentColor }}
                              >
                                Accent
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedCard>
                  </TabsContent>

                  {/* Payments Tab */}
                  <TabsContent value="payments" className="mt-0 space-y-6">
                    <AnimatedCard delay={100}>
                      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                              <CreditCard className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-gray-800">Méthodes de Paiement</CardTitle>
                              <CardDescription className="text-gray-600">
                                Configurez les méthodes de paiement disponibles
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-8">
                          {/* Stripe */}
                          <div className="p-6 bg-white/50 rounded-xl border border-gray-200/50 space-y-4 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                                  <CreditCard className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <Label className="text-gray-800 font-medium">Stripe</Label>
                                  <p className="text-sm text-gray-600">Paiement par carte bancaire via Stripe</p>
                                </div>
                              </div>
                              <Switch
                                checked={settings.paymentMethods.stripe}
                                onCheckedChange={(checked) =>
                                  setSettings((prev) => ({
                                    ...prev!,
                                    paymentMethods: { ...prev!.paymentMethods, stripe: checked },
                                  }))
                                }
                                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500"
                              />
                            </div>
                            {settings.paymentMethods.stripe && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200/50">
                                <div className="space-y-2">
                                  <Label className="text-gray-700">Clé publique Stripe</Label>
                                  <Input
                                    type="password"
                                    value={settings.stripePublicKey}
                                    onChange={(e) =>
                                      setSettings((prev) => ({ ...prev!, stripePublicKey: e.target.value }))
                                    }
                                    className="bg-white/70 border-gray-200 focus:border-green-400 focus:ring-green-400/20 rounded-xl"
                                    placeholder="pk_test_..."
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-gray-700">Clé secrète Stripe</Label>
                                  <Input
                                    type="password"
                                    value={settings.stripeSecretKey}
                                    onChange={(e) =>
                                      setSettings((prev) => ({ ...prev!, stripeSecretKey: e.target.value }))
                                    }
                                    className="bg-white/70 border-gray-200 focus:border-green-400 focus:ring-green-400/20 rounded-xl"
                                    placeholder="sk_test_..."
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* PayPal */}
                          <div className="p-6 bg-white/50 rounded-xl border border-gray-200/50 space-y-4 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
                                  <CreditCard className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <Label className="text-gray-800 font-medium">PayPal</Label>
                                  <p className="text-sm text-gray-600">Paiement via PayPal</p>
                                </div>
                              </div>
                              <Switch
                                checked={settings.paymentMethods.paypal}
                                onCheckedChange={(checked) =>
                                  setSettings((prev) => ({
                                    ...prev!,
                                    paymentMethods: { ...prev!.paymentMethods, paypal: checked },
                                  }))
                                }
                                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500"
                              />
                            </div>
                            {settings.paymentMethods.paypal && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200/50">
                                <div className="space-y-2">
                                  <Label className="text-gray-700">Client ID PayPal</Label>
                                  <Input
                                    type="password"
                                    value={settings.paypalClientId}
                                    onChange={(e) =>
                                      setSettings((prev) => ({ ...prev!, paypalClientId: e.target.value }))
                                    }
                                    className="bg-white/70 border-gray-200 focus:border-green-400 focus:ring-green-400/20 rounded-xl"
                                    placeholder="Client ID..."
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-gray-700">Clé secrète PayPal</Label>
                                  <Input
                                    type="password"
                                    value={settings.paypalSecret}
                                    onChange={(e) =>
                                      setSettings((prev) => ({ ...prev!, paypalSecret: e.target.value }))
                                    }
                                    className="bg-white/70 border-gray-200 focus:border-green-400 focus:ring-green-400/20 rounded-xl"
                                    placeholder="Secret..."
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Mobile Money */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-white/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-300">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                                    <Smartphone className="h-4 w-4 text-white" />
                                  </div>
                                  <div>
                                    <Label className="text-gray-800 font-medium">Orange Money</Label>
                                    <p className="text-sm text-gray-600">Paiement mobile via Orange Money</p>
                                  </div>
                                </div>
                                <Switch
                                  checked={settings.paymentMethods.orangeMoney}
                                  onCheckedChange={(checked) =>
                                    setSettings((prev) => ({
                                      ...prev!,
                                      paymentMethods: { ...prev!.paymentMethods, orangeMoney: checked },
                                    }))
                                  }
                                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500"
                                />
                              </div>
                            </div>

                            <div className="p-6 bg-white/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-300">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg">
                                    <Smartphone className="h-4 w-4 text-white" />
                                  </div>
                                  <div>
                                    <Label className="text-gray-800 font-medium">MTN Mobile Money</Label>
                                    <p className="text-sm text-gray-600">Paiement mobile via MTN Mobile Money</p>
                                  </div>
                                </div>
                                <Switch
                                  checked={settings.paymentMethods.mtnMomo}
                                  onCheckedChange={(checked) =>
                                    setSettings((prev) => ({
                                      ...prev!,
                                      paymentMethods: { ...prev!.paymentMethods, mtnMomo: checked },
                                    }))
                                  }
                                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500"
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedCard>
                  </TabsContent>

                  {/* SEO Tab */}
                  <TabsContent value="seo" className="mt-0 space-y-6">
                    <AnimatedCard delay={100}>
                      <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                              <Globe className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-gray-800">SEO</CardTitle>
                              <CardDescription className="text-gray-600">
                                Configurez les métadonnées de votre site
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <Label className="text-gray-700 font-medium">Titre de la page</Label>
                              <Input
                                value={settings.metaTitle}
                                onChange={(e) => setSettings((prev) => ({ ...prev!, metaTitle: e.target.value }))}
                                className="bg-white/70 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-200 rounded-xl"
                              />
                            </div>
                            <div className="space-y-3">
                              <Label className="text-gray-700 font-medium">Mots-clés</Label>
                              <Input
                                value={settings.metaKeywords}
                                onChange={(e) => setSettings((prev) => ({ ...prev!, metaKeywords: e.target.value }))}
                                className="bg-white/70 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-200 rounded-xl"
                                placeholder="mot1, mot2, mot3"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-gray-700 font-medium">Description</Label>
                            <Textarea
                              value={settings.metaDescription}
                              onChange={(e) => setSettings((prev) => ({ ...prev!, metaDescription: e.target.value }))}
                              className="bg-white/70 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-200 min-h-[100px] rounded-xl"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-gray-700 font-medium">Image de partage</Label>
                            <div className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-gray-200/50">
                              <div className="relative h-20 w-32 bg-white rounded-lg shadow-sm border border-gray-200/50 overflow-hidden group">
                                <Image
                                  src={settings.metaImage || "/placeholder.svg"}
                                  alt="Meta Image"
                                  fill
                                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                                  <Eye className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) handleImageUpload(file, "metaImage")
                                  }}
                                  className="hidden"
                                  id="meta-image-upload"
                                />
                                <Button
                                  variant="outline"
                                  className="w-full bg-white/70 border-gray-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 rounded-xl"
                                  onClick={() => document.getElementById("meta-image-upload")?.click()}
                                >
                                  <Upload className="h-4 w-4 mr-2" />
                                  Changer l'image
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedCard>
                  </TabsContent>

                  {/* Social Tab */}
                  <TabsContent value="social" className="mt-0 space-y-6">
                    <AnimatedCard delay={100}>
                      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                              <Smartphone className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-gray-800">Réseaux Sociaux</CardTitle>
                              <CardDescription className="text-gray-600">
                                Configurez vos liens de réseaux sociaux
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <Label htmlFor="facebookUrl" className="text-gray-700 font-medium">
                                Facebook URL
                              </Label>
                              <Input
                                id="facebookUrl"
                                value={settings.facebookUrl || ""}
                                onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                                placeholder="https://facebook.com/your-page"
                                className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 rounded-xl"
                              />
                            </div>
                            <div className="space-y-3">
                              <Label htmlFor="twitterUrl" className="text-gray-700 font-medium">
                                Twitter URL
                              </Label>
                              <Input
                                id="twitterUrl"
                                value={settings.twitterUrl || ""}
                                onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                                placeholder="https://twitter.com/your-handle"
                                className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 rounded-xl"
                              />
                            </div>
                            <div className="space-y-3">
                              <Label htmlFor="instagramUrl" className="text-gray-700 font-medium">
                                Instagram URL
                              </Label>
                              <Input
                                id="instagramUrl"
                                value={settings.instagramUrl || ""}
                                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                                placeholder="https://instagram.com/your-account"
                                className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 rounded-xl"
                              />
                            </div>
                            <div className="space-y-3">
                              <Label htmlFor="linkedinUrl" className="text-gray-700 font-medium">
                                LinkedIn URL
                              </Label>
                              <Input
                                id="linkedinUrl"
                                value={settings.linkedinUrl || ""}
                                onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                                placeholder="https://linkedin.com/company/your-company"
                                className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 rounded-xl"
                              />
                            </div>
                            <div className="space-y-3 md:col-span-2">
                              <Label htmlFor="youtubeUrl" className="text-gray-700 font-medium">
                                YouTube URL
                              </Label>
                              <Input
                                id="youtubeUrl"
                                value={settings.youtubeUrl || ""}
                                onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                                placeholder="https://youtube.com/your-channel"
                                className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 rounded-xl"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedCard>
                  </TabsContent>

                  {/* Contact Tab */}
                  <TabsContent value="contact" className="mt-0 space-y-6">
                    <AnimatedCard delay={100}>
                      <Card className="bg-gradient-to-br from-teal-50 to-green-50 border-teal-200 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg">
                              <MapPin className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-gray-800">Informations de Contact</CardTitle>
                              <CardDescription className="text-gray-600">
                                Configurez les informations de contact affichées sur votre site
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <Label htmlFor="contactEmail" className="text-gray-700 font-medium">
                                Email de contact
                              </Label>
                              <Input
                                id="contactEmail"
                                type="email"
                                value={settings.contactEmail || ""}
                                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                placeholder="contact@example.com"
                                className="bg-white/70 border-gray-200 focus:border-teal-400 focus:ring-teal-400/20 transition-all duration-200 rounded-xl"
                              />
                            </div>
                            <div className="space-y-3">
                              <Label htmlFor="contactPhone" className="text-gray-700 font-medium">
                                Téléphone
                              </Label>
                              <Input
                                id="contactPhone"
                                value={settings.contactPhone || ""}
                                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                                placeholder="+237 XXX XXX XXX"
                                className="bg-white/70 border-gray-200 focus:border-teal-400 focus:ring-teal-400/20 transition-all duration-200 rounded-xl"
                              />
                            </div>
                            <div className="space-y-3">
                              <Label htmlFor="contactAddress" className="text-gray-700 font-medium">
                                Adresse
                              </Label>
                              <Input
                                id="contactAddress"
                                value={settings.contactAddress || ""}
                                onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })}
                                placeholder="123 Rue Example"
                                className="bg-white/70 border-gray-200 focus:border-teal-400 focus:ring-teal-400/20 transition-all duration-200 rounded-xl"
                              />
                            </div>
                            <div className="space-y-3">
                              <Label htmlFor="contactCity" className="text-gray-700 font-medium">
                                Ville
                              </Label>
                              <Input
                                id="contactCity"
                                value={settings.contactCity || ""}
                                onChange={(e) => setSettings({ ...settings, contactCity: e.target.value })}
                                placeholder="Yaoundé"
                                className="bg-white/70 border-gray-200 focus:border-teal-400 focus:ring-teal-400/20 transition-all duration-200 rounded-xl"
                              />
                            </div>
                            <div className="space-y-3 md:col-span-2">
                              <Label htmlFor="contactCountry" className="text-gray-700 font-medium">
                                Pays
                              </Label>
                              <Input
                                id="contactCountry"
                                value={settings.contactCountry || ""}
                                onChange={(e) => setSettings({ ...settings, contactCountry: e.target.value })}
                                placeholder="Cameroun"
                                className="bg-white/70 border-gray-200 focus:border-teal-400 focus:ring-teal-400/20 transition-all duration-200 rounded-xl"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedCard>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </AnimatedCard>

        {/* Save Button */}
        <AnimatedCard delay={300}>
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Sauvegarde en cours...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Enregistrer les modifications
                </>
              )}
            </Button>
          </div>
        </AnimatedCard>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  )
}
