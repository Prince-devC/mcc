import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const support = await prisma.support.findFirst()

    if (!support) {
      // Créer les données par défaut si aucune n'existe
      const defaultSupport = {
        heroTitle: "ETRE BENEVOLE",
        heroImage: "/images/support/valeur-1.jpg",
        title: "Nous nous rendons disponibles pour vous !",
        description: "Devenir bénévole, c'est s'engager concrètement pour faire grandir notre mission. Que ce soit pour aider lors de nos distributions, accompagner les enfants ou soutenir nos actions au quotidien, chaque geste compte. En donnant un peu de votre temps, vous contribuez à changer des vies.",
        image: "/images/support/valeur-2.jpg",
        formTitle: "Rejoignez notre équipe de bénévoles",
        formDescription: "Remplissez le formulaire ci-dessous pour nous rejoindre"
      }

      const newSupport = await prisma.support.create({
        data: defaultSupport
      })

      return NextResponse.json({ success: true, data: newSupport })
    }

    return NextResponse.json({ success: true, data: support })
  } catch (error) {
    console.error("Error fetching support data:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la récupération des données" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Mettre à jour ou créer les données
    const support = await prisma.support.upsert({
      where: { id: data.id || "" },
      update: data,
      create: data
    })

    return NextResponse.json({ success: true, data: support })
  } catch (error) {
    console.error("Error updating support data:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la mise à jour des données" },
      { status: 500 }
    )
  }
} 