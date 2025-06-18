"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Upload, Save, Trash2, Eye, Settings, FileText, ImageIcon, Heart, Target } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface HomeData {
  hero: {
    id?: string
    title: string
    subtitle: string
    backgroundImage: string
  }
  vision: {
    id?: string
    title: string
    description: string
    mission: {
      id?: string
      title: string
      description: string
    }
    images: {
      id?: string
      top: string
      bottom: string
    }
  }
  valeurs: Array<{
    id?: string
    title: string
    description: string
    image: string
  }>
  homeGallery: Array<{
    id?: string
    title: string
    image: string
  }>
  projets: Array<{
    id?: string
    title: string
    subtitle: string
    description: string
    image: string
  }>
  cta: {
    id: string
    backgroundImage: string
    parrain: {
      id: string
      title: string
      description: string
      buttonText: string
    }
    don: {
      id: string
      title: string
      description: string
      buttonText: string
    }
  }
}

// Composant de carte animée (identique à index.tsx)
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

const defaultHomeData: HomeData = {
  hero: {
    title: "Lorem Ipsum Dolor\nSet Amer",
    subtitle: "Lorem ipsum Dolor Sit Amet",
    backgroundImage: "/images/hero-bg.jpg",
  },
  vision: {
    title: "Notre Vision",
    description:
      "Se positionner comme une référence nationale dans l'accompagnement et l'insertion des jeunes et femmes vulnérables au travers de programmes de protection, d'accompagnement et d'insertion dans la société.",
    mission: {
      title: "Notre Mission",
      description:
        "Protéger, accompagner et insérer les enfants, jeunes et femmes vulnérables afin de faire d'eux des modèles qui influencent positivement la société.",
    },
    images: {
      top: "/images/vision-1.jpg",
      bottom: "/images/vision-2.jpg",
    },
  },
  valeurs: [
    {
      title: "Amour",
      description:
        "Agir avec bienveillance et respect envers chaque enfant, jeune et femme vulnérable, en les impliquant dans des initiatives chaleureuses où ils se sentent accueillis et soutenus",
      image: "/images/valeur-1.jpg",
    },
    {
      title: "Engagement",
      description:
        "S'investir pleinement dans la protection, l'accompagnement et l'insertion des enfants, jeunes et femmes vulnérables, avec une détermination sans faille pour améliorer leur avenir.",
      image: "/images/valeur-2.jpg",
    },
    {
      title: "Transparence",
      description:
        "Assurer une gestion claire et honnête de toutes les ressources, actions et décisions prises, afin de garantir la confiance des partenaires, des bénéficiaires et de la communauté.",
      image: "/images/valeur-3.jpg",
    },
  ],
  homeGallery: [],
  projets: [
    {
      title: "Miracle de Noël",
      subtitle: "Un moment de joie pour les enfants vulnérables",
      description:
        "Chaque année, ce projet offre de beaux moments de joie aux enfants vulnérables en leur offrant des soins.",
      image: "/images/valeur-1.jpg",
    },
    {
      title: "La Rentrée Pour Tous",
      subtitle: "L'accès à l'éducation pour tous",
      description:
        "L'objectif de ce projet est de donner l'accès à l'éducation pour les enfants issus de milieux défavorisés.",
      image: "/images/valeur-2.jpg",
    },
    {
      title: "Instant de Bonheur",
      subtitle: "Des moments de joie pendant les fêtes",
      description:
        "Chaque année, pendant les fêtes de Pâques, ce projet contribue au divertissement et à l'épanouissement.",
      image: "/images/valeur-3.jpg",
    },
  ],
  cta: {
    id: "new",
    backgroundImage: "/images/cta.jpg",
    parrain: {
      id: "new",
      title: "Devenir parrain",
      description:
        "Devenez un atout clé de la vie d'un enfant vulnérable. En tant que parrain, vous offrez plus que du soutien financier.",
      buttonText: "S'INSCRIRE",
    },
    don: {
      id: "new",
      title: "Faire un don",
      description: "Chaque contribution nous permet d'agir concrètement pour aider plus d'enfants vulnérables.",
      buttonText: "FAIRE UN DON",
    },
  },
}

