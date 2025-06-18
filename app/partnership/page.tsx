"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { User, Mail, MessageSquare, Send, Heart, Handshake, Target, ChevronDown, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import LoadingScreen from "../components/LoadingScreen"

interface PartnershipData {
  id: string
  heroTitle: string
  heroImage: string
  title: string
  description: string
  image: string
  formTitle?: string
  formDescription?: string
}

interface FormData {
  name: string
  email: string
  reason: string
  message: string
}

// Données par défaut pour la page partnership
const defaultPartnershipData: PartnershipData = {
  id: "1",
  heroTitle: "Devenez Parrain",
  heroImage: "/images/partnership/hero-bg.jpg",
  title: "Parrainage d'Enfants",
  description: "Devenez parrain et changez la vie d'un enfant. Votre parrainage offre une éducation, des soins de santé et un avenir meilleur aux enfants que nous accompagnons. Ensemble, construisons un monde où chaque enfant a la chance de réaliser ses rêves.",
  image: "/images/partnership/valeur-3.jpg",
  formTitle: "Commencer Votre Parrainage",
  formDescription: "Remplissez ce formulaire pour commencer votre parcours de parrain et changer la vie d'un enfant. Notre équipe vous accompagnera dans chaque étape de votre engagement solidaire."
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

export default function Partnership() {
  const [isLoading, setIsLoading] = useState(true)
  const [partnershipData, setPartnershipData] = useState<PartnershipData>(defaultPartnershipData)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    reason: "parrainage",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/partnership")
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données")
        }
        const result = await response.json()
        if (result.success) {
          setPartnershipData(result.data)
        } else {
          throw new Error(result.error || "Erreur lors de la récupération des données")
        }
      } catch (error) {
        console.error("Error fetching partnership data:", error)
        setError("Impossible de charger les données. Affichage des données par défaut.")
        // Les données par défaut sont déjà définies dans l'état initial
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would normally send the data to your API
      console.log("Form submitted:", formData)

      setSubmitSuccess(true)
      setFormData({ name: "", email: "", reason: "parrainage", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      setSubmitError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading || !partnershipData) {
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
              <h1 className="text-5xl lg:text-6xl font-bold text-blue-500 mb-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">{partnershipData.heroTitle}</h1>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">{partnershipData.description}</p>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full text-lg">
                Devenir parrain <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </AnimatedCard>

          {/* Image droite */}
          <AnimatedCard delay={400}>
            <div className="relative">
              <div className="bg-blue-50 rounded-3xl p-8">
                <img
                  src={partnershipData.heroImage || "/placeholder.svg"}
                  alt={partnershipData.heroTitle}
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              {/* Élément décoratif */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-lg transform rotate-45"></div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Section Avantages du Partenariat - Style identique à la section Valeurs clés */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">Pourquoi Devenir Parrain ?</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedCard delay={200}>
              <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xl font-bold mb-3 text-blue-500">Impact Direct</div>
                  <p className="text-gray-700 leading-relaxed">
                    Changez directement la vie d'un enfant grâce à votre parrainage et voyez concrètement votre impact.
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={400}>
              <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Handshake className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xl font-bold mb-3 text-green-500">Relation Durable</div>
                  <p className="text-gray-700 leading-relaxed">
                    Construisez une relation à long terme avec votre filleul et suivez son évolution au fil des années.
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={600}>
              <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xl font-bold mb-3 text-yellow-500">Suivi Transparent</div>
                  <p className="text-gray-700 leading-relaxed">
                    Recevez des rapports réguliers et des nouvelles de votre filleul pour suivre ses progrès.
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Section Formulaire - Style identique à la section "Qui sommes-nous" */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedCard delay={200}>
            <div className="relative">
              <img
                src={partnershipData.image || "/placeholder.svg"}
                alt="Enfants bénéficiaires"
                className="w-full h-auto rounded-3xl shadow-lg"
              />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-green-500 rounded-lg transform rotate-45"></div>

              {/* Statistiques en overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <Card className="bg-white/90 backdrop-blur-sm border-white/50">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-500">150+</div>
                        <div className="text-sm text-gray-600">Enfants parrainés</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-500">95%</div>
                        <div className="text-sm text-gray-600">Taux de réussite</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <div>
              <h2 className="text-4xl font-bold text-blue-500 mb-6">
                {partnershipData.formTitle || "Commencer le Parrainage"}
              </h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                {partnershipData.formDescription ||
                  "Remplissez ce formulaire pour commencer votre parcours de parrain et changer la vie d'un enfant."}
              </p>

              <Card className="bg-white border-l-4 border-blue-500 shadow-lg">
                <CardContent className="p-6">
                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Merci ! Votre demande a été envoyée avec succès. Nous vous contacterons bientôt.
                    </div>
                  )}

                  {submitError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                      {submitError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom complet
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Votre nom complet"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Adresse email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="votre.email@exemple.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="reason" className="block text-sm font-semibold text-gray-700 mb-2">
                        Motif de contact
                      </label>
                      <div className="relative">
                        <select
                          id="reason"
                          name="reason"
                          value={formData.reason}
                          onChange={handleInputChange}
                          className="w-full pl-4 pr-10 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none"
                        >
                          <option value="parrainage">Parrainer un enfant</option>
                          <option value="don">Faire un don</option>
                          <option value="benevolat">Devenir bénévole</option>
                          <option value="partenariat">Partenariat d'entreprise</option>
                          <option value="autre">Autre</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="Parlez-nous de votre projet de parrainage ou de votre motivation..."
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Commencer le parrainage
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Indicateurs de confiance */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Sécurisé</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Confidentiel</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Réponse rapide</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Section Galerie Partenaires */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">Nos Partenaires en Action</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez nos partenaires et leurs actions à travers ces photos qui témoignent de leur engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              '/partenaire/IMG_7078.JPG',
              '/partenaire/IMG_7026.JPG',
              '/partenaire/IMG_7025.JPG',
              '/partenaire/IMG_7480.JPG',
              '/partenaire/IMG_7476.JPG',
              '/partenaire/IMG_7412.JPG',
              '/partenaire/IMG_7483.JPG',
              '/partenaire/IMG_7414.JPG',
              '/partenaire/IMG_7485.JPG',
              '/partenaire/IMG_7790.JPG',
            ].map((image, index) => (
              <AnimatedCard key={index} delay={index * 100}>
                <Card 
                  className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <CardContent className="p-0">
                    <div className="relative group">
                      <img
                        src={image}
                        alt={`Partenaire ${index + 1}`}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 text-white">
                          <p className="text-sm font-medium">Action Partenaire {index + 1}</p>
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

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

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
                    <h3 className="text-2xl font-bold">Parrainage Individuel</h3>
                  </div>
                  <p className="mb-6 text-white/90 leading-relaxed">
                    Parrainez un enfant spécifique et suivez son parcours personnel. Créez un lien unique et durable
                    avec votre filleul.
                  </p>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                    Parrainer un enfant
                  </Button>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={400}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                      <Handshake className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Partenariat Entreprise</h3>
                  </div>
                  <p className="mb-6 text-white/90 leading-relaxed">
                    Engagez votre entreprise dans une démarche solidaire. Parrainez plusieurs enfants et impliquez vos
                    équipes dans nos actions.
                  </p>
                  <Button className="bg-green-400 hover:bg-green-500 text-white font-semibold">
                    Partenariat entreprise
                  </Button>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </main>
  )
}
