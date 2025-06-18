"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Search, Filter, ChevronRight, Heart, Gift, ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import LoadingScreen from "../components/LoadingScreen"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  title: string
  description: string
  image: string
  published: boolean
  rentreePourTous?: {
    id: string
    title: string
    date: string
    location: string
    participants: number
    status: string
    fundingGoal: number
    fundsRaised: number
  }
  category: string
  location: string
  status: string
}

// Données par défaut pour les projets
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Rentrée pour tous",
    description: "Assurer une rentrée scolaire réussie pour tous les enfants en fournissant des fournitures scolaires, des uniformes et un accompagnement éducatif personnalisé.",
    image: "/images/projects/valeur-1.jpg",
    published: true,
    category: "Éducation",
    location: "Dakar, Sénégal",
    status: "en cours",
    rentreePourTous: {
      id: "1",
      title: "Édition 2024",
      date: "2024-09-15",
      location: "Dakar",
      participants: 150,
      status: "en cours",
      fundingGoal: 5000000,
      fundsRaised: 3200000
    }
  },
  {
    id: "2",
    title: "Bibliothèque mobile",
    description: "Apporter la lecture et l'éducation aux zones reculées grâce à notre bibliothèque mobile qui se déplace dans les villages.",
    image: "/images/projects/valeur-2.jpg",
    published: true,
    category: "Culture",
    location: "Régions rurales",
    status: "en cours",
    rentreePourTous: {
      id: "2",
      title: "Tournée 2024",
      date: "2024-08-20",
      location: "Thiès",
      participants: 80,
      status: "en cours",
      fundingGoal: 2000000,
      fundsRaised: 1200000
    }
  },
  {
    id: "3",
    title: "Formation professionnelle",
    description: "Offrir des formations professionnelles aux jeunes pour leur permettre d'acquérir des compétences et de s'insérer dans le monde du travail.",
    image: "/images/projects/valeur-3.jpg",
    published: true,
    category: "Formation",
    location: "Dakar",
    status: "terminé",
    rentreePourTous: {
      id: "3",
      title: "Session 2023",
      date: "2023-12-10",
      location: "Dakar",
      participants: 45,
      status: "terminé",
      fundingGoal: 3000000,
      fundsRaised: 3000000
    }
  },
  {
    id: "4",
    title: "Santé communautaire",
    description: "Améliorer l'accès aux soins de santé de base pour les enfants et leurs familles dans les communautés défavorisées.",
    image: "/images/projects/valeur-1.jpg",
    published: true,
    category: "Santé",
    location: "Saint-Louis",
    status: "en cours",
    rentreePourTous: {
      id: "4",
      title: "Campagne 2024",
      date: "2024-07-05",
      location: "Saint-Louis",
      participants: 200,
      status: "en cours",
      fundingGoal: 4000000,
      fundsRaised: 2800000
    }
  },
  {
    id: "5",
    title: "Agriculture durable",
    description: "Former les jeunes aux techniques d'agriculture durable pour assurer la sécurité alimentaire et créer des emplois locaux.",
    image: "/images/projects/valeur-2.jpg",
    published: true,
    category: "Agriculture",
    location: "Kaolack",
    status: "en cours",
    rentreePourTous: {
      id: "5",
      title: "Saison 2024",
      date: "2024-06-15",
      location: "Kaolack",
      participants: 60,
      status: "en cours",
      fundingGoal: 2500000,
      fundsRaised: 1800000
    }
  },
  {
    id: "6",
    title: "Art et culture",
    description: "Promouvoir l'expression artistique et culturelle des enfants à travers des ateliers de peinture, musique et danse traditionnelle.",
    image: "/images/projects/valeur-3.jpg",
    published: true,
    category: "Art",
    location: "Dakar",
    status: "terminé",
    rentreePourTous: {
      id: "6",
      title: "Festival 2023",
      date: "2023-11-20",
      location: "Dakar",
      participants: 120,
      status: "terminé",
      fundingGoal: 1500000,
      fundsRaised: 1500000
    }
  }
]

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

