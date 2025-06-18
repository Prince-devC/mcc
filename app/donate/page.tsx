"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Heart,
  Sparkles,
  Shield,
  ChevronDown,
  Send,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import LoadingScreen from "../components/LoadingScreen"

interface DonateData {
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  title: string
  description: string
  benefits: { text: string }[]
  infoTitle: string
  infoContent: { title: string; content: string }[]
}

// Données par défaut pour la page donate
const defaultDonateData: DonateData = {
  heroTitle: "Faites un Don",
  heroSubtitle: "Votre générosité change des vies. Chaque don, même modeste, contribue à offrir un avenir meilleur aux enfants que nous accompagnons.",
  heroImage: "section/faire_don.jpg",
  title: "Soutenez Notre Mission",
  description: "Votre don nous permet de continuer notre mission auprès des enfants vulnérables. Ensemble, nous pouvons faire la différence.",
  benefits: [
    { text: "Éducation de qualité pour les enfants défavorisés" },
    { text: "Soins de santé et nutrition pour les familles" },
    { text: "Formation professionnelle pour les jeunes" },
    { text: "Soutien psychologique et accompagnement social" },
    { text: "Développement de projets communautaires" },
    { text: "Urgences humanitaires et aide d'urgence" }
  ],
  infoTitle: "Informations Importantes",
  infoContent: [
    {
      title: "Déduction Fiscale",
      content: "Vos dons sont déductibles de vos impôts à hauteur de 66% du montant versé, dans la limite de 20% de votre revenu imposable."
    },
    {
      title: "Transparence",
      content: "Nous nous engageons à utiliser vos dons de manière transparente et efficace. Vous recevrez des rapports réguliers sur l'utilisation de vos fonds."
    },
    {
      title: "Sécurité",
      content: "Vos informations personnelles et vos données de paiement sont protégées par les plus hauts standards de sécurité."
    },
    {
      title: "Impact",
      content: "95% de vos dons sont directement alloués à nos programmes sur le terrain. Seuls 5% sont utilisés pour les frais administratifs."
    }
  ]
}

