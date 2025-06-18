import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Récupérer les projets avec leur rentree-pour-tous associé
    const projects = await prisma.project.findMany({
      where: {
        published: true
      },
      include: {
        rentreePourTous: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (projects.length === 0) {
      // Créer des projets par défaut si aucun n'existe
      const defaultProjects = [
        {
          title: "Centre d'accueil pour enfants vulnérables",
          subtitle: "Construction d'un centre d'accueil pour les enfants en situation difficile",
          description: "Ce projet vise à construire un centre d'accueil moderne et adapté pour les enfants vulnérables. Le centre comprendra des dortoirs, des salles de classe, une infirmerie et des espaces de loisirs.",
          image: "/projects/center.jpg",
          category: "Infrastructure",
          status: "en cours",
          startDate: new Date("2024-01-01"),
          endDate: new Date("2024-12-31"),
          location: "Cotonou, Bénin",
          budget: 500000000,
          objectives: "- Accueillir 100 enfants vulnérables\n- Fournir un environnement sûr et éducatif\n- Offrir des services de santé de base\n- Promouvoir l'éducation et le développement personnel",
          results: "En cours de réalisation",
          partners: "Ministère de la Famille\nONG Partenaires\nEntreprises locales",
          published: true
        },
        {
          title: "Programme d'éducation et de formation",
          subtitle: "Formation professionnelle pour les jeunes défavorisés",
          description: "Ce programme offre des formations professionnelles aux jeunes défavorisés dans divers domaines comme l'informatique, la couture, la mécanique et l'agriculture.",
          image: "/projects/education.jpg",
          category: "Éducation",
          status: "en cours",
          startDate: new Date("2024-03-01"),
          location: "Porto-Novo, Bénin",
          budget: 250000000,
          objectives: "- Former 50 jeunes par an\n- Assurer l'insertion professionnelle\n- Développer des compétences pratiques\n- Promouvoir l'entrepreneuriat",
          results: "En cours de réalisation",
          partners: "Ministère de l'Éducation\nCentres de formation\nEntreprises partenaires",
          published: true
        }
      ]

      await prisma.project.createMany({
        data: defaultProjects
      })

      const updatedProjects = await prisma.project.findMany({
        include: {
          rentreePourTous: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      return NextResponse.json({ success: true, data: updatedProjects })
    }

    return NextResponse.json({ success: true, data: projects })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ success: false, error: "Error fetching projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Supprimer tous les projets existants
    await prisma.$transaction(async (tx) => {
      await tx.project.deleteMany()
      
      // Créer les nouveaux projets
      await tx.project.createMany({
        data: data.map((project: any) => ({
          ...project,
          startDate: new Date(project.startDate),
          endDate: project.endDate ? new Date(project.endDate) : null
        }))
      })
    })

    // Récupérer les projets mis à jour
    const updatedProjects = await prisma.project.findMany({
      include: {
        rentreePourTous: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ success: true, data: updatedProjects })
  } catch (error) {
    console.error("Error updating projects:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la mise à jour des projets" },
      { status: 500 }
    )
  }
}