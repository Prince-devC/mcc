"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Target, Users, Gift, Play, ArrowRight, Calendar, MapPin } from 'lucide-react'
import LoadingScreen from "@/app/components/LoadingScreen"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface RentreePourTousData {
  heroTitle: string
  heroImage: string
  title: string
  description: string
  mainMedia: {
    type: string
    imageUrl?: string
    youtubeUrl?: string
    videoUrl?: string
    alt: string
  }
  fundingGoal: number
  fundsRaised: number
  gallery: {
    type: string
    imageUrl?: string
    youtubeUrl?: string
    videoUrl?: string
    alt: string
  }[]
}

// Animated Card Component
function AnimatedCard({
  children,
  className = "",
  delay = 0,
  hoverColor = "blue",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  hoverColor?: "blue" | "yellow" | "red" | "green" | "purple"
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
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

  const hoverColors = {
    blue: "hover:shadow-blue-500/25 hover:border-blue-500/50",
    yellow: "hover:shadow-yellow-500/25 hover:border-yellow-500/50",
    red: "hover:shadow-red-500/25 hover:border-red-500/50",
    green: "hover:shadow-green-500/25 hover:border-green-500/50",
    purple: "hover:shadow-purple-500/25 hover:border-purple-500/50",
  }

  return (
    <div
      ref={cardRef}
      className={`
        transform transition-all duration-700 ease-out border border-transparent
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        ${hoverColors[hoverColor]}
        hover:shadow-2xl hover:-translate-y-2
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`transition-transform duration-300 ${isHovered ? "scale-[1.02]" : "scale-100"}`}>{children}</div>
    </div>
  )
}

// Animated Counter Component
function AnimatedCounter({ target, duration = 2000, suffix = "" }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const startCount = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(startCount + (target - startCount) * easeOutQuart))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return (
    <div ref={counterRef} className="text-2xl font-bold">
      {count.toLocaleString()}{suffix}
    </div>
  )
}

export default function RentreePourTous() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<RentreePourTousData | null>(null)
  const [selectedMainMedia, setSelectedMainMedia] = useState<{
    type: string
    imageUrl?: string
    youtubeUrl?: string
    videoUrl?: string
    alt: string
  } | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    message: ""
  })
  const [donationAmount, setDonationAmount] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/rentree-pour-tous")
        const result = await response.json()
        if (result.success) {
          setData(result.data)
          setSelectedMainMedia(result.data.mainMedia)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Donation:", donationAmount)
  }

  const handleGalleryItemClick = (item: any) => {
    if (!data) return

    // Sauvegarder le média principal actuel dans la galerie
    const newGallery = [...data.gallery]
    const mainMediaIndex = newGallery.findIndex(
      (g) => g.imageUrl === selectedMainMedia?.imageUrl || 
             g.videoUrl === selectedMainMedia?.videoUrl || 
             g.youtubeUrl === selectedMainMedia?.youtubeUrl
    )

    if (mainMediaIndex !== -1) {
      newGallery[mainMediaIndex] = selectedMainMedia
    } else {
      newGallery.push(selectedMainMedia)
    }

    // Mettre à jour les données
    setData({
      ...data,
      mainMedia: item,
      gallery: newGallery
    })
    setSelectedMainMedia(item)
  }

  if (isLoading || !data) {
    return <LoadingScreen />
  }

  const progressPercentage = (data.fundsRaised / data.fundingGoal) * 100

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      {/* Hero Section with animations */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={data.heroImage || "/placeholder.svg"}
            alt={data.heroTitle}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-customBlue/80 via-customBlue/60 to-customBlue/80"></div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              <span className="bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent">
                {data.heroTitle}
              </span>
            </h1>
            <div className="flex items-center justify-center gap-4 text-white/90 animate-fade-in-up animation-delay-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Campagne 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Bénin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Media Section */}
            <AnimatedCard delay={200} hoverColor="yellow">
              <div className="space-y-6">
                {/* Main Media */}
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                  {selectedMainMedia?.type === "youtube" ? (
                    <div className="relative w-full h-full">
                      <iframe
                        src={selectedMainMedia.youtubeUrl?.replace("watch?v=", "embed/")}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="w-full h-full rounded-2xl"
                        allowFullScreen
                      />
                      <div className="absolute top-4 left-4">
                        <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          YouTube
                        </div>
                      </div>
                    </div>
                  ) : selectedMainMedia?.type === "video" ? (
                    <div className="relative w-full h-full">
                      <video
                        src={selectedMainMedia.videoUrl}
                        className="w-full h-full object-cover rounded-2xl"
                        controls
                      />
                      <div className="absolute top-4 left-4">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Vidéo
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={selectedMainMedia?.imageUrl || "/placeholder.svg"}
                        alt={selectedMainMedia?.alt || "Image principale du projet"}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                </div>

                {/* Gallery Carousel */}
                <div className="relative">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {data.gallery.map((item, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                          <div 
                            className="relative h-32 rounded-xl overflow-hidden shadow-lg group me-2 cursor-pointer"
                            onClick={() => handleGalleryItemClick(item)}
                          >
                            {item.type === "youtube" ? (
                              <iframe
                                src={item.youtubeUrl?.replace("watch?v=", "embed/")}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                className="w-full h-full rounded-xl"
                                allowFullScreen
                              />
                            ) : item.type === "video" ? (
                              <video
                                src={item.videoUrl}
                                className="w-full h-full object-cover rounded-xl"
                                controls
                              />
                            ) : (
                              <Image
                                src={item.imageUrl || "/placeholder.svg"}
                                alt={item.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="flex justify-center gap-4 mt-4">
                      <CarouselPrevious className="relative left-0 top-0 translate-y-0 bg-white/90 hover:bg-white shadow-lg" />
                      <CarouselNext className="relative right-0 top-0 translate-y-0 bg-white/90 hover:bg-white shadow-lg" />
                    </div>
                  </Carousel>
                </div>
              </div>
            </AnimatedCard>

            {/* Project Information */}
            <AnimatedCard delay={400} hoverColor="blue">
              <div className="space-y-8">
                <div>
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-customYellow to-customYellow text-black text-sm font-semibold rounded-full mb-4">
                    Projet Éducatif
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                    {data.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">{data.description}</p>
                </div>

                {/* Funding Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl text-center border border-blue-200">
                    <div className="flex items-center justify-center mb-2">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <AnimatedCounter target={data.fundingGoal} suffix=" FCFA" />
                    <div className="text-sm text-gray-600 mt-1">Objectif</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl text-center border border-green-200">
                    <div className="flex items-center justify-center mb-2">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                    <AnimatedCounter target={data.fundsRaised} suffix=" FCFA" />
                    <div className="text-sm text-gray-600 mt-1">Collecté</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl text-center border border-purple-200">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <AnimatedCounter target={Math.round(progressPercentage)} suffix="%" />
                    <div className="text-sm text-gray-600 mt-1">Atteint</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progression du financement</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-customYellow via-yellow-500 to-customYellow rounded-full transition-all duration-1000 ease-out relative"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Donation Form */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Faire un don</h3>
                  <form onSubmit={handleDonation} className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <Input
                          type="number"
                          placeholder="10.000"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          className="pr-16 h-12 text-lg"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                          FCFA
                        </span>
                      </div>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-customYellow to-customYellow hover:from-yellow-600 hover:to-yellow-500 text-black px-8 h-12 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                      >
                        <Heart className="w-5 h-5" />
                        SOUTENIR
                      </Button>
                    </div>
                    
                    {/* Quick Amount Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      {[5000, 10000, 25000].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setDonationAmount(amount.toString())}
                          className="py-2 px-4 border border-gray-200 rounded-full text-sm hover:border-yellow-500 hover:bg-yellow-50 transition-colors"
                        >
                          {amount.toLocaleString()} FCFA
                        </button>
                      ))}
                    </div>
                  </form>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-customBlue/90 via-purple-900/80 to-customBlue/90"></div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <AnimatedCard delay={200}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ensemble, donnons-leur un meilleur avenir
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Chaque contribution compte pour offrir une éducation de qualité aux enfants qui en ont besoin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/partnership"
                className="group bg-gradient-to-r from-customYellow to-customYellow hover:from-yellow-600 hover:to-yellow-500 text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl inline-flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5 group-hover:animate-pulse" />
                DEVENIR PARRAIN
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group bg-white/10 backdrop-blur-sm border-2 border-white/50 hover:border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2">
                <Gift className="w-5 h-5" />
                FAIRE UN DON
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </AnimatedCard>
        </div>
      </section>
    </main>
  )
}
