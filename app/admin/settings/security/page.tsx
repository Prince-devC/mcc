"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  Save,
  Shield,
  Lock,
  Key,
  AlertTriangle,
  Database,
  Trash2,
  Plus,
  Activity,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SecuritySettings {
  twoFactorAuth: boolean
  sessionTimeout: number
  passwordExpiry: number
  maxLoginAttempts: number
  lockoutDuration: number
  allowedIPs: string[]
  sslEnabled: boolean
  backupEnabled: boolean
  backupFrequency: string
  backupRetention: number
}

const defaultSettings: SecuritySettings = {
  twoFactorAuth: false,
  sessionTimeout: 30,
  passwordExpiry: 90,
  maxLoginAttempts: 5,
  lockoutDuration: 15,
  allowedIPs: [],
  sslEnabled: true,
  backupEnabled: true,
  backupFrequency: "daily",
  backupRetention: 30,
}

// Animated Card Component
const AnimatedCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <div
      className="animate-fade-in-up opacity-0"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  )
}

// Security Score Calculator
const calculateSecurityScore = (settings: SecuritySettings): number => {
  let score = 0
  if (settings.twoFactorAuth) score += 25
  if (settings.sslEnabled) score += 25
  if (settings.backupEnabled) score += 20
  if (settings.maxLoginAttempts <= 3) score += 15
  if (settings.sessionTimeout <= 30) score += 10
  if (settings.allowedIPs.length > 0) score += 5
  return Math.min(score, 100)
}