export default function Projects() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("popular")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(defaultProjects)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/admin/projects")
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des projets")
        }
        const result = await response.json()
        if (result.success) {
          const publishedProjects = result.data.filter((project: Project) => project.published)
          setProjects(publishedProjects)
          setFilteredProjects(publishedProjects)
        } else {
          throw new Error(result.error || "Erreur lors de la récupération des projets")
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
        setError("Impossible de charger les projets. Affichage des projets par défaut.")
        // Les projets par défaut sont déjà définis dans l'état initial
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    // Filter projects based on search term
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredProjects(filtered)
  }, [searchTerm, projects])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the useEffect above
  }

  const getStatusPercentage = (status: string) => {
    if (status === "terminé") return 100
    if (status === "en cours") return Math.floor(Math.random() * 40) + 40 // Random between 40-80%
    return Math.floor(Math.random() * 30) + 10 // Random between 10-40%
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      {/* Hero Section - Style identique à index.tsx */}
      <section className="relative min-h-screen flex items-center">
        {/* Formes géométriques en arrière-plan */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-16 h-16 bg-yellow-400 rounded-lg transform rotate-45"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-green-500 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-blue-500 rounded-lg transform rotate-12 opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-16">
          {/* Contenu gauche */}
          <AnimatedCard delay={200}>
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-blue-500 mb-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">Nos Projets</h1>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Découvrez les initiatives qui transforment des vies et construisent un avenir meilleur pour les enfants
                de notre orphelinat.
              </p>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full text-lg" onClick={() => router.push("/projects")}>
                Découvrir <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </AnimatedCard>

          {/* Image droite */}
          <AnimatedCard delay={400}>
            <div className="relative">
              <div className="bg-blue-50 rounded-3xl p-8">
                <img
                  src={projects[0]?.image || "/images/support/valeur-1.jpg"}
                  alt="Nos Projets"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              {/* Élément décoratif */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-lg transform rotate-45"></div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Section Recherche et Filtres - Style identique à la section "Qui sommes-nous" */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCard delay={200}>
            <Card className="bg-white border-l-4 border-blue-500 shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Rechercher un projet..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full">
                    <Filter className="w-5 h-5 mr-2" />
                    Rechercher
                  </Button>
                </form>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <p className="text-gray-700">
                    <span className="font-bold text-blue-500">{filteredProjects.length}</span> projets trouvés
                  </p>
                  <div className="relative w-full sm:w-auto">
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="appearance-none w-full bg-white border border-gray-200 px-4 py-2 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="popular">Les plus populaires</option>
                      <option value="recent">Les plus récents</option>
                      <option value="completed">Projets terminés</option>
                      <option value="ongoing">Projets en cours</option>
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
      </section>

      {/* Section Grille de Projets - Style identique à la section Valeurs clés */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">Projets en Action</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <AnimatedCard key={project.id} delay={idx * 200}>
                <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-800">
                        {project.category}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div
                      className={`text-xl font-bold mb-3 ${
                        idx === 0
                          ? "text-blue-500"
                          : idx === 1
                            ? "text-yellow-500"
                            : idx === 2
                              ? "text-green-500"
                              : idx % 3 === 0
                                ? "text-blue-500"
                                : idx % 3 === 1
                                  ? "text-yellow-500"
                                  : "text-green-500"
                      }`}
                    >
                      {project.title}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4 flex-1">{project.description}</p>

                    {/* Barre de progression */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span
                          className={`font-semibold ${
                            project.status === "terminé" ? "text-green-600" : "text-yellow-600"
                          }`}
                        >
                          {project.status === "terminé" ? "Terminé" : "En cours"}
                        </span>
                        <span className="text-gray-500">{getStatusPercentage(project.status)}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                            project.status === "terminé" ? "bg-green-500" : "bg-yellow-400"
                          }`}
                          style={{ width: `${getStatusPercentage(project.status)}%` }}
                        />
                      </div>
                    </div>

                    {project.rentreePourTous && (
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-600 mb-2">Rentrée pour tous</h4>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-700">{project.rentreePourTous.title}</p>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {project.rentreePourTous.location}
                            </span>
                            <span className="text-blue-600 font-medium">
                              {project.rentreePourTous.participants} participants
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-2 bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: `${(project.rentreePourTous.fundsRaised / project.rentreePourTous.fundingGoal) * 100}%`,
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>{project.rentreePourTous.fundsRaised.toLocaleString()} FCFA</span>
                            <span>{project.rentreePourTous.fundingGoal.toLocaleString()} FCFA</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <Link
                      href={`/projects/rentree-pour-tous/${project.id}`}
                      className="group bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mt-auto"
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA - Style identique à la section CTA de index.tsx */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute top-10 right-10 w-16 h-16 bg-yellow-400 rounded-lg transform rotate-45 opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white rounded-full opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedCard delay={200}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Devenir Parrain</h3>
                  </div>
                  <p className="mb-6 text-white/90 leading-relaxed">
                    Devenez un pilier dans la vie d'un enfant en difficulté. En tant que parrain, vous offrez bien plus
                    qu'un soutien financier : vous offrez de l'espoir, de la stabilité et un lien humain précieux.
                  </p>
                  <Link
                    href="/partnership"
                    className="group bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
                  >
                    S'inscrire
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={400}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Faire un Don</h3>
                  </div>
                  <p className="mb-6 text-white/90 leading-relaxed">
                    Soutenez nos actions en faisant un don. Chaque contribution nous permet d'agir concrètement auprès
                    des plus démunis. Ensemble, apportons aide, dignité et espoir là où le besoin est urgent.
                  </p>
                  <Link
                    href="/donate"
                    className="group bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
                  >
                    Faire un don
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </main>
  )
}