const donationAmounts = [
  { amount: 10, label: "10€" },
  { amount: 25, label: "25€" },
  { amount: 50, label: "50€" },
  { amount: 100, label: "100€" },
  { amount: 250, label: "250€" },
  { amount: 500, label: "500€" },
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

export default function DonatePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [donateData, setDonateData] = useState<DonateData>(defaultDonateData)
  const [error, setError] = useState<string | null>(null)
  const [selectedAmount, setSelectedAmount] = useState<number>(50)
  const [customAmount, setCustomAmount] = useState("")
  const [isMonthly, setIsMonthly] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/donate")
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données")
        }
        const result = await response.json()
        if (result.success) {
          setDonateData(result.data)
        } else {
          throw new Error(result.error || "Erreur lors de la récupération des données")
        }
      } catch (error) {
        console.error("Error fetching donate data:", error)
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
      console.log({
        amount: selectedAmount || customAmount,
        isMonthly,
        ...formData,
      })

      setSubmitSuccess(true)

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      setSubmitError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
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
              <h1 className="text-5xl lg:text-6xl font-bold text-blue-500 mb-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">{donateData.heroTitle}</h1>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">{donateData.heroSubtitle}</p>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full text-lg">
                Faire un don <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </AnimatedCard>

          {/* Image droite */}
          <AnimatedCard delay={400}>
            <div className="relative">
              <div className="bg-blue-50 rounded-3xl p-8">
                <img
                  src={donateData.heroImage || "/placeholder.svg"}
                  alt={donateData.heroTitle}
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              {/* Élément décoratif */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-lg transform rotate-45"></div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Section Impact des Dons - Style identique à la section Valeurs clés */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">Votre Impact</h2>
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
                    Votre don change directement la vie des enfants dans le besoin et leur offre un avenir meilleur.
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={400}>
              <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xl font-bold mb-3 text-green-500">Transparence Totale</div>
                  <p className="text-gray-700 leading-relaxed">
                    Suivez l'utilisation de vos dons et leur impact concret grâce à nos rapports détaillés.
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={600}>
              <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xl font-bold mb-3 text-yellow-500">Déduction Fiscale</div>
                  <p className="text-gray-700 leading-relaxed">
                    Bénéficiez d'une réduction d'impôt de 66% du montant de votre don selon la législation.
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Section Formulaire de Don - Style identique à la section "Qui sommes-nous" */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <AnimatedCard delay={200}>
            <Card className="bg-white border-l-4 border-blue-500 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-blue-500 mb-6">Faire un Don</h3>

                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Merci pour votre générosité ! Votre don a été traité avec succès.
                  </div>
                )}

                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">{submitError}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Type de don */}
                  <div className="bg-gray-50 p-1 rounded-full flex mb-6">
                    <button
                      type="button"
                      className={`flex-1 py-3 px-4 rounded-full font-medium transition-all duration-300 ${
                        !isMonthly
                          ? "bg-yellow-400 text-black shadow-lg"
                          : "bg-transparent text-gray-600 hover:bg-white/50"
                      }`}
                      onClick={() => setIsMonthly(false)}
                    >
                      Don unique
                    </button>
                    <button
                      type="button"
                      className={`flex-1 py-3 px-4 rounded-full font-medium transition-all duration-300 ${
                        isMonthly
                          ? "bg-yellow-400 text-black shadow-lg"
                          : "bg-transparent text-gray-600 hover:bg-white/50"
                      }`}
                      onClick={() => setIsMonthly(true)}
                    >
                      Don mensuel
                    </button>
                  </div>

                  {/* Sélection du montant */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">Montant du don</label>
                    <div className="grid grid-cols-3 gap-3">
                      {donationAmounts.map(({ amount, label }) => (
                        <button
                          key={amount}
                          type="button"
                          className={`py-3 px-4 rounded-full border-2 transition-all duration-300 ${
                            selectedAmount === amount
                              ? "border-blue-500 bg-blue-500 text-white shadow-md"
                              : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                          onClick={() => {
                            setSelectedAmount(amount)
                            setCustomAmount("")
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        placeholder="Autre montant"
                        className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value)
                          setSelectedAmount(null)
                        }}
                      />
                    </div>
                  </div>

                  {/* Coordonnées personnelles */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Vos coordonnées</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Prénom"
                          required
                        />
                      </div>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Nom"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Email"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Téléphone"
                      />
                    </div>

                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Adresse"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Ville"
                      />
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Code postal"
                      />
                    </div>

                    <div className="relative">
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none"
                      >
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Suisse">Suisse</option>
                        <option value="Canada">Canada</option>
                        <option value="Autre">Autre</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
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
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {isMonthly ? "Faire un don mensuel" : "Faire un don"}
                      </>
                    )}
                  </Button>

                  {/* Indicateurs de confiance */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Paiement sécurisé</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Déduction fiscale</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Transparence</span>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <div className="space-y-8">
              {/* Avantages */}
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-500 mb-4">Votre Impact</h3>
                  <ul className="space-y-3">
                    {donateData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{benefit.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Contenu informatif */}
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-500 mb-4">{donateData.infoTitle}</h3>
                  <div className="space-y-4">
                    {donateData.infoContent.map((info, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-gray-800 mb-2">{info.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{info.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Statistiques */}
              <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Notre Impact en Chiffres</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">1,500+</div>
                      <div className="text-sm text-white/80">Enfants soutenus</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">25+</div>
                      <div className="text-sm text-white/80">Projets financés</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">12</div>
                      <div className="text-sm text-white/80">Pays d'intervention</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">95%</div>
                      <div className="text-sm text-white/80">Fonds alloués aux projets</div>
                    </div>
                  </div>
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
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Don Ponctuel</h3>
                  </div>
                  <p className="mb-6 text-white/90 leading-relaxed">
                    Faites un don unique pour soutenir immédiatement nos actions et aider les enfants dans le besoin.
                  </p>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                    Faire un don unique
                  </Button>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={400}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Don Mensuel</h3>
                  </div>
                  <p className="mb-6 text-white/90 leading-relaxed">
                    Engagez-vous sur la durée avec un don mensuel pour un impact continu et durable dans nos projets.
                  </p>
                  <Button className="bg-green-400 hover:bg-green-500 text-white font-semibold">Don mensuel</Button>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </main>
  )
}
