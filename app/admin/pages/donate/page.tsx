"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Save, Plus, Trash2, Eye, FileText, Heart, Info, DollarSign } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Benefit {
  id?: string
  text: string
}

interface InfoType {
  id?: string
  title: string
  content: string
}

interface DonateData {
  id?: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  title: string
  description: string
  benefits: Benefit[]
  infoTitle: string
  infoContent: InfoType[]
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

const defaultDonateData: DonateData = {
  heroTitle: "Faire un don",
  heroSubtitle: "Votre soutien fait la différence",
  heroImage: "/images/valeur-2.jpg",
  title: "Pourquoi faire un don ?",
  description:
    "Votre don nous permet de continuer notre mission d'aide aux enfants, jeunes et femmes vulnérables. Chaque contribution compte et fait une réelle différence dans leur vie.",
  benefits: [
    { text: "Financement de nos programmes éducatifs" },
    { text: "Soutien aux familles dans le besoin" },
    { text: "Développement de nouveaux projets" },
  ],
  infoTitle: "Informations importantes",
  infoContent: [
    {
      title: "Reçu fiscal",
      content: "Un reçu fiscal vous sera envoyé pour tout don supérieur à 50€.",
    },
    {
      title: "Sécurité",
      content: "Vos informations sont sécurisées et ne seront jamais partagées avec des tiers.",
    },
    {
      title: "Questions ?",
      content:
        "Pour toute question concernant votre don, n'hésitez pas à nous contacter au 01 23 45 67 89 ou par email à contact@mcc.org",
    },
  ],
}

export default function DonatePageAdmin() {
  const [donateData, setDonateData] = useState<DonateData>(defaultDonateData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/donate")
        const result = await response.json()
        if (result.success) {
          setDonateData({ ...defaultDonateData, ...result.data })
        }
      } catch (error) {
        console.error("Error fetching donate data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const updateDonateData = (newData: Partial<DonateData>) => {
    setDonateData((prev) => ({ ...prev, ...newData }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donateData),
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

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const oldImageUrl = donateData.heroImage
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

      updateDonateData({ heroImage: imageUrl })
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image:", error)
      setError("Erreur lors du téléchargement de l'image")
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const addBenefit = () => {
    updateDonateData({
      benefits: [...donateData.benefits, { text: "" }],
    })
  }

  const removeBenefit = (index: number) => {
    updateDonateData({
      benefits: donateData.benefits.filter((_, i) => i !== index),
    })
  }

  const updateBenefit = (index: number, text: string) => {
    updateDonateData({
      benefits: donateData.benefits.map((benefit, i) => (i === index ? { ...benefit, text } : benefit)),
    })
  }

  const addInfo = () => {
    updateDonateData({
      infoContent: [...donateData.infoContent, { title: "", content: "" }],
    })
  }

  const removeInfo = (index: number) => {
    updateDonateData({
      infoContent: donateData.infoContent.filter((_, i) => i !== index),
    })
  }

  const updateInfo = (index: number, field: "title" | "content", value: string) => {
    updateDonateData({
      infoContent: donateData.infoContent.map((info, i) => (i === index ? { ...info, [field]: value } : info)),
    })
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
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">Aperçu de la page Donation</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <AnimatedCard delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-green-700 mb-3">Section Hero</h3>
                <p className="text-gray-600">Image et titre principal de donation</p>
              </div>
              <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Contenu Principal</h3>
                <p className="text-gray-600">Description et informations sur les dons</p>
              </div>
              <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-red-700 mb-3">Avantages</h3>
                <p className="text-gray-600">Bénéfices de faire un don</p>
              </div>
              <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Info className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-yellow-700 mb-3">Informations</h3>
                <p className="text-gray-600">Détails pratiques et légaux</p>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Section Onglets - Style identique à la section Valeurs clés */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">Gestion du Contenu Donation</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <AnimatedCard delay={200}>
            <Tabs defaultValue="hero" className="space-y-8">
              <div className="flex justify-center">
                <TabsList className="grid grid-cols-4 bg-white shadow-lg border border-gray-200 rounded-full p-2 max-w-3xl">
                  <TabsTrigger
                    value="hero"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <DollarSign className="h-4 w-4" />
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
                    value="benefits"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <Heart className="h-4 w-4" />
                    Avantages
                  </TabsTrigger>
                  <TabsTrigger
                    value="info"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <Info className="h-4 w-4" />
                    Informations
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Section Hero */}
              <TabsContent value="hero">
                <AnimatedCard delay={300}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      <CardTitle className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5" />
                        Section Hero
                      </CardTitle>
                      <CardDescription className="text-green-100">
                        Configuration de la section d'en-tête de la page
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Titre Hero</label>
                            <Input
                              value={donateData.heroTitle}
                              onChange={(e) => updateDonateData({ heroTitle: e.target.value })}
                              placeholder="Titre principal de la page"
                              className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full text-lg font-semibold"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Sous-titre Hero</label>
                            <Input
                              value={donateData.heroSubtitle}
                              onChange={(e) => updateDonateData({ heroSubtitle: e.target.value })}
                              placeholder="Sous-titre de la page"
                              className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Image Hero</label>
                            <div className="space-y-4">
                              <div className="relative h-48 w-full rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                                <Image
                                  src={donateData.heroImage || "/placeholder.svg"}
                                  alt="Hero"
                                  fill
                                  className="object-cover transition-transform duration-300 hover:scale-105"
                                />
                              </div>
                              <div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                  className="hidden"
                                  id="hero-image"
                                />
                                <Button
                                  variant="outline"
                                  className="flex items-center gap-2 w-full hover:bg-green-50 hover:border-green-500 hover:text-green-500 transition-all duration-300 rounded-full"
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
                          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border border-green-200">
                            <h4 className="text-2xl font-bold text-gray-800 mb-2">{donateData.heroTitle}</h4>
                            <p className="text-lg text-gray-600 mb-4">{donateData.heroSubtitle}</p>
                            <div className="p-4 bg-white/50 rounded-2xl">
                              <p className="text-sm text-gray-500">
                                L'image hero sera affichée en arrière-plan avec le titre et sous-titre superposés.
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
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <CardTitle className="flex items-center gap-3">
                        <FileText className="h-5 w-5" />
                        Contenu Principal
                      </CardTitle>
                      <CardDescription className="text-blue-100">
                        Informations principales sur les donations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Titre</label>
                            <Input
                              value={donateData.title}
                              onChange={(e) => updateDonateData({ title: e.target.value })}
                              placeholder="Titre de la section principale"
                              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Description</label>
                            <Textarea
                              value={donateData.description}
                              onChange={(e) => updateDonateData({ description: e.target.value })}
                              placeholder="Description détaillée des donations"
                              rows={6}
                              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                            />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-gray-700">Aperçu du contenu</h3>
                          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-200">
                            <h4 className="text-xl font-bold text-gray-800 mb-3">{donateData.title}</h4>
                            <p className="text-gray-600 leading-relaxed mb-4">{donateData.description}</p>
                            <div className="p-4 bg-white/50 rounded-2xl">
                              <p className="text-sm text-gray-500">
                                Cette section expliquera l'importance des donations et leur impact.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </TabsContent>

              {/* Section Avantages */}
              <TabsContent value="benefits">
                <AnimatedCard delay={300}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            <Heart className="h-5 w-5" />
                            Avantages des Donations
                          </CardTitle>
                          <CardDescription className="text-red-100">
                            Gérer les avantages de faire un don
                          </CardDescription>
                        </div>
                        <Button
                          onClick={addBenefit}
                          className="bg-white text-red-600 hover:bg-red-50 font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Ajouter un avantage
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      {donateData.benefits.map((benefit, index) => (
                        <AnimatedCard key={index} delay={400 + index * 100}>
                          <Card className="border border-gray-200 shadow-md bg-white/90 hover:shadow-lg transition-all duration-300">
                            <CardContent className="pt-6">
                              <div className="flex items-center gap-4">
                                <div className="flex-1">
                                  <Input
                                    value={benefit.text}
                                    onChange={(e) => updateBenefit(index, e.target.value)}
                                    placeholder="Texte de l'avantage"
                                    className="border-gray-200 focus:border-red-500 focus:ring-red-500/20 rounded-full"
                                  />
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-300 rounded-full"
                                  onClick={() => removeBenefit(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </AnimatedCard>
                      ))}
                      {donateData.benefits.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-gray-500 mb-4">Aucun avantage ajouté</p>
                          <Button
                            onClick={addBenefit}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Ajouter le premier avantage
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </TabsContent>

              {/* Section Informations */}
              <TabsContent value="info">
                <AnimatedCard delay={300}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            <Info className="h-5 w-5" />
                            Informations Importantes
                          </CardTitle>
                          <CardDescription className="text-yellow-100">
                            Gérer les informations légales et pratiques
                          </CardDescription>
                        </div>
                        <Button
                          onClick={addInfo}
                          className="bg-white text-yellow-600 hover:bg-yellow-50 font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Ajouter une information
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Titre de la section</label>
                        <Input
                          value={donateData.infoTitle}
                          onChange={(e) => updateDonateData({ infoTitle: e.target.value })}
                          placeholder="Titre de la section informations"
                          className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-full"
                        />
                      </div>
                      {donateData.infoContent.map((info, index) => (
                        <AnimatedCard key={index} delay={400 + index * 100}>
                          <Card className="border border-gray-200 shadow-md bg-white/90 hover:shadow-lg transition-all duration-300">
                            <CardContent className="pt-6">
                              <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                  <h3 className="font-medium text-yellow-600">Information {index + 1}</h3>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-300 rounded-full"
                                    onClick={() => removeInfo(index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="space-y-3">
                                  <label className="text-sm font-semibold text-gray-700">Titre</label>
                                  <Input
                                    value={info.title}
                                    onChange={(e) => updateInfo(index, "title", e.target.value)}
                                    placeholder="Titre de l'information"
                                    className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-full"
                                  />
                                </div>
                                <div className="space-y-3">
                                  <label className="text-sm font-semibold text-gray-700">Contenu</label>
                                  <Textarea
                                    value={info.content}
                                    onChange={(e) => updateInfo(index, "content", e.target.value)}
                                    placeholder="Contenu de l'information"
                                    rows={3}
                                    className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-xl"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </AnimatedCard>
                      ))}
                      {donateData.infoContent.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-gray-500 mb-4">Aucune information ajoutée</p>
                          <Button
                            onClick={addInfo}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Ajouter la première information
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </TabsContent>
            </Tabs>
          </AnimatedCard>
        </div>
      </section>

      {/* Section Actions rapides - Style identique à la section CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
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
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Donations</h3>
                  <p className="text-gray-600 mb-6">Gérer les donations</p>
                  <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-all duration-300">
                    Gérer
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Rapports</h3>
                  <p className="text-gray-600 mb-6">Voir les statistiques</p>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full transition-all duration-300">
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
