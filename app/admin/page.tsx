"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useAdminAuth } from "./context/AdminAuthContext"
import AdminLogin from "./components/AdminLogin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  FileText,
  Users,
  Settings,
  ImageIcon,
  MessageSquare,
  Shield,
  UserCheck,
  BarChart3,
  Bell,
  Search,
  LogOut,
  ChevronRight,
  TrendingUp,
  Activity,
  Clock,
} from "lucide-react"
import { useRouter } from "next/navigation"

const navigationItems = [
  {
    title: "Pages",
    items: [
      { title: "Accueil", url: "/admin/pages/home", icon: Home },
      { title: "À propos", url: "/admin/pages/about", icon: FileText },
      { title: "Projets", url: "/admin/pages/projects", icon: BarChart3 },
      { title: "Partenariats", url: "/admin/pages/partnership", icon: Users },
    ],
  },
  {
    title: "Contenu",
    items: [
      { title: "Articles", url: "/admin/content/articles", icon: FileText },
      { title: "Médias", url: "/admin/content/media", icon: ImageIcon },
      { title: "Témoignages", url: "/admin/content/testimonials", icon: MessageSquare },
    ],
  },
  {
    title: "Paramètres",
    items: [
      { title: "Général", url: "/admin/settings/general", icon: Settings },
      { title: "Utilisateurs", url: "/admin/settings/users", icon: UserCheck },
      { title: "Sécurité", url: "/admin/settings/security", icon: Shield },
    ],
  },
]

