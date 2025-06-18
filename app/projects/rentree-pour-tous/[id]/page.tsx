"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Heart, Gift, Play, Calendar, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import LoadingScreen from "@/app/components/LoadingScreen"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useRouter } from "next/navigation"

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

interface RentreePourTous {
  id: string
  heroTitle: string
  heroImage: string
  title: string
  description: string
  location: string
  participants: number
  status: string
  fundingGoal: number
  fundsRaised: number
  media?: {
    type: string
    imageUrl?: string
    youtubeUrl?: string
    videoUrl?: string
    alt: string
  }
  gallery?: {
    id: string
    type: string
    imageUrl?: string
    youtubeUrl?: string
    videoUrl?: string
    alt: string
  }[]
  project?: {
    id: string
    title: string
    description: string
  }
}

// Données par défaut pour les événements "Rentrée pour tous"
const defaultEvents: { [key: string]: RentreePourTous } = {
  "1": {
    id: "1",
    heroTitle: "Rentrée Pour Tous 2024",
    heroImage: "/images/projects/valeur-1.jpg",
    title: "Édition 2024 - Dakar",
    description: "Assurer une rentrée scolaire réussie pour tous les enfants en fournissant des fournitures scolaires, des uniformes et un accompagnement éducatif personnalisé. Cette édition 2024 vise à toucher plus de 150 enfants dans la région de Dakar.",
    location: "Dakar, Sénégal",
    participants: 150,
    status: "en cours",
    fundingGoal: 5000000,
    fundsRaised: 3200000,
    media: {
      type: "image",
      imageUrl: "/images/projects/valeur-1.jpg",
      alt: "Rentrée pour tous 2024"
    },
    gallery: [
      {
        id: "1",
        type: "image",
        imageUrl: "/images/projects/valeur-2.jpg",
        alt: "Distribution des fournitures"
      },
      {
        id: "2",
        type: "image",
        imageUrl: "/images/projects/valeur-3.jpg",
        alt: "Enfants avec leurs kits scolaires"
      },
      {
        id: "3",
        type: "video",
        videoUrl: "/videos/education.mp4",
        alt: "Vidéo de présentation"
      }
    ],
    project: {
      id: "1",
      title: "Rentrée pour tous",
      description: "Projet d'éducation pour tous les enfants"
    }
  },
  "2": {
    id: "2",
    heroTitle: "Tournée Bibliothèque Mobile 2024",
    heroImage: "/images/projects/valeur-2.jpg",
    title: "Tournée 2024 - Thiès",
    description: "Apporter la lecture et l'éducation aux zones reculées grâce à notre bibliothèque mobile qui se déplace dans les villages. Cette tournée 2024 couvre la région de Thiès et ses environs.",
    location: "Thiès, Sénégal",
    participants: 80,
    status: "en cours",
    fundingGoal: 2000000,
    fundsRaised: 1200000,
    media: {
      type: "image",
      imageUrl: "/images/projects/valeur-2.jpg",
      alt: "Bibliothèque mobile"
    },
    gallery: [
      {
        id: "1",
        type: "image",
        imageUrl: "/images/projects/valeur-1.jpg",
        alt: "Bibliothèque mobile en action"
      },
      {
        id: "2",
        type: "image",
        imageUrl: "/images/projects/valeur-3.jpg",
        alt: "Enfants lisant"
      }
    ],
    project: {
      id: "2",
      title: "Bibliothèque mobile",
      description: "Projet culturel et éducatif"
    }
  },
  "3": {
    id: "3",
    heroTitle: "Formation Professionnelle 2023",
    heroImage: "/images/projects/valeur-3.jpg",
    title: "Session 2023 - Dakar",
    description: "Offrir des formations professionnelles aux jeunes pour leur permettre d'acquérir des compétences et de s'insérer dans le monde du travail. Cette session 2023 a formé 45 jeunes dans différents domaines.",
    location: "Dakar, Sénégal",
    participants: 45,
    status: "terminé",
    fundingGoal: 3000000,
    fundsRaised: 3000000,
    media: {
      type: "image",
      imageUrl: "/images/projects/valeur-3.jpg",
      alt: "Formation professionnelle"
    },
    gallery: [
      {
        id: "1",
        type: "image",
        imageUrl: "/images/projects/valeur-1.jpg",
        alt: "Ateliers de formation"
      },
      {
        id: "2",
        type: "image",
        imageUrl: "/images/projects/valeur-2.jpg",
        alt: "Certification des participants"
      }
    ],
    project: {
      id: "3",
      title: "Formation professionnelle",
      description: "Projet de formation et insertion"
    }
  },
  "4": {
    id: "4",
    heroTitle: "Campagne Santé Communautaire 2024",
    heroImage: "/images/projects/valeur-1.jpg",
    title: "Campagne 2024 - Saint-Louis",
    description: "Améliorer l'accès aux soins de santé de base pour les enfants et leurs familles dans les communautés défavorisées. Cette campagne 2024 cible la région de Saint-Louis.",
    location: "Saint-Louis, Sénégal",
    participants: 200,
    status: "en cours",
    fundingGoal: 4000000,
    fundsRaised: 2800000,
    media: {
      type: "image",
      imageUrl: "/images/projects/valeur-1.jpg",
      alt: "Santé communautaire"
    },
    gallery: [
      {
        id: "1",
        type: "image",
        imageUrl: "/images/projects/valeur-2.jpg",
        alt: "Consultations médicales"
      },
      {
        id: "2",
        type: "image",
        imageUrl: "/images/projects/valeur-3.jpg",
        alt: "Distribution de médicaments"
      }
    ],
    project: {
      id: "4",
      title: "Santé communautaire",
      description: "Projet de santé publique"
    }
  },
  "5": {
    id: "5",
    heroTitle: "Agriculture Durable 2024",
    heroImage: "/images/projects/valeur-2.jpg",
    title: "Saison 2024 - Kaolack",
    description: "Former les jeunes aux techniques d'agriculture durable pour assurer la sécurité alimentaire et créer des emplois locaux. Cette saison 2024 se déroule dans la région de Kaolack.",
    location: "Kaolack, Sénégal",
    participants: 60,
    status: "en cours",
    fundingGoal: 2500000,
    fundsRaised: 1800000,
    media: {
      type: "image",
      imageUrl: "/images/projects/valeur-2.jpg",
      alt: "Agriculture durable"
    },
    gallery: [
      {
        id: "1",
        type: "image",
        imageUrl: "/images/projects/valeur-1.jpg",
        alt: "Champs cultivés"
      },
      {
        id: "2",
        type: "image",
        imageUrl: "/images/projects/valeur-3.jpg",
        alt: "Formation agricole"
      }
    ],
    project: {
      id: "5",
      title: "Agriculture durable",
      description: "Projet agricole et environnemental"
    }
  },
  "6": {
    id: "6",
    heroTitle: "Festival Art et Culture 2023",
    heroImage: "/images/projects/valeur-3.jpg",
    title: "Festival 2023 - Dakar",
    description: "Promouvoir l'expression artistique et culturelle des enfants à travers des ateliers de peinture, musique et danse traditionnelle. Ce festival 2023 a réuni 120 enfants à Dakar.",
    location: "Dakar, Sénégal",
    participants: 120,
    status: "terminé",
    fundingGoal: 1500000,
    fundsRaised: 1500000,
    media: {
      type: "image",
      imageUrl: "/images/projects/valeur-3.jpg",
      alt: "Festival art et culture"
    },
    gallery: [
      {
        id: "1",
        type: "image",
        imageUrl: "/images/projects/valeur-1.jpg",
        alt: "Performances artistiques"
      },
      {
        id: "2",
        type: "image",
        imageUrl: "/images/projects/valeur-2.jpg",
        alt: "Exposition d'art"
      }
    ],
    project: {
      id: "6",
      title: "Art et culture",
      description: "Projet culturel et artistique"
    }
  }
}

