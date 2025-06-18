import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const events = await prisma.rentreePourTous.findMany({
      include: {
        project: true,
        media: true,
        gallery: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des événements" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const event = await prisma.rentreePourTous.create({
      data: {
        ...data,
        project: data.projectId ? {
          connect: { id: data.projectId }
        } : undefined
      },
      include: {
        project: true,
        media: true,
        gallery: true,
      }
    })
    return NextResponse.json(event)
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création de l'événement" },
      { status: 500 }
    )
  }
} 