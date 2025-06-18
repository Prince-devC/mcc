"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, Heart, Users, Target, Award, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

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
  projets: Array<{
    id?: string
    title: string
    description: string
    image: string
  }>
  cta: {
    id?: string
    backgroundImage: string
    parrain: {
      id?: string
      title: string
      description: string
      buttonText: string
    }
    don: {
      id?: string
      title: string
      description: string
      buttonText: string
    }
  }
  settings: {
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
  }
  homeGallery?: Array<{
    id?: string
    image: string
  }>
  education: {
    id?: string
    title: string
    description: string
    media: Array<{
      id?: string
      type: 'image' | 'video'
      url: string
    }>
  }
}

// Données par défaut
const defaultHomeData: HomeData = {
  hero: {
    title: "MCC – Bâtir des avenirs, transformer des vies",
    subtitle: "Chaque enfant, chaque jeune, chaque femme mérite protection, dignité et espoir.",
    backgroundImage: "/images/home/hero-bg.jpg"
  },
  vision: {
    title: "Notre Vision",
    description: "Se positionner comme une référence nationale dans l'accompagnement et l'insertion des jeunes et femmes vulnérables au travers de programmes de protection, d'accompagnement et d'insertion dans la société.",
    mission: {
      title: "Notre Mission",
      description: "Protéger, accompagner et insérer les enfants, jeunes et femmes vulnérables afin de faire d'eux des modèles qui influencent positivement la société."
    },
    images: {
      top: "/images/home/quisommesnous.png",
      bottom: "/images/home/quisommesnous.png"
    }
  },
  valeurs: [
    {
      title: "Amour",
      description: "Agir avec bienveillance et respect envers chaque enfant, jeune et femme vulnérable, en les impliquant dans des initiatives chaleureuses où ils se sentent accueillis et soutenus",
      image: "/images/projects/valeur-1.jpg"
    },
    {
      title: "Engagement",
      description: "S'investir pleinement dans la protection, l'accompagnement et l'insertion des enfants, jeunes et femmes vulnérables, avec une détermination sans faille pour améliorer leur avenir.",
      image: "/images/projects/valeur-2.jpg"
    },
    {
      title: "Transparence",
      description: "Assurer une gestion claire et honnête de toutes les ressources, actions et décisions prises, afin de garantir la confiance des partenaires, des bénéficiaires et de la communauté.",
      image: "/images/projects/valeur-3.jpg"
    }
  ],
  projets: [
    {
      title: "Rentrée pour tous",
      description: "Assurer une rentrée scolaire réussie pour tous les enfants.",
      image: "/images/projects/valeur-1.jpg"
    },
    {
      title: "Bibliothèque mobile",
      description: "Apporter la lecture aux zones reculées.",
      image: "/images/projects/valeur-2.jpg"
    },
    {
      title: "Bibliothèque mobile",
      description: "Apporter la lecture aux zones reculées.",
      image: "/images/projects/valeur-3.jpg"
    },
  ],
  cta: {
    backgroundImage: "/images/cta-background.jpg",
    parrain: {
      title: "Devenez parrain",
      description: "Soutenez un enfant dans son parcours éducatif.",
      buttonText: "Parrainer"
    },
    don: {
      title: "Faites un don",
      description: "Votre soutien fait la différence.",
      buttonText: "Donner"
    }
  },
  settings: {
    siteName: "MCC",
    siteDescription: "Ensemble pour l'éducation",
    logo: "/images/logo.png",
    contactEmail: "contact@mcc.org",
    contactPhone: "+221 XX XXX XX XX",
    address: "Dakar, Sénégal",
    facebookUrl: "https://facebook.com/mcc",
    twitterUrl: "https://twitter.com/mcc",
    instagramUrl: "https://instagram.com/mcc",
    linkedinUrl: "https://linkedin.com/company/mcc",
    youtubeUrl: "https://youtube.com/mcc",
    tiktokUrl: "https://tiktok.com/@mcc"
  },
  homeGallery: [
    { image: "/education/IMG_7981.jpg" },
    { image: "/education/IMG_7979.jpg" },
    { image: "/education/IMG_7987.jpg" }
  ],
  education: {
    title: "Notre Programme Éducatif",
    description: "Un programme complet pour le développement des enfants.",
    media: [
      {
        type: "image",
        url: "/images/education-1.jpg"
      },
      {
        type: "video",
        url: "/videos/education.mp4"
      }
    ]
  }
}

