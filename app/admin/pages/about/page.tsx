"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Upload, Save, Trash2, Eye, FileText, Users, Building, MessageSquare, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TeamMember {
  id?: string
  name: string
  role: string
  description: string
  image: string
}

interface Partner {
  id?: string
  name: string
  logo: string
  website?: string
}

interface Testimonial {
  id?: string
  name: string
  content: string
  role: string
  published: boolean
}

interface AboutData {
  id?: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  historyTitle: string
  historyContent: string
  historyImage: string
  teamTitle: string
  teamSubtitle: string
  members: TeamMember[]
  partnersTitle: string
  partnersSubtitle: string
  partners: Partner[]
  testimonials: Testimonial[]
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

const defaultAboutData: AboutData = {
  heroTitle: "Qui sommes – nous ?",
  heroSubtitle: "Historique et expériences de l'ONG",
  heroImage: "/about/founder.jpg",
  historyTitle: "Notre Histoire",
  historyContent:
    "L'ONG MCC, initialement connue sous le nom de GBEMENOU Charity, est née d'une histoire de résilience, d'injustice sociale et d'un profond désir de transformation.\n\nSon fondateur, GBEMENOU Drice Aurel, a vécu une enfance marquée par la précarité et l'abandon. Après avoir perdu son père en 2006, puis sa mère en 2012, seulement trois jours après sa proclamation et ses résultats au BEPC, il a connu l'orphelinat, puis la rue. Placé en internat par un oncle, il a dû, en cache sous l'aumônerie scolaire, lutter ici et là pour survivre, réaliser ses projets et enfin soutenir d'autres enfants.",
  historyImage: "/about/founder.jpg",
  teamTitle: "L'équipe",
  teamSubtitle:
    "Derrière chaque action de MCC se trouvent des femmes et des hommes passionnés, engagés et profondément convaincus de la nécessité d'agir pour améliorer le sort des enfants vulnérables.",
  members: [
    {
      name: "Aurel GBEMENOU",
      role: "Directeur Exécutif de MCC",
      description:
        "Spécialiste en formalisation et impact social des ONG, coaching et accompagnement, structuration et reconnaissance légale.",
      image: "/about/founder.jpg",
    },
    {
      name: "Estelle DEHA",
      role: "Chargée de Programme 2 MCC",
      description: "Informaticienne de gestion de formation, développement informatique et pilotage de projet.",
      image: "/about/estelle.jpg",
    },
    {
      name: "Sapience LAOUROU",
      role: "Responsable Suivi Évaluation",
      description: "Expert en monitoring de projet, analyse des politiques publiques, genre et inclusion.",
      image: "/about/sapience.jpg",
    },
  ],
  partnersTitle: "Nos Partenaires",
  partnersSubtitle: "Ils nous font confiance",
  partners: [],
  testimonials: [
    {
      name: "DOSSOU Bertin",
      role: "Parrain",
      content:
        '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique in pellentesque ultrices et massa neque, convallis lorem."',
      published: true,
    },
    {
      name: "AGOSSOU Jonathan",
      role: "Enfant",
      content:
        '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique in pellentesque ultrices et massa neque, convallis lorem."',
      published: true,
    },
  ],
}

export default function AboutPageAdmin() {
  const [aboutData, setAboutData] = useState<AboutData>(defaultAboutData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/about")
        const result = await response.json()
        if (result.success) {
          setAboutData({ ...defaultAboutData, ...result.data })
        }
      } catch (error) {
        console.error("Error fetching about data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const updateAboutData = (newData: Partial<AboutData>) => {
    setAboutData((prev) => ({ ...prev, ...newData }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aboutData),
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

  const handleImageUpload = async (file: File, type: string, index?: number) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      // Ajouter l'URL de l'ancienne image
      let oldImageUrl = ""
      switch (type) {
        case "hero":
          oldImageUrl = aboutData.heroImage
          break
        case "history":
          oldImageUrl = aboutData.historyImage
          break
        case "member":
          if (typeof index === "number") {
            oldImageUrl = aboutData.members[index].image
          }
          break
        case "partner":
          if (typeof index === "number") {
            oldImageUrl = aboutData.partners[index].logo
          }
          break
      }

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
          updateAboutData({ heroImage: imageUrl })
          break
        case "history":
          updateAboutData({ historyImage: imageUrl })
          break
        case "member":
          if (typeof index === "number") {
            const newMembers = [...aboutData.members]
            newMembers[index] = { ...newMembers[index], image: imageUrl }
            updateAboutData({ members: newMembers })
          }
          break
        case "partner":
          if (typeof index === "number") {
            const newPartners = [...aboutData.partners]
            newPartners[index] = { ...newPartners[index], logo: imageUrl }
            updateAboutData({ partners: newPartners })
          }
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

  const handleAddMember = () => {
    updateAboutData({
      members: [
        ...aboutData.members,
        {
          name: "",
          role: "",
          description: "",
          image: "/placeholder.jpg",
        },
      ],
    })
  }

  const handleAddPartner = () => {
    updateAboutData({
      partners: [
        ...aboutData.partners,
        {
          name: "",
          logo: "/placeholder.jpg",
          website: "",
        },
      ],
    })
  }

  const handleAddTestimonial = () => {
    updateAboutData({
      testimonials: [
        ...aboutData.testimonials,
        {
          name: "",
          content: "",
          role: "",
          published: false,
        },
      ],
    })
  }

  const handleDeleteMember = (index: number) => {
    updateAboutData({
      members: aboutData.members.filter((_, i) => i !== index),
    })
  }

  const handleDeletePartner = (index: number) => {
    updateAboutData({
      partners: aboutData.partners.filter((_, i) => i !== index),
    })
  }

  const handleDeleteTestimonial = (index: number) => {
    updateAboutData({
      testimonials: aboutData.testimonials.filter((_, i) => i !== index),
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

      {/* Section Onglets */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">Gestion du Contenu À propos</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <AnimatedCard delay={200}>
            <Tabs defaultValue="hero" className="space-y-8">
              <div className="flex justify-center">
                <TabsList className="grid grid-cols-5 bg-white shadow-lg border border-gray-200 rounded-full p-2 max-w-4xl">
                  <TabsTrigger
                    value="hero"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <Eye className="h-4 w-4" />
                    Hero
                  </TabsTrigger>
                  <TabsTrigger
                    value="history"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <FileText className="h-4 w-4" />
                    Histoire
                  </TabsTrigger>
                  <TabsTrigger
                    value="team"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <Users className="h-4 w-4" />
                    Équipe
                  </TabsTrigger>
                  <TabsTrigger
                    value="partners"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <Building className="h-4 w-4" />
                    Partenaires
                  </TabsTrigger>
                  <TabsTrigger
                    value="testimonials"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Témoignages
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
                          value={aboutData.heroTitle}
                          onChange={(e) => updateAboutData({ heroTitle: e.target.value })}
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Sous-titre</label>
                        <Input
                          value={aboutData.heroSubtitle}
                          onChange={(e) => updateAboutData({ heroSubtitle: e.target.value })}
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Image de fond</label>
                        <div className="flex items-center gap-6">
                          <div className="relative h-40 w-60 rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                            <Image
                              src={aboutData.heroImage || "/placeholder.svg"}
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

              {/* Section Histoire */}
              <TabsContent value="history">
                <AnimatedCard delay={300}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                      <CardTitle className="flex items-center gap-3">
                        <FileText className="h-5 w-5" />
                        Notre Histoire
                      </CardTitle>
                      <CardDescription className="text-green-100">
                        Modifier le contenu de la section Notre Histoire
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Titre</label>
                        <Input
                          value={aboutData.historyTitle}
                          onChange={(e) => updateAboutData({ historyTitle: e.target.value })}
                          className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Contenu</label>
                        <Textarea
                          value={aboutData.historyContent}
                          onChange={(e) => updateAboutData({ historyContent: e.target.value })}
                          rows={8}
                          className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Image</label>
                        <div className="flex items-center gap-6">
                          <div className="relative h-40 w-60 rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                            <Image
                              src={aboutData.historyImage || "/placeholder.svg"}
                              alt="History image"
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageChange(e, "history")}
                              className="hidden"
                              id="history-image"
                            />
                            <Button
                              variant="outline"
                              className="flex items-center gap-2 hover:bg-green-50 hover:border-green-500 hover:text-green-500 transition-all duration-300 rounded-full"
                              onClick={() => document.getElementById("history-image")?.click()}
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

              {/* Section Équipe */}
              <TabsContent value="team">
                <AnimatedCard delay={300}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            <Users className="h-5 w-5" />
                            Notre Équipe
                          </CardTitle>
                          <CardDescription className="text-yellow-100">Gérer les membres de l'équipe</CardDescription>
                        </div>
                        <Button
                          onClick={handleAddMember}
                          className="bg-white text-yellow-600 hover:bg-yellow-50 font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Ajouter un membre
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Titre de la section</label>
                        <Input
                          value={aboutData.teamTitle}
                          onChange={(e) => updateAboutData({ teamTitle: e.target.value })}
                          className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Sous-titre</label>
                        <Textarea
                          value={aboutData.teamSubtitle}
                          onChange={(e) => updateAboutData({ teamSubtitle: e.target.value })}
                          rows={3}
                          className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-xl"
                        />
                      </div>
                      {aboutData.members.map((member, index) => (
                        <AnimatedCard key={index} delay={400 + index * 100}>
                          <Card className="border border-gray-200 shadow-md bg-white/90 hover:shadow-lg transition-all duration-300">
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-start mb-4">
                                <div className="space-y-4 flex-1 mr-4">
                                  <Input
                                    value={member.name}
                                    onChange={(e) => {
                                      const newMembers = [...aboutData.members]
                                      newMembers[index].name = e.target.value
                                      updateAboutData({ members: newMembers })
                                    }}
                                    placeholder="Nom du membre"
                                    className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-full"
                                  />
                                  <Input
                                    value={member.role}
                                    onChange={(e) => {
                                      const newMembers = [...aboutData.members]
                                      newMembers[index].role = e.target.value
                                      updateAboutData({ members: newMembers })
                                    }}
                                    placeholder="Rôle"
                                    className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-full"
                                  />
                                  <Textarea
                                    value={member.description}
                                    onChange={(e) => {
                                      const newMembers = [...aboutData.members]
                                      newMembers[index].description = e.target.value
                                      updateAboutData({ members: newMembers })
                                    }}
                                    placeholder="Description"
                                    rows={3}
                                    className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-xl"
                                  />
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-300 rounded-full"
                                  onClick={() => handleDeleteMember(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex items-center gap-6">
                                <div className="relative h-32 w-48 rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                                  <Image
                                    src={member.image || "/placeholder.svg"}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                  />
                                </div>
                                <div>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, "member", index)}
                                    className="hidden"
                                    id={`member-image-${index}`}
                                  />
                                  <Button
                                    variant="outline"
                                    className="flex items-center gap-2 hover:bg-yellow-50 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300 rounded-full"
                                    onClick={() => document.getElementById(`member-image-${index}`)?.click()}
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

              {/* Section Partenaires */}
              <TabsContent value="partners">
                <AnimatedCard delay={300}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            <Building className="h-5 w-5" />
                            Nos Partenaires
                          </CardTitle>
                          <CardDescription className="text-blue-100">Gérer les partenaires</CardDescription>
                        </div>
                        <Button
                          onClick={handleAddPartner}
                          className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Ajouter un partenaire
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Titre de la section</label>
                        <Input
                          value={aboutData.partnersTitle}
                          onChange={(e) => updateAboutData({ partnersTitle: e.target.value })}
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Sous-titre</label>
                        <Input
                          value={aboutData.partnersSubtitle}
                          onChange={(e) => updateAboutData({ partnersSubtitle: e.target.value })}
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full"
                        />
                      </div>
                      {aboutData.partners.map((partner, index) => (
                        <AnimatedCard key={index} delay={400 + index * 100}>
                          <Card className="border border-gray-200 shadow-md bg-white/90 hover:shadow-lg transition-all duration-300">
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-start mb-4">
                                <div className="space-y-4 flex-1 mr-4">
                                  <Input
                                    value={partner.name}
                                    onChange={(e) => {
                                      const newPartners = [...aboutData.partners]
                                      newPartners[index].name = e.target.value
                                      updateAboutData({ partners: newPartners })
                                    }}
                                    placeholder="Nom du partenaire"
                                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full"
                                  />
                                  <Input
                                    value={partner.website}
                                    onChange={(e) => {
                                      const newPartners = [...aboutData.partners]
                                      newPartners[index].website = e.target.value
                                      updateAboutData({ partners: newPartners })
                                    }}
                                    placeholder="Site web (optionnel)"
                                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full"
                                  />
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-300 rounded-full"
                                  onClick={() => handleDeletePartner(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex items-center gap-6">
                                <div className="relative h-32 w-48 rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                                  <Image
                                    src={partner.logo || "/placeholder.svg"}
                                    alt={partner.name}
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                  />
                                </div>
                                <div>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, "partner", index)}
                                    className="hidden"
                                    id={`partner-image-${index}`}
                                  />
                                  <Button
                                    variant="outline"
                                    className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 rounded-full"
                                    onClick={() => document.getElementById(`partner-image-${index}`)?.click()}
                                  >
                                    <Upload className="h-4 w-4" />
                                    Changer le logo
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

              {/* Section Témoignages */}
              <TabsContent value="testimonials">
                <AnimatedCard delay={300}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            <MessageSquare className="h-5 w-5" />
                            Témoignages
                          </CardTitle>
                          <CardDescription className="text-green-100">
                            Gérer les témoignages des clients et partenaires
                          </CardDescription>
                        </div>
                        <Button
                          onClick={handleAddTestimonial}
                          className="bg-white text-green-600 hover:bg-green-50 font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Ajouter un témoignage
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      {aboutData.testimonials.map((testimonial, index) => (
                        <AnimatedCard key={index} delay={400 + index * 100}>
                          <Card className="border border-gray-200 shadow-md bg-white/90 hover:shadow-lg transition-all duration-300">
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-start mb-4">
                                <div className="space-y-4 flex-1 mr-4">
                                  <Input
                                    value={testimonial.name}
                                    onChange={(e) => {
                                      const newTestimonials = [...aboutData.testimonials]
                                      newTestimonials[index].name = e.target.value
                                      updateAboutData({ testimonials: newTestimonials })
                                    }}
                                    placeholder="Nom de la personne"
                                    className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full"
                                  />
                                  <Input
                                    value={testimonial.role}
                                    onChange={(e) => {
                                      const newTestimonials = [...aboutData.testimonials]
                                      newTestimonials[index].role = e.target.value
                                      updateAboutData({ testimonials: newTestimonials })
                                    }}
                                    placeholder="Rôle / Fonction"
                                    className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full"
                                  />
                                  <Textarea
                                    value={testimonial.content}
                                    onChange={(e) => {
                                      const newTestimonials = [...aboutData.testimonials]
                                      newTestimonials[index].content = e.target.value
                                      updateAboutData({ testimonials: newTestimonials })
                                    }}
                                    placeholder="Témoignage"
                                    rows={3}
                                    className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                                  />
                                  <div className="flex items-center space-x-3 p-3 bg-green-50/50 rounded-lg border border-green-200">
                                    <input
                                      type="checkbox"
                                      id={`published-${index}`}
                                      checked={testimonial.published}
                                      onChange={(e) => {
                                        const newTestimonials = [...aboutData.testimonials]
                                        newTestimonials[index].published = e.target.checked
                                        updateAboutData({ testimonials: newTestimonials })
                                      }}
                                      className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                                    />
                                    <label
                                      htmlFor={`published-${index}`}
                                      className="text-sm font-medium flex items-center gap-2"
                                    >
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                      Publié sur le site
                                    </label>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-300 rounded-full"
                                  onClick={() => handleDeleteTestimonial(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </AnimatedCard>
                      ))}
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </TabsContent>
            </Tabs>
          </AnimatedCard>
        </div>
      </section>
    </main>
  )
}
