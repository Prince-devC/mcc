"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Save, Users, MessageSquare, Eye, ImageIcon, FileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SupportData {
  id?: string
  heroTitle: string
  heroImage: string
  title: string
  description: string
  image: string
  formTitle?: string
  formDescription?: string
}

// Composant de carte animée (identique à home-page-admin.tsx)
function AnimatedCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={cardRef}
      className={`
        transform transition-all duration-700 ease-out
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

const defaultSupportData: SupportData = {
  heroTitle: "ETRE BENEVOLE",
  heroImage: "/images/support/valeur-1.jpg",
  title: "Nous nous rendons disponibles pour vous !",
  description:
    "Devenir bénévole, c'est s'engager concrètement pour faire grandir notre mission. Que ce soit pour aider lors de nos distributions, accompagner les enfants ou soutenir nos actions au quotidien, chaque geste compte. En donnant un peu de votre temps, vous contribuez à changer des vies.",
  image: "/images/support/valeur-2.jpg",
  formTitle: "Rejoignez notre équipe de bénévoles",
  formDescription: "Remplissez le formulaire ci-dessous pour nous rejoindre",
}

export default function SupportPageAdmin() {
  const [supportData, setSupportData] = useState<SupportData>(defaultSupportData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/support")
        const result = await response.json()
        if (result.success) {
          setSupportData({ ...defaultSupportData, ...result.data })
        }
      } catch (error) {
        console.error("Error fetching support data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const updateSupportData = (newData: Partial<SupportData>) => {
    setSupportData((prev) => ({ ...prev, ...newData }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supportData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de la sauvegarde")
      }

      setSuccess("Données sauvegardées avec succès !")
      setTimeout(() => setSuccess(null), 3000)
    } catch (error: any) {
      setError("Erreur : " + error.message)
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = async (file: File, field: "heroImage" | "image") => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const oldImageUrl = supportData[field]
      if (oldImageUrl && !oldImageUrl.includes("placeholder.jpg")) {
        formData.append("oldImageUrl", oldImageUrl)
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Erreur lors du téléchargement")

      const data = await response.json()
      const imageUrl = data.path

      updateSupportData({ [field]: imageUrl })
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image:", error)
      setError("Erreur lors du téléchargement de l'image")
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: "heroImage" | "image") => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file, field)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 mx-auto"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-gray-600 font-medium">Chargement de l'interface d'administration...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <div className="flex justify-end p-4">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full text-lg"
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Enregistrer
                  </>
                )}
              </Button>
            </div>

      {/* Section Alertes */}
      {(error || success) && (
        <section className="py-10 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {error && (
              <AnimatedCard delay={200}>
                <Alert className="border-red-200 bg-red-50 mb-4">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              </AnimatedCard>
            )}
            {success && (
              <AnimatedCard delay={200}>
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-700">{success}</AlertDescription>
                </Alert>
              </AnimatedCard>
            )}
          </div>
        </section>
      )}

      {/* Section Aperçu - Style identique à la section "Qui sommes-nous" */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">Aperçu de la page Support</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <AnimatedCard delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ImageIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Section Hero</h3>
                <p className="text-gray-600">Image et titre principal de la page</p>
              </div>
              <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-green-700 mb-3">Contenu Principal</h3>
                <p className="text-gray-600">Description et informations sur le bénévolat</p>
              </div>
              <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-purple-700 mb-3">Formulaire</h3>
                <p className="text-gray-600">Inscription des bénévoles</p>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Section Onglets - Style identique à la section Valeurs clés */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">Gestion du Contenu Support</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <AnimatedCard delay={200}>
            <Tabs defaultValue="hero" className="space-y-8">
              <div className="flex justify-center">
                <TabsList className="grid grid-cols-3 bg-white shadow-lg border border-gray-200 rounded-full p-2 max-w-2xl">
                  <TabsTrigger
                    value="hero"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <ImageIcon className="h-4 w-4" />
                    Hero
                  </TabsTrigger>
                  <TabsTrigger
                    value="content"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <FileText className="h-4 w-4" />
                    Contenu
                  </TabsTrigger>
                  <TabsTrigger
                    value="form"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Formulaire
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Section Hero */}
              <TabsContent value="hero">
                <AnimatedCard delay={300}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <CardTitle className="flex items-center gap-3">
                        <ImageIcon className="h-5 w-5" />
                        Section Hero
                      </CardTitle>
                      <CardDescription className="text-blue-100">
                        Configuration de la section d'en-tête de la page
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Titre Hero</label>
                            <Input
                              value={supportData.heroTitle}
                              onChange={(e) => updateSupportData({ heroTitle: e.target.value })}
                              placeholder="Titre principal de la page"
                              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full text-lg font-semibold"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Image Hero</label>
                            <div className="space-y-4">
                              <div className="relative h-48 w-full rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                                <Image
                                  src={supportData.heroImage || "/placeholder.svg"}
                                  alt="Hero"
                                  fill
                                  className="object-cover transition-transform duration-300 hover:scale-105"
                                />
                              </div>
                              <div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleImageChange(e, "heroImage")}
                                  className="hidden"
                                  id="hero-image"
                                />
                                <Button
                                  variant="outline"
                                  className="flex items-center gap-2 w-full hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 rounded-full"
                                  onClick={() => document.getElementById("hero-image")?.click()}
                                >
                                  <Upload className="h-4 w-4" />
                                  Changer l'image hero
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-gray-700">Aperçu Hero</h3>
                          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-200">
                            <h4 className="text-2xl font-bold text-gray-800 mb-4">{supportData.heroTitle}</h4>
                            <p className="text-gray-600 mb-4">
                              Ceci est un aperçu de votre section hero telle qu'elle apparaîtra sur le site.
                            </p>
                            <div className="p-4 bg-white/50 rounded-2xl">
                              <p className="text-sm text-gray-500">
                                L'image hero sera affichée en arrière-plan avec le titre superposé.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </TabsContent>

              {/* Section Contenu */}
              <TabsContent value="content">
                <AnimatedCard delay={300}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                      <CardTitle className="flex items-center gap-3">
                        <FileText className="h-5 w-5" />
                        Contenu Principal
                      </CardTitle>
                      <CardDescription className="text-green-100">
                        Informations principales sur le bénévolat
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Titre</label>
                            <Input
                              value={supportData.title}
                              onChange={(e) => updateSupportData({ title: e.target.value })}
                              placeholder="Titre de la section principale"
                              className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Description</label>
                            <Textarea
                              value={supportData.description}
                              onChange={(e) => updateSupportData({ description: e.target.value })}
                              placeholder="Description détaillée du bénévolat"
                              rows={6}
                              className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Image principale</label>
                            <div className="space-y-4">
                              <div className="relative h-48 w-full rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                                <Image
                                  src={supportData.image || "/placeholder.svg"}
                                  alt="Main"
                                  fill
                                  className="object-cover transition-transform duration-300 hover:scale-105"
                                />
                              </div>
                              <div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleImageChange(e, "image")}
                                  className="hidden"
                                  id="main-image"
                                />
                                <Button
                                  variant="outline"
                                  className="flex items-center gap-2 w-full hover:bg-green-50 hover:border-green-500 hover:text-green-500 transition-all duration-300 rounded-full"
                                  onClick={() => document.getElementById("main-image")?.click()}
                                >
                                  <Upload className="h-4 w-4" />
                                  Changer l'image principale
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-gray-700">Aperçu du contenu</h3>
                          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border border-green-200">
                            <h4 className="text-xl font-bold text-gray-800 mb-3">{supportData.title}</h4>
                            <p className="text-gray-600 leading-relaxed mb-4">{supportData.description}</p>
                            <div className="p-4 bg-white/50 rounded-2xl">
                              <p className="text-sm text-gray-500">
                                Cette section apparaîtra avec l'image à côté du texte sur le site.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </TabsContent>

              {/* Section Formulaire */}
              <TabsContent value="form">
                <AnimatedCard delay={300}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                      <CardTitle className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5" />
                        Section Formulaire
                      </CardTitle>
                      <CardDescription className="text-purple-100">
                        Configuration du formulaire d'inscription des bénévoles
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Titre du formulaire</label>
                            <Input
                              value={supportData.formTitle || ""}
                              onChange={(e) => updateSupportData({ formTitle: e.target.value })}
                              placeholder="Titre du formulaire d'inscription"
                              className="border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-full"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Description du formulaire</label>
                            <Textarea
                              value={supportData.formDescription || ""}
                              onChange={(e) => updateSupportData({ formDescription: e.target.value })}
                              placeholder="Instructions pour remplir le formulaire"
                              rows={4}
                              className="border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                            />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-gray-700">Aperçu du formulaire</h3>
                          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl border border-purple-200">
                            <h4 className="text-xl font-bold text-gray-800 mb-3">
                              {supportData.formTitle || "Titre du formulaire"}
                            </h4>
                            <p className="text-gray-600 mb-4">
                              {supportData.formDescription || "Description du formulaire"}
                            </p>
                            <div className="space-y-3">
                              <div className="p-3 bg-white/50 rounded-2xl">
                                <p className="text-sm text-gray-500">📝 Champ: Nom complet</p>
                              </div>
                              <div className="p-3 bg-white/50 rounded-2xl">
                                <p className="text-sm text-gray-500">📧 Champ: Email</p>
                              </div>
                              <div className="p-3 bg-white/50 rounded-2xl">
                                <p className="text-sm text-gray-500">📱 Champ: Téléphone</p>
                              </div>
                              <div className="p-3 bg-white/50 rounded-2xl">
                                <p className="text-sm text-gray-500">💬 Champ: Message</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </TabsContent>
            </Tabs>
          </AnimatedCard>
        </div>
      </section>

      {/* Section Actions rapides - Style identique à la section CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">Actions Rapides</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <AnimatedCard delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Prévisualiser</h3>
                  <p className="text-gray-600 mb-6">Voir la page en direct</p>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-all duration-300">
                    Ouvrir
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Bénévoles</h3>
                  <p className="text-gray-600 mb-6">Gérer les inscriptions</p>
                  <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-all duration-300">
                    Gérer
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Messages</h3>
                  <p className="text-gray-600 mb-6">Voir les demandes</p>
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition-all duration-300">
                    Consulter
                  </Button>
                </CardContent>
              </Card>
            </div>
          </AnimatedCard>
        </div>
      </section>
    </main>
  )
}
