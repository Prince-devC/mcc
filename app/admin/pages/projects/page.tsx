"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Upload, Save, Trash2, Settings, Calendar, MapPin, Target, Users, CheckCircle, Eye } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Project {
  id?: string
  title: string
  subtitle: string
  description: string
  image: string
  category: string
  status: string
  startDate: string
  endDate?: string
  location: string
  budget?: number
  objectives: string
  results: string
  partners: string
  published: boolean
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

const defaultProjects: Project[] = [
  {
    title: "Centre d'accueil pour enfants vulnérables",
    subtitle: "Construction d'un centre d'accueil pour les enfants en situation difficile",
    description:
      "Ce projet vise à construire un centre d'accueil moderne et adapté pour les enfants vulnérables. Le centre comprendra des dortoirs, des salles de classe, une infirmerie et des espaces de loisirs.",
    image: "/projects/center.jpg",
    category: "Infrastructure",
    status: "en cours",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    location: "Cotonou, Bénin",
    budget: 500000000,
    objectives:
      "- Accueillir 100 enfants vulnérables\n- Fournir un environnement sûr et éducatif\n- Offrir des services de santé de base\n- Promouvoir l'éducation et le développement personnel",
    results: "En cours de réalisation",
    partners: "Ministère de la Famille\nONG Partenaires\nEntreprises locales",
    published: true,
  },
  {
    title: "Programme d'éducation et de formation",
    subtitle: "Formation professionnelle pour les jeunes défavorisés",
    description:
      "Ce programme offre des formations professionnelles aux jeunes défavorisés dans divers domaines comme l'informatique, la couture, la mécanique et l'agriculture.",
    image: "/projects/education.jpg",
    category: "Éducation",
    status: "en cours",
    startDate: "2024-03-01",
    location: "Porto-Novo, Bénin",
    budget: 250000000,
    objectives:
      "- Former 50 jeunes par an\n- Assurer l'insertion professionnelle\n- Développer des compétences pratiques\n- Promouvoir l'entrepreneuriat",
    results: "En cours de réalisation",
    partners: "Ministère de l'Éducation\nCentres de formation\nEntreprises partenaires",
    published: true,
  },
]

