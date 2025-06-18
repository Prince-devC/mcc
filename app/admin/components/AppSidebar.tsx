"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  Home,
  FileText,
  Users,
  Settings,
  Shield,
  BarChart3,
  ChevronRight,
  Gift,
  Group,
  GraduationCap,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAdminAuth } from "../context/AdminAuthContext"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Pages",
    items: [
      { title: "Accueil", url: "/admin/pages/home", icon: Home },
      { title: "À propos", url: "/admin/pages/about", icon: FileText },
      { title: "Projets", url: "/admin/pages/projects", icon: BarChart3 },
      { title: "Support", url: "/admin/pages/support", icon: Users },
      { title: "Partenariats", url: "/admin/pages/partnership", icon: Group },
      { title: "Faire un don", url: "/admin/pages/donate", icon: Gift },
      { title: "Rentrez pour tous", url: "/admin/pages/rentree-pour-tous", icon: GraduationCap },
    ],
  },
  {
    title: "Paramètres",
    items: [
      { title: "Général", url: "/admin/settings/general", icon: Settings },
      { title: "Sécurité", url: "/admin/settings/security", icon: Shield },
    ],
  },
]

export default function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { logout } = useAdminAuth()
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize expanded state based on current path
  useEffect(() => {
    const initialExpandedState: Record<string, boolean> = {}
    navigationItems.forEach((group) => {
      // Tous les groupes sont dépliés par défaut
      initialExpandedState[group.title] = true
    })
    setExpandedGroups(initialExpandedState)
    setIsLoaded(true)
  }, [pathname])

  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }))
  }

  const isItemActive = (url: string) => {
    return pathname === url
  }

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out transform lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          "lg:relative lg:z-0",
        )}
      >
        <Sidebar className="h-screen border-r bg-gradient-to-b from-white to-gray-50 shadow-lg w-64">
          <SidebarHeader className="border-b border-gray-100">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-customBlue to-blue-700 text-white shadow-lg">
                <Settings className="h-5 w-5" />
              </div>
              <div className="grid flex-1 text-left">
                <span className="truncate font-bold text-customBlue text-lg">Admin Dashboard</span>
                <span className="truncate text-xs text-gray-500">Gestion du contenu</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-0">
            {navigationItems.map((group, groupIndex) => (
              <SidebarGroup
                key={group.title}
                className={isLoaded ? "animate-fade-in-up" : ""}
                style={{
                  animationDelay: `${groupIndex * 100}ms`,
                }}
              >
                <div
                  className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => toggleGroup(group.title)}
                >
                  <SidebarGroupLabel className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
                    {group.title}
                  </SidebarGroupLabel>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-gray-500 transition-transform duration-200",
                      expandedGroups[group.title] ? "transform rotate-180" : "",
                    )}
                  />
                </div>

                <SidebarGroupContent
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    expandedGroups[group.title] ? "max-h-96" : "max-h-0",
                  )}
                >
                  <SidebarMenu>
                    {group.items.map((item, itemIndex) => {
                      const Icon = item.icon
                      const active = isItemActive(item.url)
                      return (
                        <SidebarMenuItem
                          key={item.title}
                          className={cn(
                            "transition-all duration-300 ease-in-out",
                            isLoaded ? "animate-fade-in-up" : "",
                            active ? "bg-blue-50" : "",
                          )}
                          style={{ animationDelay: `${groupIndex * 100 + itemIndex * 50}ms` }}
                        >
                          <SidebarMenuButton
                            onClick={() => {
                              router.push(item.url)
                              setIsMobileMenuOpen(false)
                            }}
                            className={cn(
                              "w-full group transition-all duration-200 hover:bg-blue-50",
                              active ? "bg-gradient-to-r from-blue-50 to-transparent border-l-4 border-customBlue" : "",
                            )}
                          >
                            <div
                              className={cn(
                                "flex items-center justify-center h-8 w-8 rounded-md transition-all duration-200",
                                active
                                  ? "bg-gradient-to-br from-customBlue to-blue-700 text-white shadow-md"
                                  : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700",
                              )}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <span
                              className={cn(
                                "font-medium transition-colors duration-200",
                                active ? "text-customBlue" : "text-gray-700 group-hover:text-customBlue",
                              )}
                            >
                              {item.title}
                            </span>
                            <ChevronRight
                              className={cn(
                                "ml-auto h-4 w-4 transition-transform duration-200",
                                active ? "text-customBlue opacity-100" : "opacity-50 group-hover:opacity-100",
                                "group-hover:translate-x-1",
                              )}
                            />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <div className="mt-auto p-4 border-t border-gray-100">
            <button
              onClick={logout}
              className="w-full bg-gradient-to-r from-customBlue to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </div>
        </Sidebar>
      </div>
    </>
  )
}
