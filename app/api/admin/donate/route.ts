import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const donate = await prisma.donate.findFirst({
      include: {
        benefits: true,
        infoContent: true
      }
    })

    if (!donate) {
      // Créer les données par défaut si aucune n'existe
      const defaultDonate = await prisma.donate.create({
        data: {
          heroTitle: "Faire un don",
          heroSubtitle: "Votre soutien fait la différence",
          heroImage: "/images/valeur-2.jpg",
          title: "Pourquoi faire un don ?",
          description: "Votre don nous permet de continuer notre mission d'aide aux enfants, jeunes et femmes vulnérables. Chaque contribution compte et fait une réelle différence dans leur vie.",
          benefits: {
            create: [
              { text: "Financement de nos programmes éducatifs" },
              { text: "Soutien aux familles dans le besoin" },
              { text: "Développement de nouveaux projets" }
            ]
          },
          infoTitle: "Informations importantes",
          infoContent: {
            create: [
              {
                title: "Reçu fiscal",
                content: "Un reçu fiscal vous sera envoyé pour tout don supérieur à 50€."
              },
              {
                title: "Sécurité",
                content: "Vos informations sont sécurisées et ne seront jamais partagées avec des tiers."
              },
              {
                title: "Questions ?",
                content: "Pour toute question concernant votre don, n'hésitez pas à nous contacter au 01 23 45 67 89 ou par email à contact@mcc.org"
              }
            ]
          }
        },
        include: {
          benefits: true,
          infoContent: true
        }
      })

      return NextResponse.json({ success: true, data: defaultDonate })
    }

    return NextResponse.json({ success: true, data: donate })
  } catch (error) {
    console.error("Error in GET /api/admin/donate:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la récupération des données" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Supprimer les anciens avantages et informations
    await prisma.benefit.deleteMany()
    await prisma.info.deleteMany()

    // Mettre à jour ou créer les données de don
    const updatedDonate = await prisma.donate.upsert({
      where: { id: data.id || "default" },
      create: {
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroImage: data.heroImage,
        title: data.title,
        description: data.description,
        infoTitle: data.infoTitle,
        benefits: {
          create: data.benefits.map((benefit: any) => ({
            text: benefit.text
          }))
        },
        infoContent: {
          create: data.infoContent.map((info: any) => ({
            title: info.title,
            content: info.content
          }))
        }
      },
      update: {
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroImage: data.heroImage,
        title: data.title,
        description: data.description,
        infoTitle: data.infoTitle,
        benefits: {
          create: data.benefits.map((benefit: any) => ({
            text: benefit.text
          }))
        },
        infoContent: {
          create: data.infoContent.map((info: any) => ({
            title: info.title,
            content: info.content
          }))
        }
      },
      include: {
        benefits: true,
        infoContent: true
      }
    })

    return NextResponse.json({ success: true, data: updatedDonate })
  } catch (error) {
    console.error("Error in POST /api/admin/donate:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la mise à jour des données" },
      { status: 500 }
    )
  }
} 