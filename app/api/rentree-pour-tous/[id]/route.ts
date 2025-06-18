import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.rentreePourTous.findUnique({
      where: {
        id: params.id,
      },
      include: {
        project: true,
        media: true,
        gallery: true,
      },
    })

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error: "Événement non trouvé",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: event,
    })
  } catch (error) {
    console.error("Error fetching rentree pour tous event:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la récupération de l'événement",
      },
      { status: 500 }
    )
  }
}