const statsCards = [
  { title: "Total des pages", value: "12", change: "+2", icon: FileText, color: "from-blue-500 to-blue-600" },
  { title: "Articles publiés", value: "48", change: "+5", icon: FileText, color: "from-green-500 to-green-600" },
  { title: "Utilisateurs actifs", value: "1,234", change: "+12%", icon: Users, color: "from-purple-500 to-purple-600" },
  { title: "Médias uploadés", value: "156", change: "+8", icon: ImageIcon, color: "from-orange-500 to-orange-600" },
]

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
function AnimatedCounter({ target, duration = 2000 }: { target: string; duration?: number }) {
  const [count, setCount] = useState("0")
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

    // Extract numeric value from target string
    const numericValue = Number.parseInt(target.replace(/[^\d]/g, ""))
    if (isNaN(numericValue)) {
      setCount(target)
      return
    }

    let startTime: number
    const startCount = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(startCount + (numericValue - startCount) * easeOutQuart)

      // Preserve original formatting
      if (target.includes(",")) {
        setCount(currentCount.toLocaleString())
      } else {
        setCount(currentCount.toString())
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(target) // Ensure final value matches exactly
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return (
    <div ref={counterRef} className="text-2xl font-bold">
      {count}
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 mx-auto"></div>
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-customBlue absolute top-0 left-1/2 transform -translate-x-1/2"></div>
        </div>
        <p className="text-gray-600 font-medium">Chargement du dashboard...</p>
      </div>
    </div>
  )
}

function DashboardHeader({ userEmail, onLogout }: { userEmail: string; onLogout: () => void }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-sm px-4 shadow-sm">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Rechercher..."
            className="pl-9 border-gray-200 focus:border-customBlue focus:ring-customBlue/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-blue-50 hover:text-customBlue transition-colors"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-blue-50">
                <Avatar className="h-8 w-8 border-2 border-customBlue/20">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback className="bg-gradient-to-br from-customBlue to-blue-700 text-white">
                    {userEmail.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin</p>
                  <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

function DashboardContent() {
  const router = useRouter()

  return (
    <div className="flex-1 space-y-8 p-6 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 min-h-screen">
      {/* Animated particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/5 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <AnimatedCard delay={200}>
        <div className="relative">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-customBlue via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h2>
          <p className="text-gray-600 text-lg mt-2">Vue d'ensemble de votre administration</p>
          <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-br from-customYellow/20 to-yellow-500/20 rounded-full blur-xl"></div>
        </div>
      </AnimatedCard>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, index) => {
          const Icon = card.icon
          return (
            <AnimatedCard key={index} delay={300 + index * 100} hoverColor={index % 2 === 0 ? "blue" : "purple"}>
              <Card className="relative overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.color} opacity-10 rounded-full -mr-10 -mt-10`}
                ></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">{card.title}</CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${card.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
              </CardHeader>
              <CardContent>
                  <AnimatedCounter target={card.value} />
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-green-600 font-medium">{card.change}</span> depuis le mois dernier
                </p>
              </CardContent>
            </Card>
            </AnimatedCard>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {navigationItems.map((section, index) => (
          <AnimatedCard
            key={index}
            delay={600 + index * 150}
            hoverColor={index === 0 ? "blue" : index === 1 ? "green" : "purple"}
          >
            <Card className="relative overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -mr-16 -mt-16"></div>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-customBlue to-blue-700">
                    {section.title === "Pages" && <Home className="h-5 w-5 text-white" />}
                    {section.title === "Contenu" && <FileText className="h-5 w-5 text-white" />}
                    {section.title === "Paramètres" && <Settings className="h-5 w-5 text-white" />}
                  </div>
                  <span className="text-customBlue">{section.title}</span>
              </CardTitle>
              <CardDescription>Gérer {section.title.toLowerCase()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon
                return (
                  <Button
                    key={itemIndex}
                    variant="ghost"
                      className="w-full justify-start h-auto p-3 hover:bg-blue-50 hover:text-customBlue transition-all duration-200 group"
                    onClick={() => router.push(item.url)}
                  >
                      <div className="p-1.5 rounded-md bg-gray-100 group-hover:bg-blue-100 transition-colors mr-3">
                        <Icon className="h-4 w-4 text-gray-600 group-hover:text-customBlue transition-colors" />
                      </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{item.title}</div>
                    </div>
                      <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Button>
                )
              })}
            </CardContent>
          </Card>
          </AnimatedCard>
        ))}
      </div>

      {/* Recent Activity */}
      <AnimatedCard delay={900}>
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-customBlue">Activité récente</span>
            </CardTitle>
          <CardDescription>Dernières modifications apportées au système</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Nouvel article publié", time: "Il y a 2 heures", type: "success" },
              { action: "Utilisateur ajouté", time: "Il y a 4 heures", type: "info" },
              { action: "Paramètres mis à jour", time: "Il y a 1 jour", type: "warning" },
              { action: "Sauvegarde effectuée", time: "Il y a 2 jours", type: "success" },
            ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 group border border-gray-100 hover:border-blue-200"
                >
                  <div className="relative">
                    <div
                      className={`h-3 w-3 rounded-full ${
                    activity.type === "success"
                      ? "bg-green-500"
                      : activity.type === "info"
                        ? "bg-blue-500"
                        : activity.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                  }`}
                />
                    <div
                      className={`absolute inset-0 h-3 w-3 rounded-full animate-ping ${
                        activity.type === "success"
                          ? "bg-green-500"
                          : activity.type === "info"
                            ? "bg-blue-500"
                            : activity.type === "warning"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                      } opacity-20`}
                    />
                  </div>
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-customBlue transition-colors">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      activity.type === "success"
                        ? "border-green-200 text-green-700 bg-green-50"
                        : activity.type === "info"
                          ? "border-blue-200 text-blue-700 bg-blue-50"
                          : activity.type === "warning"
                            ? "border-yellow-200 text-yellow-700 bg-yellow-50"
                            : "border-gray-200 text-gray-700 bg-gray-50"
                    }`}
                  >
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </AnimatedCard>
    </div>
  )
}

export default function AdminDashboard() {
  const { isAuthenticated, adminUser, logout } = useAdminAuth()

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <DashboardHeader userEmail={adminUser || "admin"} onLogout={logout} />
      <DashboardContent />
    </div>
  )
}
 