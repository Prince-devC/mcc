"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Heart, ArrowUp } from "lucide-react"

// Données par défaut pour le footer
const defaultFooterData = {
  logo: "/images/images_logo.png",
  siteName: "MCC",
  siteDescription: "Mission Chrétienne pour les Enfants - Protéger, accompagner et insérer les enfants, jeunes et femmes vulnérables",
  contactEmail: "contact@mcc.org",
  contactPhone: "+221 XX XXX XX XX",
  address: "Dakar, Sénégal",
  facebookUrl: "https://facebook.com/mcc",
  twitterUrl: "https://twitter.com/mcc",
  instagramUrl: "https://instagram.com/mcc",
  linkedinUrl: "https://linkedin.com/company/mcc",
  youtubeUrl: "https://youtube.com/mcc"
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

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
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

// Composant bouton retour en haut
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-blue-500 to-purple-500 
        text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300
        ${isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-0"}
        hover:scale-110 hover:rotate-12
      `}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}

export default function Footer() {
  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
  }

  const socialLinks = [
    { name: "facebook", url: defaultFooterData.facebookUrl, color: "hover:text-blue-400" },
    { name: "twitter", url: defaultFooterData.twitterUrl, color: "hover:text-sky-400" },
    { name: "instagram", url: defaultFooterData.instagramUrl, color: "hover:text-pink-400" },
    { name: "linkedin", url: defaultFooterData.linkedinUrl, color: "hover:text-blue-600" },
    { name: "youtube", url: defaultFooterData.youtubeUrl, color: "hover:text-red-500" },
  ]

  return (
    <>
      <ScrollToTop />
      <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        {/* Formes géométriques décoratives */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-16 h-16 bg-yellow-400/20 rounded-lg transform rotate-45 animate-pulse"></div>
          <div
            className="absolute bottom-40 left-20 w-24 h-24 bg-green-500/20 rounded-full animate-bounce"
            style={{ animationDuration: "3s" }}
          ></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-blue-500/10 rounded-lg transform rotate-12"></div>
          <div
            className="absolute bottom-20 right-40 w-12 h-12 bg-purple-400/30 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-40 left-1/3 w-8 h-8 bg-yellow-400/40 rounded-lg transform rotate-45 animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "4s" }}
          ></div>
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Logo et Description */}
            <AnimatedCard delay={200} className="lg:col-span-1">
              <div className="space-y-6">
                <div className="group">
                  <div className="relative inline-block">
                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-green-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <Image
                      src={defaultFooterData.logo}
                      alt={defaultFooterData.siteName}
                      width={120}
                      height={120}
                      className="relative h-16 w-auto transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                    {defaultFooterData.siteName}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm">{defaultFooterData.siteDescription}</p>
                </div>
              </div>
            </AnimatedCard>

            {/* Liens Rapides */}
            <AnimatedCard delay={400} className="lg:col-span-1">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white relative">
                  Liens Rapides
                  <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                </h3>
                <ul className="space-y-3">
                  {[
                    { href: "/", label: "Accueil" },
                    { href: "/about", label: "À propos" },
                    { href: "/projects", label: "Projets" },
                    { href: "/support", label: "Nous soutenir" },
                    { href: "/partnership", label: "Partenariat" },
                    { href: "/donate", label: "Faire un don" },
                  ].map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="group flex items-center text-gray-300 hover:text-white transition-all duration-300"
                      >
                        <div className="w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-green-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-3 rounded-full"></div>
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>

            {/* Contact */}
            <AnimatedCard delay={600} className="lg:col-span-1">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white relative">
                  Contact
                  <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                </h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href={`mailto:${defaultFooterData.contactEmail}`}
                      className="group flex items-center text-gray-300 hover:text-white transition-all duration-300"
                    >
                      <Mail className="w-5 h-5 mr-3 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        {defaultFooterData.contactEmail}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${defaultFooterData.contactPhone}`}
                      className="group flex items-center text-gray-300 hover:text-white transition-all duration-300"
                    >
                      <Phone className="w-5 h-5 mr-3 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        {defaultFooterData.contactPhone}
                      </span>
                    </a>
                  </li>
                  <li>
                    <div className="group flex items-start text-gray-300">
                      <MapPin className="w-5 h-5 mr-3 text-blue-400 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        {defaultFooterData.address}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </AnimatedCard>

            {/* Réseaux Sociaux */}
            <AnimatedCard delay={800} className="lg:col-span-1">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white relative">
                  Suivez-nous
                  <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-400 to-yellow-400 rounded-full"></div>
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = socialIcons[social.name as keyof typeof socialIcons]
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          group p-3 bg-white/10 backdrop-blur-sm rounded-full
                          hover:bg-white/20 transition-all duration-300 transform hover:scale-110
                          ${social.color}
                        `}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Section inférieure */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>Fait avec amour pour les enfants</span>
              </div>
              <div className="text-gray-300 text-sm">
                © 2024 {defaultFooterData.siteName}. Tous droits réservés.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
