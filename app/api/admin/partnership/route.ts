import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const partnership = await prisma.partnership.findFirst()

    if (!partnership) {
      // Créer les données par défaut si aucune n'existe
      const defaultPartnership = {
        heroTitle: "PARRAINNER UN ENFANT",
        heroImage: "/images/partnership/hero-bg.jpg",
        title: "Nous nous rendons disponibles pour vous !",
        description: "Parrainner un enfant, c'est lui donner la chance de poursuivre sa scolarité dans de bonnes conditions. Grâce à votre soutien, il pourra bénéficier de fournitures scolaires, d'un accompagnement éducatif et d'un encadrement bienveillant. Chaque parrainage est un pas de plus vers un avenir meilleur pour ces enfants.",
        image: "/images/partnership/valeur-3.jpg",
        formTitle: "Rejoignez notre programme de parrainage",
        formDescription: "Remplissez le formulaire ci-dessous pour parrainer un enfant"
      }

      const newPartnership = await prisma.partnership.create({
        data: defaultPartnership
      })

      return NextResponse.json({ success: true, data: newPartnership })
    }

    return NextResponse.json({ success: true, data: partnership })
  } catch (error) {
    console.error("Error fetching partnership data:", error)
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
    const partnership = await prisma.partnership.upsert({
      where: { id: data.id || "" },
      update: data,
      create: data
    })

    return NextResponse.json({ success: true, data: partnership })
  } catch (error) {
    console.error("Error updating partnership data:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la mise à jour des données" },
      { status: 500 }
    )
  }
} 