// Security Level Component
const SecurityLevel = ({ score }: { score: number }) => {
  const getLevel = (score: number) => {
    if (score >= 80) return { level: "Excellent", color: "text-green-600", bg: "bg-green-100" }
    if (score >= 60) return { level: "Bon", color: "text-blue-600", bg: "bg-blue-100" }
    if (score >= 40) return { level: "Moyen", color: "text-yellow-600", bg: "bg-yellow-100" }
    return { level: "Faible", color: "text-red-600", bg: "bg-red-100" }
  }

  const { level, color, bg } = getLevel(score)

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color} ${bg}`}>
      <Shield className="w-4 h-4 mr-1" />
      {level} ({score}%)
    </div>
  )
}

export default function SecuritySettings() {
  const [settings, setSettings] = useState<SecuritySettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [newIP, setNewIP] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/admin/settings/security")
        const result = await response.json()
        if (result.success) {
          const data = {
            ...result.data,
            allowedIPs: JSON.parse(result.data.allowedIPs as string),
          }
          setSettings(data)
        }
      } catch (error) {
        console.error("Error fetching security settings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  // Auto-dismiss success message
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const dataToSave = {
        ...settings,
        allowedIPs: JSON.stringify(settings.allowedIPs),
      }

      const response = await fetch("/api/admin/settings/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      })
      if (!response.ok) throw new Error("Erreur lors de la sauvegarde")
      setSuccess("Paramètres de sécurité sauvegardés avec succès !")
      setError(null)
    } catch (error: any) {
      setError("Erreur : " + error.message)
      setSuccess(null)
    } finally {
      setIsSaving(false)
    }
  }

  const addIP = () => {
    if (newIP && !settings.allowedIPs.includes(newIP)) {
      // Basic IP validation
      const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      if (!ipRegex.test(newIP)) {
        setError("Format d'adresse IP invalide")
        return
      }

      setSettings((prev) => ({
        ...prev,
        allowedIPs: [...prev.allowedIPs, newIP],
      }))
      setNewIP("")
      setError(null)
    }
  }

  const removeIP = (ip: string) => {
    setSettings((prev) => ({
      ...prev,
      allowedIPs: prev.allowedIPs.filter((i) => i !== ip),
    }))
  }

  const securityScore = calculateSecurityScore(settings)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div className="w-2 h-2 bg-blue-200 rounded-full opacity-60"></div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 font-medium">Chargement des paramètres de sécurité...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <div className="w-2 h-2 bg-blue-200 rounded-full opacity-60"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex-1 w-full p-8 space-y-8">
        {/* Header */}
        <AnimatedCard>
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Paramètres de Sécurité
              </h1>
              <p className="text-gray-600 text-lg">Configurez et renforcez la sécurité de votre plateforme</p>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Enregistrer
                </>
              )}
            </Button>
          </div>
        </AnimatedCard>

        {/* Security Score Overview */}
        <AnimatedCard delay={100}>
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                Score de Sécurité Global
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <SecurityLevel score={securityScore} />
                  <p className="text-sm text-gray-600">Votre niveau de sécurité actuel basé sur vos paramètres</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-800">{securityScore}%</div>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${securityScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>

        {/* Alerts */}
        {error && (
          <AnimatedCard delay={200}>
            <Alert variant="destructive" className="bg-red-50/80 backdrop-blur-sm border-red-200">
              <XCircle className="h-4 w-4" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          </AnimatedCard>
        )}

        {success && (
          <AnimatedCard delay={200}>
            <Alert className="bg-green-50/80 backdrop-blur-sm border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          </AnimatedCard>
        )}

        <div className="grid gap-8">
          {/* Authentication Settings */}
          <AnimatedCard delay={300}>
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  Authentification
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Configurez les paramètres d'authentification et de sécurité des comptes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Authentification à deux facteurs</Label>
                    <p className="text-sm text-gray-600">
                      Activez l'authentification à deux facteurs pour une sécurité renforcée
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, twoFactorAuth: checked }))}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Délai d'expiration de la session</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => setSettings((prev) => ({ ...prev, sessionTimeout: Number(e.target.value) }))}
                        className="bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400 pr-20"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                        minutes
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">Expiration du mot de passe</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={settings.passwordExpiry}
                        onChange={(e) => setSettings((prev) => ({ ...prev, passwordExpiry: Number(e.target.value) }))}
                        className="bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400 pr-16"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                        jours
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* Attack Protection */}
          <AnimatedCard delay={400}>
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  Protection contre les attaques
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Configurez les paramètres de protection contre les tentatives d'intrusion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Tentatives de connexion maximales</Label>
                    <Input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => setSettings((prev) => ({ ...prev, maxLoginAttempts: Number(e.target.value) }))}
                      className="bg-white/80 border-gray-200 focus:border-red-400 focus:ring-red-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">Durée de verrouillage</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={settings.lockoutDuration}
                        onChange={(e) => setSettings((prev) => ({ ...prev, lockoutDuration: Number(e.target.value) }))}
                        className="bg-white/80 border-gray-200 focus:border-red-400 focus:ring-red-400 pr-20"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                        minutes
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Adresses IP autorisées</Label>
                  <div className="flex gap-3">
                    <Input
                      value={newIP}
                      onChange={(e) => setNewIP(e.target.value)}
                      placeholder="192.168.1.1"
                      className="bg-white/80 border-gray-200 focus:border-red-400 focus:ring-red-400"
                    />
                    <Button
                      onClick={addIP}
                      variant="outline"
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 hover:from-red-600 hover:to-pink-600 px-6"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter
                    </Button>
                  </div>

                  {settings.allowedIPs.length > 0 && (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {settings.allowedIPs.map((ip, index) => (
                        <div
                          key={ip}
                          className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100"
                        >
                          <span className="font-mono text-sm">{ip}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeIP(ip)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {settings.allowedIPs.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Lock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Aucune adresse IP configurée</p>
                      <p className="text-sm">Ajoutez des adresses IP pour restreindre l'accès</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* Server Security */}
          <AnimatedCard delay={500}>
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <Key className="h-5 w-5 text-white" />
                  </div>
                  Sécurité du serveur
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Configurez les paramètres de sécurité du serveur et des connexions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">SSL/TLS</Label>
                    <p className="text-sm text-gray-600">
                      Activez le chiffrement SSL/TLS pour les connexions sécurisées
                    </p>
                  </div>
                  <Switch
                    checked={settings.sslEnabled}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, sslEnabled: checked }))}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500"
                  />
                </div>

                {!settings.sslEnabled && (
                  <Alert className="bg-yellow-50/80 backdrop-blur-sm border-yellow-200">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertTitle className="text-yellow-800">Attention</AlertTitle>
                    <AlertDescription className="text-yellow-700">
                      La désactivation du SSL/TLS n'est pas recommandée en production. Cela peut exposer vos données à
                      des risques de sécurité.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* Backup Settings */}
          <AnimatedCard delay={600}>
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                    <Database className="h-5 w-5 text-white" />
                  </div>
                  Sauvegarde et récupération
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Configurez les paramètres de sauvegarde automatique de vos données
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Sauvegarde automatique</Label>
                    <p className="text-sm text-gray-600">Activez la sauvegarde automatique des données critiques</p>
                  </div>
                  <Switch
                    checked={settings.backupEnabled}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, backupEnabled: checked }))}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-indigo-500"
                  />
                </div>

                {settings.backupEnabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Fréquence de sauvegarde</Label>
                      <select
                        value={settings.backupFrequency}
                        onChange={(e) => setSettings((prev) => ({ ...prev, backupFrequency: e.target.value }))}
                        className="w-full p-3 bg-white/80 border border-gray-200 rounded-lg focus:border-purple-400 focus:ring-purple-400"
                      >
                        <option value="hourly">Toutes les heures</option>
                        <option value="daily">Quotidienne</option>
                        <option value="weekly">Hebdomadaire</option>
                        <option value="monthly">Mensuelle</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium">Conservation des sauvegardes</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={settings.backupRetention}
                          onChange={(e) =>
                            setSettings((prev) => ({ ...prev, backupRetention: Number(e.target.value) }))
                          }
                          className="bg-white/80 border-gray-200 focus:border-purple-400 focus:ring-purple-400 pr-16"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                          jours
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
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
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
