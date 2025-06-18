"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Heart, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import LoadingScreen from "../components/LoadingScreen"
import { useRouter } from "next/navigation"

interface TeamMember {
  name: string
  role: string
  description: string
  image: string
}

interface Testimonial {
  name: string
  role: string
  content: string
  published: boolean
}

interface AboutData {
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
  partners: any[]
  testimonials: Testimonial[]
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

function chunkArray(arr: any[], size: number) {
  const res = []
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size))
  }
  return res
}

// Données par défaut
const defaultAboutData: AboutData = {
  heroTitle: "Qui sommes – nous ?",
  heroSubtitle: "Découvrez notre histoire, notre mission et notre équipe dévouée à l'éducation des enfants.",
  heroImage: "about/qui_sommes_nous.png",
  historyTitle: "Notre Histoire",
  historyContent: `Historique et expériences de l'ONG

  L'ONG MCC, initialement connue sous le nom de GBEMENOU Charity, est née d'une histoire de résilience, d'injustice sociale et d'un profond désir de transformation.

  Le parcours du fondateur
  Son fondateur, GBEMENOU Drice Aurel, a vécu une enfance marquée par la précarité et l'abandon. Après avoir perdu son père en 2006, puis sa mère en 2012, seulement trois jours après sa proclamation et ses résultats au BEPC, il a connu l'orphelinat, puis la rue. Placé en internat par un oncle, il a dû, en cache sous l'aumônerie scolaire, lutter ici et là pour survivre, réaliser ses projets et enfin soutenir d'autres enfants.

  De son expérience, il tire l'inspiration sociale de son engagement envers les enfants vulnérables qui savent tout l'instant, leur sort dépend d'un geste, d'un sourire, d'un partage, d'un accompagnement. Comme de nombreux enfants, il a croisé la route de personnes qui ont su lui redonner espoir et sens à sa vie, à l'instar du pasteur Abidjo, qui a été à ses côtés.

  Le déclic : un geste de solidarité qui change tout
  Un soir, touché par la détresse des enfants vivant dans l'enceinte du marché de Dantokpa, Aurel a décidé d'agir. Il a rassemblé ces enfants pour leur offrir un repas, les laver et leur adresser des mots d'encouragement. Ce soir-là, plus de 200 enfants vulnérables ont bénéficié de son action. Ce moment de partage fut le déclencheur. Ce qui n'était au départ qu'un groupe de compassion est rapidement devenu une véritable mission de vie. GBEMENOU Charity était née, avec un objectif clair : redonner espoir et opportunités aux enfants en situation difficile.

  Un contexte social et économique difficile
  À l'époque de la création de l'ONG, la situation des enfants et jeunes orphelins faisait l'écho d'une montée alarmante du nombre d'enfants des rues, conséquence de la pauvreté des familles, de l'absence de politiques publiques efficaces et de la précarité de l'enfance. Les jeunes issus de milieux défavorisés étaient confrontés à l'exclusion, à la marginalisation et à l'absence de perspectives. Les rares structures d'accueil existantes étaient saturées et inadaptées, et les enfants étaient souvent livrés à eux-mêmes, exposés à toutes sortes de dangers.

  C'est dans ce contexte que l'ONG MCC a vu le jour, avec la volonté de faire la différence et d'apporter une aide concrète à ceux qui en ont le plus besoin.`,
  historyImage: "/about/hero_bg.jpg",
  teamTitle: "Notre Équipe",
  teamSubtitle: "Derrière chaque action de MCC se trouvent des femmes et des hommes passionnés, engagés et profondément convaincus de la nécessité d'agir pour améliorer le sort des enfants vulnérables. Notre équipe est composée de bénévoles et de professionnels aux compétences diverses et complémentaires, tous animés par la même volonté de faire la différence. Découvrez ci-dessous qui sont les piliers de notre association.",
  members: [
    {
      name: "Aurel GBEMENOU",
      role: "Directeur Exécutif de MCC",
      description: "Spécialiste en formalisation et impact social des ONG, coaching et accompagnement, structuration et reconnaissance légale.",
      image: "about/hero_bg.jpg"
    },
    {
      name: "Estelle DEHA",
      role: "Chargée de Programme 2 MCC",
      description: "Informaticienne de gestion de formation, développement informatique et pilotage de projet.",
      image: "about/estelle.jpg"
    },
    {
      name: "Sapience LAOUROU",
      role: "Responsable Suivi Évaluation",
      description: "Expert en monitoring de projet, analyse des politiques publiques, genre et inclusion.",
      image: "about/sapience.jpg"
    },
    {
      name: "Mabelle ODE",
      role: "Responsable Comptabilité",
      description: "Experte comptable stagiaire, responsable comptabilité au sein de MCC.",
      image: "about/mabelle.jpg"
    },
    {
      name: "Rebecca EDOH",
      role: "Chargée de Formation et d'Éducation",
      description: "Spécialiste en agronomie, nutrition, sciences et technologie alimentaire, leadership et communication.",
      image: "about/rebecca.jpg"
    },
    {
      name: "Manuela FATONDJI",
      role: "Responsable Trésorerie",
      description: "Auditeur financier et comptable, responsable trésorerie au sein de MCC.",
      image: "about/manuella.jpg"
    },
    {
      name: "Huguette BOSSE",
      role: "Responsable Communication",
      description: "Spécialiste en stratégie commerciale et communication, organisation de projets et accompagnement des jeunes et femmes vulnérables.",
      image: "about/huguette.jpg"
    },
  ],
  partnersTitle: "Nos Partenaires",
  partnersSubtitle: "Ensemble pour un impact plus grand",
  partners: [
    {
      name: "Partenaire 1",
      logo: "/images/partners/partner-1.png"
    },
    {
      name: "Partenaire 2",
      logo: "/images/partners/partner-2.png"
    }
  ],
  testimonials: [
    {
      name: "Marie Diop",
      role: "Bénévole",
      content: "Travailler avec MCC a été une expérience enrichissante. Voir l'impact positif sur la vie des enfants est vraiment gratifiant.",
      published: true
    },
    {
      name: "Ibrahim Ba",
      role: "Parent",
      content: "Grâce à MCC, mon enfant a accès à une éducation de qualité et à un environnement d'apprentissage stimulant.",
      published: true
    }
  ]
}

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [slide, setSlide] = useState(0)
  const [testimonialSlide, setTestimonialSlide] = useState(0)
  const [membersPerSlide, setMembersPerSlide] = useState(3)
  const [client, setClient] = useState(false)
  const [aboutData, setAboutData] = useState<AboutData>(defaultAboutData)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/about")
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données")
        }
        const result = await response.json()
        if (result.success) {
          setAboutData(result.data)
        } else {
          throw new Error(result.error || "Erreur lors de la récupération des données")
        }
      } catch (error) {
        console.error("Error fetching about data:", error)
        setError("Impossible de charger les données. Affichage des données par défaut.")
        // Les données par défaut sont déjà définies dans l'état initial
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    setClient(true)
    function handleResize() {
      if (window.innerWidth < 640) setMembersPerSlide(1)
      else if (window.innerWidth < 768) setMembersPerSlide(2)
      else setMembersPerSlide(3)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const slides = aboutData ? chunkArray(aboutData.members, membersPerSlide) : []
  const maxSlide = slides.length - 1
  const maxTestimonialSlide = aboutData?.testimonials.length ? aboutData.testimonials.length - 1 : 0

  if (isLoading || !aboutData) {
    return <LoadingScreen />
  }
  if (!client) return null

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
              <h1 className="text-5xl lg:text-6xl font-bold text-blue-500 mb-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">{aboutData.heroTitle}</h1>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">{aboutData.heroSubtitle}</p>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full text-lg" onClick={() => router.push('/projects')}>
                Nos projets <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </AnimatedCard>

          {/* Image droite */}
          <AnimatedCard delay={400}>
            <div className="relative">
              <div className="bg-blue-50 rounded-3xl p-8">
                <img
                  src={"about/qui_sommes_nous.png"}
                  alt={aboutData.heroTitle}
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              {/* Élément décoratif */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-lg transform rotate-45"></div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Section Histoire - Style identique à la section "Qui sommes-nous" */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedCard delay={200}>
            <div className="relative">
              <img
                src={aboutData.historyImage || "/placeholder.svg"}
                alt="Notre Histoire"
                className="w-full h-auto rounded-3xl shadow-lg"
              />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-green-500 rounded-lg transform rotate-45"></div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <div>
              <h2 className="text-4xl font-bold text-blue-500 mb-6">{aboutData.historyTitle}</h2>
              <p className="text-gray-700 mb-8 leading-relaxed whitespace-pre-line text-justify space-y-4">
                {aboutData.historyContent.split('\n\n').map((paragraph, index) => {
                  const isSubtitle = paragraph.startsWith('Le') || paragraph.startsWith('Un') || paragraph.startsWith('Historique') || paragraph.startsWith('C\'est');
                  const isHighlight = paragraph.includes('GBEMENOU Drice Aurel') || paragraph.includes('GBEMENOU Charity') || paragraph.includes('200 enfants') || paragraph.includes('pasteur Abidjo');
                  
                  return (
                    <p key={index} className={`${isSubtitle ? 'font-semibold text-blue-600 text-lg' : ''} ${isHighlight ? 'bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400' : ''}`}>
                      {paragraph.split(' ').map((word, wordIndex) => {
                        if (word.includes('GBEMENOU')) {
                          return <span key={wordIndex} className="text-blue-600 font-semibold">{word} </span>;
                        }
                        if (word.includes('200')) {
                          return <span key={wordIndex} className="text-green-600 font-bold">{word} </span>;
                        }
                        if (word.includes('pasteur')) {
                          return <span key={wordIndex} className="text-purple-600 font-medium">{word} </span>;
                        }
                        if (word.includes('Dantokpa')) {
                          return <span key={wordIndex} className="text-orange-600 font-medium">{word} </span>;
                        }
                        if (paragraph.includes('contexte social et économique difficile')) {
                          return <span key={wordIndex} className="text-blue-600 font-semibold">{word} </span>;
                        }
                        return <span key={wordIndex}>{word} </span>;
                      })}
                    </p>
                  );
                })}
              </p>

              <Card className="bg-white border-l-4 border-blue-500 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-3">Notre Mission</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Protéger, accompagner et insérer les enfants, jeunes et femmes vulnérables afin de faire d'eux des modèles qui influencent positivement la société.
                  </p>
                </CardContent>
              </Card>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Section Équipe - Style identique à la section Projets */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">{aboutData.teamTitle}</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">{aboutData.teamSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedCard delay={200}>
              <div>
                <div className="space-y-6">
                  {slides[slide]?.map((member: TeamMember, idx: number) => (
                    <Card key={idx} className={`border-none ${idx % 2 === 0 ? "bg-blue-50" : "bg-green-50"}`}>
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="relative w-16 h-16 overflow-hidden rounded-full flex-shrink-0">
                          <img
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl mb-1 text-gray-900">{member.name}</h3>
                          <p className="text-sm text-blue-600 mb-2 font-medium">{member.role}</p>
                          <p className="text-gray-700 leading-relaxed text-sm">{member.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Navigation de l'équipe */}
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSlide((prev) => Math.max(0, prev - 1))}
                    disabled={slide === 0}
                    className="rounded-full border-blue-200 hover:bg-blue-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  <div className="flex gap-2">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSlide(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          idx === slide ? "bg-blue-500 scale-125" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSlide((prev) => Math.min(maxSlide, prev + 1))}
                    disabled={slide === maxSlide}
                    className="rounded-full border-blue-200 hover:bg-blue-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={400}>
              <div className="relative">
                <div className="bg-yellow-50 rounded-3xl p-8">
                  <img
                    src="about/image-about.png?height=400&width=500"
                    alt="Notre équipe"
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-lg transform rotate-45"></div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Section Témoignages - Style identique à la section Valeurs clés */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">Témoignages</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            {aboutData.testimonials.length > 0 && (
              <AnimatedCard delay={200}>
                <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <svg
                        className="w-12 h-12 text-yellow-400 opacity-50 mx-auto"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                    </div>
                    <p className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                      {aboutData.testimonials[testimonialSlide]?.content}
                    </p>
                    <div className="text-blue-500 font-bold text-lg">
                      {aboutData.testimonials[testimonialSlide]?.name}
                    </div>
                    <div className="text-gray-600">{aboutData.testimonials[testimonialSlide]?.role}</div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            )}

            {/* Navigation des témoignages */}
            {aboutData.testimonials.length > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTestimonialSlide((prev) => Math.max(0, prev - 1))}
                  disabled={testimonialSlide === 0}
                  className="rounded-full border-blue-200 hover:bg-blue-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="flex gap-2">
                  {aboutData.testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTestimonialSlide(idx)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === testimonialSlide ? "bg-blue-500 scale-125" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTestimonialSlide((prev) => Math.min(maxTestimonialSlide, prev + 1))}
                  disabled={testimonialSlide === maxTestimonialSlide}
                  className="rounded-full border-blue-200 hover:bg-blue-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section Newsletter - Style identique à la section CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute top-10 right-10 w-16 h-16 bg-yellow-400 rounded-lg transform rotate-45 opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white rounded-full opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedCard delay={200}>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white max-w-4xl mx-auto">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold">Restez connecté avec nous</h3>
                </div>
                <p className="mb-8 text-white/90 leading-relaxed text-lg">
                  Souscrivez à notre newsletter pour recevoir les dernières nouvelles et initiatives pour soutenir les
                  enfants de notre orphelinat.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="px-6 py-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-white placeholder:text-white/70"
                  />
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-full w-full sm:w-auto">
                    <Heart className="w-5 h-5 mr-2" />
                    S'inscrire
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
      </section>
    </main>
  )
}