export default function RentreePourTousPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<RentreePourTous | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedMainMedia, setSelectedMainMedia] = useState<{
    type: string
    imageUrl?: string
    youtubeUrl?: string
    videoUrl?: string
    alt: string
  } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/rentree-pour-tous/${params.id}`)
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données")
        }
        const result = await response.json()
        if (result.success) {
          setData(result.data)
          setSelectedMainMedia(result.data.media)
        } else {
          throw new Error(result.error || "Erreur lors de la récupération des données")
        }
      } catch (error) {
        console.error("Error fetching rentree pour tous:", error)
        setError("Impossible de charger les données. Affichage des données par défaut.")
        
        // Utiliser les données par défaut
        const defaultData = defaultEvents[params.id]
        if (defaultData) {
          setData(defaultData)
          setSelectedMainMedia(defaultData.media || null)
        } else {
          // Si l'ID n'existe pas, utiliser le premier événement par défaut
          const firstEvent = Object.values(defaultEvents)[0]
          setData(firstEvent)
          setSelectedMainMedia(firstEvent.media || null)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleGalleryItemClick = (item: any) => {
    if (!data) return

    // Sauvegarder le média principal actuel dans la galerie
    const newGallery = [...(data.gallery || [])]
    const mainMediaIndex = newGallery.findIndex(
      (g) =>
        g.imageUrl === selectedMainMedia?.imageUrl ||
        g.videoUrl === selectedMainMedia?.videoUrl ||
        g.youtubeUrl === selectedMainMedia?.youtubeUrl,
    )

    if (mainMediaIndex !== -1) {
      newGallery[mainMediaIndex] = { id: `main-${Date.now()}`, ...selectedMainMedia }
    } else if (selectedMainMedia) {
      newGallery.push({ id: `main-${Date.now()}`, ...selectedMainMedia })
    }

    // Mettre à jour les données
    setData({
      ...data,
      media: item,
      gallery: newGallery,
    })
    setSelectedMainMedia(item)
  }

  if (isLoading || !data) {
    return <LoadingScreen />
  }

  const progressPercentage = (data.fundsRaised / data.fundingGoal) * 100

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      {/* Hero Section */}
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
              <div className="inline-block px-4 py-2 bg-yellow-400 text-black text-sm font-semibold rounded-full mb-4">
                Rentrée Pour Tous
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-blue-500 mb-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                {data.heroTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{data.location}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-8">{data.description}</p>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full text-lg">
                Participer <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </AnimatedCard>

          {/* Image droite */}
          <AnimatedCard delay={400}>
            <div className="relative">
              <div className="bg-blue-50 rounded-3xl p-8">
                <img
                  src={data.heroImage || "/placeholder.svg"}
                  alt={data.heroTitle}
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              {/* Élément décoratif */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-lg transform rotate-45"></div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Section Média Principal */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCard>
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold mb-8 text-center">Média Principal</h2>
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                {selectedMainMedia?.type === "youtube" ? (
                    <iframe
                    src={selectedMainMedia.youtubeUrl}
                    className="w-full h-full"
                      allowFullScreen
                    />
                ) : selectedMainMedia?.type === "video" ? (
                    <video
                      src={selectedMainMedia.videoUrl}
                      controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                    <img
                      src={selectedMainMedia?.imageUrl || "/placeholder.svg"}
                    alt={selectedMainMedia?.alt || "Média principal"}
                    className="w-full h-full object-cover"
                    />
                )}
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Section Galerie */}
              {data.gallery && data.gallery.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Galerie</h2>
            <Carousel className="w-full">
              <CarouselContent>
                    {data.gallery.map((item, index) => (
                  <CarouselItem key={item.id || index} className="md:basis-1/2 lg:basis-1/3">
                      <div
                      className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => handleGalleryItemClick(item)}
                      >
                        {item.type === "youtube" ? (
                          <iframe
                          src={item.youtubeUrl}
                          className="w-full h-full"
                            allowFullScreen
                          />
                        ) : item.type === "video" ? (
                        <video
                          src={item.videoUrl}
                          className="w-full h-full object-cover"
                        />
                        ) : (
                          <img
                            src={item.imageUrl || "/placeholder.svg"}
                            alt={item.alt}
                          className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      )}

      {/* Section Financement */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCard>
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold mb-8 text-center">Objectif de Financement</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Objectif</span>
                    <span>{data.fundingGoal.toLocaleString()} FCFA</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Récolté</span>
                    <span>{data.fundsRaised.toLocaleString()} FCFA</span>
                  </div>
                  </div>
                <div className="flex items-center justify-center">
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full text-lg" onClick={() => router.push("/donate")}>
                    Faire un don <Gift className="ml-2 w-5 h-5" />
                  </Button>
                    </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>
    </main>
  )
}
