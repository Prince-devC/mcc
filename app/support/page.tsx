"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { User, Mail, Phone, Briefcase, Send, Heart, Users, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import LoadingScreen from "../components/LoadingScreen"

interface SupportData {
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
  phone: string
  profession: string
}

// Données par défaut pour la page support
const defaultSupportData: SupportData = {
  id: "1",
  heroTitle: "Rejoignez Notre Équipe",
  heroImage: "section/soutenir.jpeg",
  title: "Devenez Bénévole",
  description: "Rejoignez notre équipe de bénévoles dévoués et participez à nos actions solidaires. Ensemble, nous pouvons faire la différence dans la vie des enfants et des familles que nous accompagnons. Votre engagement, même ponctuel, peut transformer des vies.",
  image: "/images/cta.jpg",
  formTitle: "Rejoignez Notre Équipe de Bénévoles",
  formDescription: "Devenez bénévole et participez à nos actions solidaires. Que vous ayez quelques heures par semaine ou que vous souhaitiez vous engager ponctuellement, votre aide est précieuse. Ensemble, nous pouvons faire la différence dans la vie des enfants et des familles que nous accompagnons."
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

export default function Support() {
  const [isLoading, setIsLoading] = useState(true)
  const [supportData, setSupportData] = useState<SupportData>(defaultSupportData)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    profession: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/support")
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données")
        }
        const result = await response.json()
        if (result.success) {
          setSupportData(result.data)
        } else {
          throw new Error(result.error || "Erreur lors de la récupération des données")
        }
      } catch (error) {
        console.error("Error fetching support data:", error)
        setError("Impossible de charger les données. Affichage des données par défaut.")
        // Les données par défaut sont déjà définies dans l'état initial
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setFormData({ name: "", email: "", phone: "", profession: "" })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      setSubmitError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading || !supportData) {
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
              <h1 className="text-5xl lg:text-6xl font-bold text-blue-500 mb-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">{supportData.heroTitle}</h1>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">{supportData.description}</p>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full text-lg">
                Rejoindre l'équipe <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </AnimatedCard>

          {/* Image droite */}
          <AnimatedCard delay={400}>
            <div className="relative">
              <div className="bg-blue-50 rounded-3xl p-8">
                <img
                  src={supportData.heroImage || "/placeholder.svg"}
                  alt={supportData.heroTitle}
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              {/* Élément décoratif */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-lg transform rotate-45"></div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Section Statistiques - Style identique à la section Valeurs clés */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">Notre Impact</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedCard delay={200}>
              <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-3 text-blue-500">200+</div>
                  <p className="text-gray-700 leading-relaxed">
                    Bénévoles actifs qui donnent de leur temps pour nos causes
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={400}>
              <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-3 text-green-500">1000+</div>
                  <p className="text-gray-700 leading-relaxed">Vies transformées grâce à l'engagement de nos équipes</p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={600}>
              <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-3 text-yellow-500">50+</div>
                  <p className="text-gray-700 leading-relaxed">Projets réalisés avec succès dans la communauté</p>
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
                src={supportData.image || "/placeholder.svg"}
                alt="Équipe de bénévoles"
                className="w-full h-auto rounded-3xl shadow-lg"
              />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-green-500 rounded-lg transform rotate-45"></div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <div>
              <h2 className="text-4xl font-bold text-blue-500 mb-6">
                {supportData.formTitle || "Rejoignez Notre Équipe"}
              </h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                {supportData.formDescription ||
                  "Devenez bénévole et participez à nos actions solidaires. Ensemble, nous pouvons faire la différence."}
              </p>

              <Card className="bg-white border-l-4 border-blue-500 shadow-lg">
                <CardContent className="p-6">
                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Merci ! Votre candidature a été envoyée avec succès.
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
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Numéro de téléphone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="+237 XXX XXX XXX"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="profession" className="block text-sm font-semibold text-gray-700 mb-2">
                        Profession
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="profession"
                          name="profession"
                          value={formData.profession}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Votre profession"
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
                          Rejoindre l'équipe
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </AnimatedCard>
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
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Bénévolat Ponctuel</h3>
                  </div>
                  <p className="mb-6 text-white/90 leading-relaxed">
                    Participez à nos événements et actions ponctuelles. Donnez de votre temps selon votre disponibilité
                    pour soutenir nos causes.
                  </p>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                    S'engager ponctuellement
                  </Button>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={400}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Bénévolat Régulier</h3>
                  </div>
                  <p className="mb-6 text-white/90 leading-relaxed">
                    Rejoignez notre équipe permanente de bénévoles. Engagez-vous sur le long terme pour un impact
                    durable dans la communauté.
                  </p>
                  <Button className="bg-green-400 hover:bg-green-500 text-white font-semibold">
                    S'engager régulièrement
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