// Composant de galerie interactive
function InteractiveGallery({ images, autoPlay = true }: { images: string[]; autoPlay?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, 4000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isPlaying, images.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative group">
      <div className="relative h-64 md:h-80 overflow-hidden rounded-3xl shadow-2xl">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Overlay avec contrôles */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Indicateurs */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-500 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// Composant de carte animée
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

// Composant Lightbox
function Lightbox({ image, onClose }: { image: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={onClose}>
      <button
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        onClick={onClose}
      >
        <X size={32} />
      </button>
      <div className="relative max-w-7xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
        <img
          src={image}
          alt="Photo en grand format"
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />
      </div>
    </div>
  )
}

// Composant VideoLightbox
function VideoLightbox({ video, poster, onClose }: { video: string; poster: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={onClose}>
      <button
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        onClick={onClose}
      >
        <X size={32} />
      </button>
      <div className="relative max-w-7xl w-full p-4" onClick={(e) => e.stopPropagation()}>
        <div className="aspect-video w-full">
          <video
            controls
            autoPlay
            className="w-full h-full rounded-lg"
            poster={poster}
          >
            <source src={video} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>
      </div>
    </div>
  )
}

export default function Index() {
  const router = useRouter()
  const [homeData, setHomeData] = useState<HomeData>(defaultHomeData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [startIndexValeurs, setStartIndexValeurs] = useState(0)
  const [startIndexProjets, setStartIndexProjets] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [videoPoster, setVideoPoster] = useState<string | null>(null)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetch("/api/home")
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données")
        }
        const data = await response.json()
        if (data.success) {
          setHomeData(data.data)
        } else {
          throw new Error(data.error || "Erreur lors de la récupération des données")
        }
      } catch (error) {
        console.error("Error fetching home data:", error)
        setError("Impossible de charger les données. Affichage des données par défaut.")
        // Les données par défaut sont déjà définies dans l'état initial
      } finally {
        setIsLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  const galleryImages = homeData?.homeGallery?.map(item => item.image) || [
    "/lovable-uploads/bf4abe0f-5783-4b34-8519-08046740967c.png"
  ]

  const visibleCount = 3
  const totalValeurs = homeData?.valeurs.length || 0
  const totalProjets = homeData?.projets.length || 0

  const nextValeurs = () => setStartIndexValeurs((prev) => (prev + 1) % totalValeurs)
  const prevValeurs = () => setStartIndexValeurs((prev) => (prev - 1 + totalValeurs) % totalValeurs)
  const nextProjets = () => setStartIndexProjets((prev) => (prev + 1) % totalProjets)
  const prevProjets = () => setStartIndexProjets((prev) => (prev - 1 + totalProjets) % totalProjets)

  const getVisibleValeurs = () => {
    if (!homeData?.valeurs?.length) return []
    const arr = []
    for (let i = 0; i < visibleCount; i++) {
      const value = homeData.valeurs[(startIndexValeurs + i) % totalValeurs]
      if (value) {
        arr.push({ ...value, image: value.image || "/placeholder.jpg" })
      }
    }
    return arr
  }

  const getVisibleProjets = () => {
    if (!homeData?.projets?.length) return []
    const arr = []
    for (let i = 0; i < visibleCount; i++) {
      const projet = homeData.projets[(startIndexProjets + i) % totalProjets]
      if (projet) {
        arr.push({ ...projet, image: projet.image || "/placeholder.jpg" })
      }
    }
    return arr
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  }

  if (!homeData) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-500">Erreur lors du chargement des données</div>
    </div>
  }

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
              <h1 className="text-5xl lg:text-6xl font-bold text-blue-500 mb-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                {homeData.hero.title}
              </h1>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {homeData.hero.subtitle}
              </p>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full text-lg" onClick={() => router.push('/about')}>
                En savoir plus <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </AnimatedCard>

          {/* Image droite */}
          <AnimatedCard delay={400}>
            <div className="relative">
              <div className="bg-blue-50 rounded-3xl p-8">
                <img
                  src={homeData.hero.backgroundImage || "/images/home/hero-bg.jpg"}
                  alt="ONG MCC"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              {/* Élément décoratif */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-lg transform rotate-45"></div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Section Qui sommes-nous */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedCard delay={200}>
            <div className="relative">
              <img
                src={homeData.vision.images.top}
                alt="Qui sommes-nous"
                className="w-full h-auto rounded-3xl shadow-lg"
              />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-green-500 rounded-lg transform rotate-45"></div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <div>
              <h2 className="text-4xl font-bold text-blue-500 mb-6">
                Qui sommes-nous ?
              </h2>
              <Card className="bg-white border-l-4 border-blue-500 shadow-lg">
                <CardContent className="p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {homeData.vision.description}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-l-4 border-blue-500 shadow-lg mt-4">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl text-blue-500 mb-3">Notre Mission :</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {homeData.vision.mission.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Section Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedCard delay={200}>
            <div>
              <h2 className="text-4xl font-bold text-blue-500 mb-8">
                Nos projets
              </h2>
              
              <div className="space-y-6">
                

                {/* Cards des projets */}
                <div className="space-y-4">
                  {getVisibleProjets().map((projet, idx) => (
                    <Card key={idx} className="bg-white border-l-4 border-blue-500 shadow-lg">
                      <CardContent className="p-6">
                        <h4 className="font-bold text-xl text-gray-900 mb-2">{projet.title}</h4>
                        <p className="text-gray-700 leading-relaxed">
                          {projet.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <InteractiveGallery images={galleryImages} />
          </AnimatedCard>
        </div>
      </section>

      {/* Section Valeurs clés */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">
              Valeurs clés
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getVisibleValeurs().map((value, idx) => (
              <AnimatedCard key={idx} delay={idx * 200}>
                <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={value.image}
                      alt={value.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <CardContent className="p-6">
                    <div className={`inline-block px-4 py-2 rounded-full text-white font-semibold mb-4 ${
                      idx === 0 ? 'bg-blue-500' : 
                      idx === 1 ? 'bg-yellow-500' : 
                      idx === 2 ? 'bg-green-500' :
                      idx === 3 ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}>
                      {value.title}
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={prevValeurs}
              className="rounded-full border-blue-200 hover:bg-blue-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex gap-2">
              {homeData.valeurs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setStartIndexValeurs(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === startIndexValeurs ? "bg-blue-500 scale-125" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextValeurs}
              className="rounded-full border-blue-200 hover:bg-blue-50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Section CTA */}
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
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Devenir parrain</h3>
                  </div>
                  <p className="mb-6 text-white/90 leading-relaxed">
                    Soutenez notre mission en devenant parrain et aidez-nous à transformer des vies.
                  </p>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                    Devenir parrain
                  </Button>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={400}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Faire un don</h3>
                  </div>
                  <p className="mb-6 text-white/90 leading-relaxed">
                    Votre contribution nous aide à réaliser nos projets et à changer des vies.
                  </p>
                  <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold">
                    Faire un don
                  </Button>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Section Éducation */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">Notre Éducation</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez nos programmes éducatifs et nos activités à travers ces photos et vidéos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              '/education/IMG_7981.JPG',
              '/education/IMG_7978.JPG',
              '/education/IMG_8053.JPG',
              '/education/IMG_7982.JPG',
              '/education/IMG_7979.JPG',
              '/education/IMG_7976.JPG',
              '/education/IMG_7995.JPG',
              '/education/IMG_7994.JPG',
              '/education/IMG_7986.JPG',
            ].map((image, index) => (
              <AnimatedCard key={index} delay={index * 100}>
                <Card 
                  className="overflow-hidden h-64 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  onClick={() => setSelectedImage(image)}
                >
                  <CardContent className="p-0">
                    <div className="relative group h-full">
                      <img
                        src={image}
                        alt={`Éducation ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 text-white">
                          <p className="text-sm font-medium">Activité Éducative {index + 1}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { video: '/education/IMG_7832.MOV', poster: '/education/IMG_7981.JPG' },
              { video: '/education/IMG_7831.MOV', poster: '/education/IMG_7978.JPG' },
              { video: '/education/IMG_5076.MP4', poster: '/education/IMG_8053.JPG' },
            ].map((media, index) => (
              <AnimatedCard key={index} delay={index * 100}>
                <Card 
                  className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  onClick={() => setSelectedVideo(media.video)}
                >
                  <CardContent className="p-0">
                    <div className="relative group">
                      <video
                        className="w-full h-auto"
                        poster={media.poster}
                      >
                        <source src={media.video} type="video/mp4" />
                        Votre navigateur ne supporte pas la lecture de vidéos.
                      </video>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox pour les images */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* Lightbox pour les vidéos */}
      {selectedVideo && (
        <VideoLightbox
          video={selectedVideo}
          poster={videoPoster || "/placeholder.jpg"}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </main>
  )
}