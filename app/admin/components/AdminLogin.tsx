"use client"

import type React from "react"

import { useState } from "react"
import { useAdminAuth } from "../context/AdminAuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, User, Shield, AlertCircle } from "lucide-react"

// Animated particles component
const AnimatedParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  )
}

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="relative">
      <div className="w-6 h-6 border-2 border-white/30 rounded-full animate-spin"></div>
      <div className="absolute top-0 left-0 w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
)

// Animated card component
const AnimatedCard = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) => {
  return (
    <div className={`animate-fade-in-up ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default function AdminLogin() {
  const { login } = useAdminAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const success = await login(username, password)
      if (!success) {
        setError("Identifiants invalides. Veuillez vérifier vos informations de connexion.")
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la connexion. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-cyan-900/20" />
        <AnimatedParticles />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <AnimatedCard className="w-full max-w-md" delay={200}>
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Connexion Admin
              </CardTitle>
              <CardDescription className="text-white/70 text-lg">Accédez au panneau d'administration</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <AnimatedCard delay={100}>
                  <Alert variant="destructive" className="bg-red-500/20 border-red-500/30 backdrop-blur-sm">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-200">{error}</AlertDescription>
                  </Alert>
                </AnimatedCard>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatedCard delay={300}>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white/90 font-medium">
                      Nom d'utilisateur
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20 backdrop-blur-sm"
                        placeholder="Entrez votre nom d'utilisateur"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                </AnimatedCard>

                <AnimatedCard delay={400}>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white/90 font-medium">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20 backdrop-blur-sm"
                        placeholder="Entrez votre mot de passe"
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </AnimatedCard>

                <AnimatedCard delay={500}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={loading || !username.trim() || !password.trim()}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <LoadingSpinner />
                        <span>Connexion en cours...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        <span>Se connecter</span>
                      </div>
                    )}
                  </Button>
                </AnimatedCard>
              </form>

              {/* Security Notice */}
              <AnimatedCard delay={600}>
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-200">
                      <p className="font-medium mb-1">Connexion sécurisée</p>
                      <p className="text-blue-300/80">
                        Vos informations de connexion sont protégées par un chiffrement SSL/TLS.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