export default function ProjectsPageAdmin() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/projects")
        const result = await response.json()
        if (result.success) {
          setProjects(result.data || defaultProjects)
        }
      } catch (error) {
        console.error("Error fetching projects data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const updateProjects = (newProjects: Project[]) => {
    setProjects(newProjects)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projects),
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

  const handleImageUpload = async (file: File, index: number) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const oldImageUrl = projects[index].image
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

      const newProjects = [...projects]
      newProjects[index] = { ...newProjects[index], image: imageUrl }
      updateProjects(newProjects)
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image:", error)
      setError("Erreur lors du téléchargement de l'image")
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file, index)
    }
  }

  const handleAddProject = () => {
    updateProjects([
      ...projects,
      {
        title: "",
        subtitle: "",
        description: "",
        image: "/placeholder.jpg",
        category: "",
        status: "en cours",
        startDate: new Date().toISOString().split("T")[0],
        location: "",
        objectives: "",
        results: "",
        partners: "",
        published: false,
      },
    ])
  }

  const handleDeleteProject = (index: number) => {
    updateProjects(projects.filter((_, i) => i !== index))
  }

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const newProjects = [...projects]
    newProjects[index] = { ...newProjects[index], [field]: value }
    updateProjects(newProjects)
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
      <div className="flex justify-end p-4 gap-4">
        <Button
          onClick={handleAddProject}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-full text-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouveau projet
        </Button>
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

      {/* Section Projets */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">Gestion des Projets</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">
              {projects.length} projet{projects.length > 1 ? "s" : ""} au total
            </p>
          </div>

          {projects.length === 0 ? (
            <AnimatedCard delay={200}>
              <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto">
                      <Settings className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Aucun projet</h3>
                    <p className="text-gray-600 max-w-md">
                      Commencez par ajouter votre premier projet pour organiser et présenter vos initiatives.
                    </p>
                    <Button
                      onClick={handleAddProject}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    >
                      <Plus className="h-5 w-5" />
                      Créer le premier projet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          ) : (
            <div className="space-y-8">
              {projects.map((project, index) => (
                <AnimatedCard key={index} delay={300 + index * 100}>
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            <Settings className="h-5 w-5" />
                            Projet {index + 1}
                          </CardTitle>
                          <CardDescription className="text-blue-100">
                            {project.title || "Nouveau projet"}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:text-red-200 hover:bg-red-500/20 transition-all duration-300 rounded-full"
                          onClick={() => handleDeleteProject(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8">
                      <Tabs defaultValue="general" className="space-y-6">
                        <TabsList className="grid grid-cols-4 bg-white shadow-lg border border-gray-200 rounded-full p-2">
                          <TabsTrigger
                            value="general"
                            className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                          >
                            <Eye className="h-4 w-4" />
                            Général
                          </TabsTrigger>
                          <TabsTrigger
                            value="details"
                            className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                          >
                            <Calendar className="h-4 w-4" />
                            Détails
                          </TabsTrigger>
                          <TabsTrigger
                            value="content"
                            className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                          >
                            <Target className="h-4 w-4" />
                            Contenu
                          </TabsTrigger>
                          <TabsTrigger
                            value="settings"
                            className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full transition-all duration-300"
                          >
                            <Settings className="h-4 w-4" />
                            Paramètres
                          </TabsTrigger>
                        </TabsList>

                        {/* Onglet Général */}
                        <TabsContent value="general">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700">Titre du projet</label>
                                <Input
                                  value={project.title}
                                  onChange={(e) => updateProject(index, "title", e.target.value)}
                                  placeholder="Titre du projet"
                                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full"
                                />
                              </div>
                              <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700">Sous-titre</label>
                                <Input
                                  value={project.subtitle}
                                  onChange={(e) => updateProject(index, "subtitle", e.target.value)}
                                  placeholder="Sous-titre"
                                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full"
                                />
                              </div>
                              <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700">Description</label>
                                <Textarea
                                  value={project.description}
                                  onChange={(e) => updateProject(index, "description", e.target.value)}
                                  placeholder="Description du projet"
                                  rows={4}
                                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                                />
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700">Image du projet</label>
                                <div className="space-y-4">
                                  <div className="relative h-48 w-full rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                                    <Image
                                      src={project.image || "/placeholder.svg"}
                                      alt={project.title}
                                      fill
                                      className="object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                  </div>
                                  <div>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleImageChange(e, index)}
                                      className="hidden"
                                      id={`project-image-${index}`}
                                    />
                                    <Button
                                      variant="outline"
                                      className="flex items-center gap-2 w-full hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 rounded-full"
                                      onClick={() => document.getElementById(`project-image-${index}`)?.click()}
                                    >
                                      <Upload className="h-4 w-4" />
                                      Changer l'image
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        {/* Onglet Détails */}
                        <TabsContent value="details">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700">Catégorie</label>
                                <Input
                                  value={project.category}
                                  onChange={(e) => updateProject(index, "category", e.target.value)}
                                  placeholder="Catégorie du projet"
                                  className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full"
                                />
                              </div>
                              <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700">Statut</label>
                                <Input
                                  value={project.status}
                                  onChange={(e) => updateProject(index, "status", e.target.value)}
                                  placeholder="Statut du projet"
                                  className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full"
                                />
                              </div>
                              <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700">Localisation</label>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                  <Input
                                    value={project.location}
                                    onChange={(e) => updateProject(index, "location", e.target.value)}
                                    placeholder="Localisation du projet"
                                    className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <label className="text-sm font-semibold text-gray-700">Date de début</label>
                                  <Input
                                    type="date"
                                    value={project.startDate}
                                    onChange={(e) => updateProject(index, "startDate", e.target.value)}
                                    className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full"
                                  />
                                </div>
                                <div className="space-y-3">
                                  <label className="text-sm font-semibold text-gray-700">Date de fin</label>
                                  <Input
                                    type="date"
                                    value={project.endDate || ""}
                                    onChange={(e) => updateProject(index, "endDate", e.target.value)}
                                    className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full"
                                  />
                                </div>
                              </div>
                              <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700">Budget (FCFA)</label>
                                <Input
                                  type="number"
                                  value={project.budget || ""}
                                  onChange={(e) => updateProject(index, "budget", Number.parseFloat(e.target.value))}
                                  placeholder="Budget en FCFA"
                                  className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        {/* Onglet Contenu */}
                        <TabsContent value="content">
                          <div className="space-y-6">
                            <div className="space-y-3">
                              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Target className="h-4 w-4 text-yellow-600" />
                                Objectifs
                              </label>
                              <Textarea
                                value={project.objectives}
                                onChange={(e) => updateProject(index, "objectives", e.target.value)}
                                placeholder="Objectifs du projet (un par ligne)"
                                rows={5}
                                className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-xl"
                              />
                            </div>
                            <div className="space-y-3">
                              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-blue-600" />
                                Résultats
                              </label>
                              <Textarea
                                value={project.results}
                                onChange={(e) => updateProject(index, "results", e.target.value)}
                                placeholder="Résultats obtenus ou attendus"
                                rows={5}
                                className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-xl"
                              />
                            </div>
                            <div className="space-y-3">
                              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Users className="h-4 w-4 text-purple-600" />
                                Partenaires
                              </label>
                              <Textarea
                                value={project.partners}
                                onChange={(e) => updateProject(index, "partners", e.target.value)}
                                placeholder="Partenaires du projet (un par ligne)"
                                rows={5}
                                className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-xl"
                              />
                            </div>
                          </div>
                        </TabsContent>

                        {/* Onglet Paramètres */}
                        <TabsContent value="settings">
                          <div className="space-y-6">
                            <div className="flex items-center space-x-3 p-6 bg-green-50/50 rounded-3xl border border-green-200">
                              <input
                                type="checkbox"
                                id={`published-${index}`}
                                checked={project.published}
                                onChange={(e) => updateProject(index, "published", e.target.checked)}
                                className="h-5 w-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
                              />
                              <div className="flex-1">
                                <label
                                  htmlFor={`published-${index}`}
                                  className="text-sm font-medium flex items-center gap-2 cursor-pointer"
                                >
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                  Publier ce projet
                                </label>
                                <p className="text-xs text-gray-500 mt-1">
                                  Le projet sera visible sur le site web public
                                </p>
                              </div>
                            </div>

                            {/* Aperçu du projet */}
                            <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border border-blue-200">
                              <h3 className="text-lg font-semibold text-blue-500 mb-4 flex items-center gap-2">
                                <Eye className="h-5 w-5" />
                                Aperçu du projet
                              </h3>
                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-medium text-gray-900">{project.title || "Titre du projet"}</h4>
                                  <p className="text-sm text-gray-600">{project.subtitle || "Sous-titre"}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {project.category && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      {project.category}
                                    </span>
                                  )}
                                  {project.status && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                      {project.status}
                                    </span>
                                  )}
                                  {project.location && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {project.location}
                                    </span>
                                  )}
                                </div>
                                {project.budget && (
                                  <p className="text-sm text-gray-600">
                                    <strong>Budget:</strong> {project.budget.toLocaleString()} FCFA
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
