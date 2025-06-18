import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        published: true,
        createdAt: true,
        updatedAt: true,
        rentreePourTous: {
          select: {
            id: true,
            title: true,
            location: true,
            participants: true,
            status: true,
            fundingGoal: true,
            fundsRaised: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des projets" },
      { status: 500 }
    )
  }
} 