export default function HomePageAdmin() {
  const [homeData, setHomeData] = useState<HomeData>(defaultHomeData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/home")
        const result = await response.json()
        if (result.success) {
          const cta = result.data.cta || createDefaultCTA()
          setHomeData({
            hero: { ...defaultHomeData.hero, ...result.data.hero },
            vision: {
              ...defaultHomeData.vision,
              ...result.data.vision,
              mission: { ...defaultHomeData.vision.mission, ...result.data.vision?.mission },
              images: { ...defaultHomeData.vision.images, ...result.data.vision?.images },
            },
            valeurs: result.data.valeurs || defaultHomeData.valeurs,
            projets: result.data.projets || defaultHomeData.projets,
            homeGallery: result.data.homeGallery || defaultHomeData.homeGallery,
            cta: {
              id: cta.id,
              backgroundImage: cta.backgroundImage,
              parrain: {
                id: cta.parrain?.id || "new",
                title: cta.parrain?.title || "Devenir parrain",
                description: cta.parrain?.description || "Soutenez notre mission en devenant parrain",
                buttonText: cta.parrain?.buttonText || "S'INSCRIRE",
              },
              don: {
                id: cta.don?.id || "new",
                title: cta.don?.title || "Faire un don",
                description: cta.don?.description || "Chaque contribution nous permet d'agir concrètement",
                buttonText: cta.don?.buttonText || "FAIRE UN DON",
              },
            },
          })
        }
      } catch (error) {
        console.error("Error fetching home data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const updateHomeData = (newData: Partial<HomeData>) => {
    setHomeData((prev) => ({ ...prev, ...newData }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      logData(homeData, "Données à sauvegarder")

      // Validation des données du CTA
      if (!homeData.cta?.parrain?.title || !homeData.cta?.don?.title) {
        throw new Error("Les titres du CTA sont requis")
      }

      // Préparation des données pour l'API
      const dataToSend = {
        ...homeData,
        cta: {
          ...homeData.cta,
          parrain: {
            ...homeData.cta.parrain,
            id: homeData.cta.parrain.id === "new" ? undefined : homeData.cta.parrain.id,
          },
          don: {
            ...homeData.cta.don,
            id: homeData.cta.don.id === "new" ? undefined : homeData.cta.don.id,
          },
          id: homeData.cta.id === "new" ? undefined : homeData.cta.id,
        },
      }

      logData(dataToSend, "Données envoyées à l'API")

      const response = await fetch("/api/admin/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      })

      const result = await response.json()
      logData(result, "Réponse de l'API")

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de la sauvegarde")
      }

      // Mise à jour des données avec les nouveaux IDs
      if (result.success && result.data) {
        if (!result.data.cta) {
          console.warn("Aucune donnée CTA reçue de l'API")
        } else {
          const newCta = result.data.cta
          logData(newCta, "Nouvelles données CTA")

          setHomeData((prev) => ({
            ...prev,
            cta: {
              ...prev.cta,
              id: newCta.id || prev.cta.id,
              parrain: {
                ...prev.cta.parrain,
                id: newCta.parrain?.id || prev.cta.parrain.id,
              },
              don: {
                ...prev.cta.don,
                id: newCta.don?.id || prev.cta.don.id,
              },
            },
          }))
        }
      }

      setSuccess("Données sauvegardées avec succès !")
      setTimeout(() => setSuccess(null), 3000)
    } catch (error: any) {
      handleError(error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddValeur = () => {
    setHomeData((prev) => ({
      ...prev,
      valeurs: [
        ...prev.valeurs,
        {
          title: "",
          description: "",
          image: "/placeholder.jpg",
        },
      ],
    }))
  }

  const handleAddProjet = () => {
    setHomeData((prev) => ({
      ...prev,
      projets: [
        ...prev.projets,
        {
          title: "",
          subtitle: "",
          description: "",
          image: "/placeholder.jpg",
        },
      ],
    }))
  }

  const handleAddGalleryImage = () => {
    setHomeData((prev) => ({
      ...prev,
      homeGallery: [
        ...prev.homeGallery,
        {
          title: "Nouvelle image",
          image: "/images/placeholder.jpg",
        },
      ],
    }))
  }

  const handleDeleteValeur = (index: number) => {
    setHomeData((prev) => ({
      ...prev,
      valeurs: prev.valeurs.filter((_, i) => i !== index),
    }))
  }

  const handleDeleteProjet = (index: number) => {
    setHomeData((prev) => ({
      ...prev,
      projets: prev.projets.filter((_, i) => i !== index),
    }))
  }

  const handleDeleteGalleryImage = (index: number) => {
    setHomeData((prev) => ({
      ...prev,
      homeGallery: prev.homeGallery.filter((_, i) => i !== index),
    }))
  }

  const handleImageUpload = async (file: File, type: string, index?: number) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      // Ajouter l'URL de l'ancienne image
      let oldImageUrl = ""
      switch (type) {
        case "hero":
          oldImageUrl = homeData.hero.backgroundImage
          break
        case "vision-top":
          oldImageUrl = homeData.vision.images.top
          break
        case "vision-bottom":
          oldImageUrl = homeData.vision.images.bottom
          break
        case "valeur":
          if (typeof index === "number") {
            oldImageUrl = homeData.valeurs[index].image
          }
          break
        case "projet":
          if (typeof index === "number") {
            oldImageUrl = homeData.projets[index].image
          }
          break
        case "gallery":
          if (typeof index === "number") {
            oldImageUrl = homeData.homeGallery[index].image
          }
          break
        case "cta":
          oldImageUrl = homeData.cta.backgroundImage
          break
      }

      // Ne pas envoyer l'URL si c'est une image par défaut
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

      // Mettre à jour les données en fonction du type d'image
      switch (type) {
        case "hero":
          setHomeData((prev) => ({
            ...prev,
            hero: { ...prev.hero, backgroundImage: imageUrl },
          }))
          break
        case "vision-top":
          setHomeData((prev) => ({
            ...prev,
            vision: {
              ...prev.vision,
              images: { ...prev.vision.images, top: imageUrl },
            },
          }))
          break
        case "vision-bottom":
          setHomeData((prev) => ({
            ...prev,
            vision: {
              ...prev.vision,
              images: { ...prev.vision.images, bottom: imageUrl },
            },
          }))
          break
        case "valeur":
          if (typeof index === "number") {
            const newValeurs = [...homeData.valeurs]
            newValeurs[index] = { ...newValeurs[index], image: imageUrl }
            setHomeData((prev) => ({ ...prev, valeurs: newValeurs }))
          }
          break
        case "projet":
          if (typeof index === "number") {
            const newProjets = [...homeData.projets]
            newProjets[index] = { ...newProjets[index], image: imageUrl }
            setHomeData((prev) => ({ ...prev, projets: newProjets }))
          }
          break
        case "gallery":
          if (typeof index === "number") {
            const newGallery = [...homeData.homeGallery]
            newGallery[index] = { ...newGallery[index], image: imageUrl }
            setHomeData((prev) => ({ ...prev, homeGallery: newGallery }))
          }
          break
        case "cta":
          setHomeData((prev) => ({
            ...prev,
            cta: { ...prev.cta, backgroundImage: imageUrl },
          }))
          break
      }
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image:", error)
      setError("Erreur lors du téléchargement de l'image")
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: string, index?: number) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file, type, index)
    }
  }

  const createDefaultCTA = () => {
    return {
      id: "new",
      backgroundImage: "/images/default-cta.jpg",
      parrain: {
        id: "new",
        title: "Devenir parrain",
        description: "Soutenez notre mission en devenant parrain",
        buttonText: "Devenir parrain",
      },
      don: {
        id: "new",
        title: "Faire un don",
        description: "Aidez-nous à réaliser nos projets",
        buttonText: "Faire un don",
      },
    }
  }

  const handleError = (error: any) => {
    console.error("Détail de l'erreur:", error)
    let message = "Une erreur est survenue"

    if (error.message) {
      message = error.message
    } else if (typeof error === "string") {
      message = error
    }

    setError(`Erreur : ${message}`)
    setTimeout(() => setError(null), 5000)
  }

  const logData = (data: any, context: string) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[${context}]`, data)
    }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Alertes - Style identique à la section "Qui sommes-nous" */}
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

      {/* Section Onglets - Style identique à la section Valeurs clés */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">Gestion du Contenu</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <AnimatedCard delay={200}>
            <Tabs defaultValue="hero" className="space-y-8">
              <div className="flex justify-center">
                <TabsList className="grid grid-cols-6 bg-white shadow-lg border border-gray-200 rounded-full p-2 max-w-4xl">
                  <TabsTrigger
                    value="hero"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <Eye className="h-4 w-4" />
                    Hero
                  </TabsTrigger>
                  <TabsTrigger
                    value="vision"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <Target className="h-4 w-4" />
                    Vision
                  </TabsTrigger>
                  <TabsTrigger
                    value="valeurs"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <Heart className="h-4 w-4" />
                    Valeurs
                  </TabsTrigger>
                  <TabsTrigger
                    value="projets"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <Settings className="h-4 w-4" />
                    Projets
                  </TabsTrigger>
                  <TabsTrigger
                    value="gallery"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <ImageIcon className="h-4 w-4" />
                    Galerie
                  </TabsTrigger>
                  <TabsTrigger
                    value="cta"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <FileText className="h-4 w-4" />
                    CTA
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Section Hero */}
              <TabsContent value="hero">
                <AnimatedCard delay={300}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <CardTitle className="flex items-center gap-3">
                        <Eye className="h-5 w-5" />
                        Section Hero
                      </CardTitle>
                      <CardDescription className="text-blue-100">
                        Modifier le contenu de la section principale
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Titre principal</label>
                        <Input
                          value={homeData.hero.title}
                          onChange={(e) =>
                            updateHomeData({
                              hero: { ...homeData.hero, title: e.target.value },
                            })
                          }
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Sous-titre</label>
                        <Input
                          value={homeData.hero.subtitle}
                          onChange={(e) =>
                            updateHomeData({
                              hero: { ...homeData.hero, subtitle: e.target.value },
                            })
                          }
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Image de fond</label>
                        <div className="flex items-center gap-6">
                          <div className="relative h-40 w-60 rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                            <Image
                              src={homeData.hero.backgroundImage || "/placeholder.svg"}
                              alt="Hero background"
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageChange(e, "hero")}
                              className="hidden"
                              id="hero-image"
                            />
                            <Button
                              variant="outline"
                              className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 rounded-full"
                              onClick={() => document.getElementById("hero-image")?.click()}
                            >
                              <Upload className="h-4 w-4" />
                              Changer l'image
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </TabsContent>

              {/* Section Vision & Mission */}
              <TabsContent value="vision">
                <AnimatedCard delay={300}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                      <CardTitle className="flex items-center gap-3">
                        <Target className="h-5 w-5" />
                        Vision & Mission
                      </CardTitle>
                      <CardDescription className="text-green-100">
                        Modifier le contenu de la section Vision et Mission
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Titre de la section</label>
                        <Input
                          value={homeData.vision.title}
                          onChange={(e) =>
                            updateHomeData({
                              vision: { ...homeData.vision, title: e.target.value },
                            })
                          }
                          className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Description</label>
                        <Textarea
                          value={homeData.vision.description}
                          onChange={(e) =>
                            updateHomeData({
                              vision: { ...homeData.vision, description: e.target.value },
                            })
                          }
                          rows={4}
                          className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Titre de la mission</label>
                        <Input
                          value={homeData.vision.mission.title}
                          onChange={(e) =>
                            updateHomeData({
                              vision: {
                                ...homeData.vision,
                                mission: { ...homeData.vision.mission, title: e.target.value },
                              },
                            })
                          }
                          className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Description de la mission</label>
                        <Textarea
                          value={homeData.vision.mission.description}
                          onChange={(e) =>
                            updateHomeData({
                              vision: {
                                ...homeData.vision,
                                mission: { ...homeData.vision.mission, description: e.target.value },
                              },
                            })
                          }
                          rows={4}
                          className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-gray-700">Image supérieure</label>
                          <div className="flex flex-col gap-4">
                            <div className="relative h-40 w-full rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                              <Image
                                src={homeData.vision.images.top || "/placeholder.svg"}
                                alt="Vision top"
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                            <div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, "vision-top")}
                                className="hidden"
                                id="vision-top-image"
                              />
                              <Button
                                variant="outline"
                                className="flex items-center gap-2 w-full hover:bg-green-50 hover:border-green-500 hover:text-green-500 transition-all duration-300 rounded-full"
                                onClick={() => document.getElementById("vision-top-image")?.click()}
                              >
                                <Upload className="h-4 w-4" />
                                Changer l'image
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-gray-700">Image inférieure</label>
                          <div className="flex flex-col gap-4">
                            <div className="relative h-40 w-full rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                              <Image
                                src={homeData.vision.images.bottom || "/placeholder.svg"}
                                alt="Vision bottom"
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                            <div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, "vision-bottom")}
                                className="hidden"
                                id="vision-bottom-image"
                              />
                              <Button
                                variant="outline"
                                className="flex items-center gap-2 w-full hover:bg-green-50 hover:border-green-500 hover:text-green-500 transition-all duration-300 rounded-full"
                                onClick={() => document.getElementById("vision-bottom-image")?.click()}
                              >
                                <Upload className="h-4 w-4" />
                                Changer l'image
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </TabsContent>

              {/* Section Valeurs */}
              <TabsContent value="valeurs">
                <AnimatedCard delay={300}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            <Heart className="h-5 w-5" />
                            Nos Valeurs
                          </CardTitle>
                          <CardDescription className="text-yellow-100">
                            Gérer les valeurs de l'organisation
                          </CardDescription>
                        </div>
                        <Button
                          onClick={handleAddValeur}
                          className="bg-white text-yellow-600 hover:bg-yellow-50 font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Ajouter une valeur
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      {homeData.valeurs.map((valeur, index) => (
                        <AnimatedCard key={index} delay={400 + index * 100}>
                          <Card className="border border-gray-200 shadow-md bg-white/90 hover:shadow-lg transition-all duration-300">
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-start mb-4">
                                <div className="space-y-4 flex-1 mr-4">
                                  <Input
                                    value={valeur.title}
                                    onChange={(e) => {
                                      const newValeurs = [...homeData.valeurs]
                                      newValeurs[index].title = e.target.value
                                      updateHomeData({ valeurs: newValeurs })
                                    }}
                                    placeholder="Titre de la valeur"
                                    className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-full"
                                  />
                                  <Textarea
                                    value={valeur.description}
                                    onChange={(e) => {
                                      const newValeurs = [...homeData.valeurs]
                                      newValeurs[index].description = e.target.value
                                      updateHomeData({ valeurs: newValeurs })
                                    }}
                                    placeholder="Description de la valeur"
                                    rows={3}
                                    className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-xl"
                                  />
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-300 rounded-full"
                                  onClick={() => handleDeleteValeur(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex items-center gap-6">
                                <div className="relative h-32 w-48 rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                                  <Image
                                    src={valeur.image || "/placeholder.svg"}
                                    alt={valeur.title}
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                  />
                                </div>
                                <div>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, "valeur", index)}
                                    className="hidden"
                                    id={`valeur-image-${index}`}
                                  />
                                  <Button
                                    variant="outline"
                                    className="flex items-center gap-2 hover:bg-yellow-50 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300 rounded-full"
                                    onClick={() => document.getElementById(`valeur-image-${index}`)?.click()}
                                  >
                                    <Upload className="h-4 w-4" />
                                    Changer l'image
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </AnimatedCard>
                      ))}
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </TabsContent>

              {/* Section Projets */}
              <TabsContent value="projets">
                <AnimatedCard delay={300}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            <Settings className="h-5 w-5" />
                            Nos Projets
                          </CardTitle>
                          <CardDescription className="text-blue-100">
                            Gérer les projets de l'organisation
                          </CardDescription>
                        </div>
                        <Button
                          onClick={handleAddProjet}
                          className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Ajouter un projet
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      {homeData.projets.map((projet, index) => (
                        <AnimatedCard key={index} delay={400 + index * 100}>
                          <Card className="border border-gray-200 shadow-md bg-white/90 hover:shadow-lg transition-all duration-300">
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-start mb-4">
                                <div className="space-y-4 flex-1 mr-4">
                                  <Input
                                    value={projet.title}
                                    onChange={(e) => {
                                      const newProjets = [...homeData.projets]
                                      newProjets[index].title = e.target.value
                                      updateHomeData({ projets: newProjets })
                                    }}
                                    placeholder="Titre du projet"
                                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full"
                                  />
                                  <Input
                                    value={projet.subtitle}
                                    onChange={(e) => {
                                      const newProjets = [...homeData.projets]
                                      newProjets[index].subtitle = e.target.value
                                      updateHomeData({ projets: newProjets })
                                    }}
                                    placeholder="Sous-titre du projet"
                                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full"
                                  />
                                  <Textarea
                                    value={projet.description}
                                    onChange={(e) => {
                                      const newProjets = [...homeData.projets]
                                      newProjets[index].description = e.target.value
                                      updateHomeData({ projets: newProjets })
                                    }}
                                    placeholder="Description du projet"
                                    rows={3}
                                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                                  />
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-300 rounded-full"
                                  onClick={() => handleDeleteProjet(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex items-center gap-6">
                                <div className="relative h-32 w-48 rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                                  <Image
                                    src={projet.image || "/placeholder.svg"}
                                    alt={projet.title}
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                  />
                                </div>
                                <div>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, "projet", index)}
                                    className="hidden"
                                    id={`projet-image-${index}`}
                                  />
                                  <Button
                                    variant="outline"
                                    className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 rounded-full"
                                    onClick={() => document.getElementById(`projet-image-${index}`)?.click()}
                                  >
                                    <Upload className="h-4 w-4" />
                                    Changer l'image
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </AnimatedCard>
                      ))}
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </TabsContent>

              {/* Section Gallery */}
              <TabsContent value="gallery">
                <AnimatedCard delay={300}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            <ImageIcon className="h-5 w-5" />
                            Galerie Photos
                          </CardTitle>
                          <CardDescription className="text-green-100">Gérer les photos de la galerie</CardDescription>
                        </div>
                        <Button
                          onClick={handleAddGalleryImage}
                          className="bg-white text-green-600 hover:bg-green-50 font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Ajouter une photo
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {homeData.homeGallery.map((item, index) => (
                          <AnimatedCard key={index} delay={400 + index * 100}>
                            <Card className="border border-gray-200 shadow-md bg-white/90 hover:shadow-lg transition-all duration-300">
                              <CardContent className="pt-6">
                                <div className="flex justify-between items-start mb-4">
                                  <div className="space-y-3 flex-1 mr-4">
                                    <Input
                                      value={item.title}
                                      onChange={(e) => {
                                        const newGallery = [...homeData.homeGallery]
                                        newGallery[index].title = e.target.value
                                        updateHomeData({ homeGallery: newGallery })
                                      }}
                                      placeholder="Titre de la photo"
                                      className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full"
                                    />
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-300 rounded-full"
                                    onClick={() => handleDeleteGalleryImage(index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="space-y-4">
                                  <div className="relative h-40 w-full rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                                    <Image
                                      src={item.image || "/images/placeholder.jpg"}
                                      alt={item.title}
                                      fill
                                      className="object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                  </div>
                                  <div>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleImageChange(e, "gallery", index)}
                                      className="hidden"
                                      id={`gallery-image-${index}`}
                                    />
                                    <Button
                                      variant="outline"
                                      className="flex items-center gap-2 w-full hover:bg-green-50 hover:border-green-500 hover:text-green-500 transition-all duration-300 rounded-full"
                                      onClick={() => document.getElementById(`gallery-image-${index}`)?.click()}
                                    >
                                      <Upload className="h-4 w-4" />
                                      Changer l'image
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </AnimatedCard>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </TabsContent>

              {/* Section CTA */}
              <TabsContent value="cta">
                <AnimatedCard delay={300}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                      <CardTitle className="flex items-center gap-3">
                        <FileText className="h-5 w-5" />
                        Call to Action
                      </CardTitle>
                      <CardDescription className="text-yellow-100">
                        Modifier le contenu des sections d'appel à l'action
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Section Parrain */}
                        <div className="space-y-4 p-6 bg-blue-50 rounded-3xl border border-blue-200">
                          <h3 className="font-semibold text-lg text-blue-500 flex items-center gap-2">
                            <Heart className="h-5 w-5" />
                            Devenir parrain
                          </h3>
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Titre</label>
                            <Input
                              value={homeData.cta.parrain.title}
                              onChange={(e) =>
                                updateHomeData({
                                  cta: {
                                    ...homeData.cta,
                                    parrain: { ...homeData.cta.parrain, title: e.target.value },
                                  },
                                })
                              }
                              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Description</label>
                            <Textarea
                              value={homeData.cta.parrain.description}
                              onChange={(e) =>
                                updateHomeData({
                                  cta: {
                                    ...homeData.cta,
                                    parrain: { ...homeData.cta.parrain, description: e.target.value },
                                  },
                                })
                              }
                              rows={3}
                              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Texte du bouton</label>
                            <Input
                              value={homeData.cta.parrain.buttonText}
                              onChange={(e) =>
                                updateHomeData({
                                  cta: {
                                    ...homeData.cta,
                                    parrain: { ...homeData.cta.parrain, buttonText: e.target.value },
                                  },
                                })
                              }
                              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full"
                            />
                          </div>
                        </div>

                        {/* Section Don */}
                        <div className="space-y-4 p-6 bg-green-50 rounded-3xl border border-green-200">
                          <h3 className="font-semibold text-lg text-green-500 flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Faire un don
                          </h3>
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Titre</label>
                            <Input
                              value={homeData.cta.don.title}
                              onChange={(e) =>
                                updateHomeData({
                                  cta: {
                                    ...homeData.cta,
                                    don: { ...homeData.cta.don, title: e.target.value },
                                  },
                                })
                              }
                              className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Description</label>
                            <Textarea
                              value={homeData.cta.don.description}
                              onChange={(e) =>
                                updateHomeData({
                                  cta: {
                                    ...homeData.cta,
                                    don: { ...homeData.cta.don, description: e.target.value },
                                  },
                                })
                              }
                              rows={3}
                              className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Texte du bouton</label>
                            <Input
                              value={homeData.cta.don.buttonText}
                              onChange={(e) =>
                                updateHomeData({
                                  cta: {
                                    ...homeData.cta,
                                    don: { ...homeData.cta.don, buttonText: e.target.value },
                                  },
                                })
                              }
                              className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Image de fond</label>
                        <div className="flex items-center gap-6">
                          <div className="relative h-40 w-60 rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                            <Image
                              src={homeData.cta.backgroundImage || "/placeholder.svg"}
                              alt="CTA background"
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageChange(e, "cta")}
                              className="hidden"
                              id="cta-image"
                            />
                            <Button
                              variant="outline"
                              className="flex items-center gap-2 hover:bg-yellow-50 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300 rounded-full"
                              onClick={() => document.getElementById("cta-image")?.click()}
                            >
                              <Upload className="h-4 w-4" />
                              Changer l'image
                            </Button>
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
      </div>
    </main>
  )
}
