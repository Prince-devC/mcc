"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, MapPin, Users, ChevronRight, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface Event {
  id: string
  projectId: string
  title: string
  location: string
  description: string
  participants: number
  status: "upcoming" | "ongoing" | "completed"
  images: string[]
  heroTitle: string
  heroImage: string
  mainMedia: {
    type: string
    imageUrl?: string
    youtubeUrl?: string
    videoUrl?: string
    alt: string
  }
  fundingGoal: number
  fundsRaised: number
  gallery: Array<{
    type: "image" | "video" | "youtube"
    imageUrl?: string
    youtubeUrl?: string
    videoUrl?: string
    alt: string
  }>
}

export default function RentreePourTous() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/rentree-pour-tous")
        const result = await response.json()
        if (result.success) {
          setEvents(Array.isArray(result.data) ? result.data : [])
            } else {
          setEvents([])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Erreur lors du chargement des données")
        setEvents([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: Event["status"]) => {
    switch (status) {
      case "upcoming":
        return "À venir"
      case "ongoing":
        return "En cours"
      case "completed":
        return "Terminé"
      default:
        return status
    }
  }

  if (isLoading) {
    return <div>Chargement...</div>
  }

  if (error) {
    return <div>Erreur: {error}</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Rentrée pour tous</h1>
              <Button
          onClick={() => {/* TODO: Ajouter la logique pour créer un nouvel événement */}}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvel événement
              </Button>
            </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={event.images[0] || "/placeholder.jpg"}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      event.status
                    )}`}
                  >
                    {getStatusText(event.status)}
                  </span>
                  </div>
                    </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {event.participants} participants
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {/* TODO: Ajouter la logique pour modifier l'événement */}}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {/* TODO: Ajouter la logique pour supprimer l'événement */}}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                                </Button>
                              </div>
                                  </div>
                                </CardContent>
                              </Card>
                          ))}
                        </div>
        </div>
  )
}
