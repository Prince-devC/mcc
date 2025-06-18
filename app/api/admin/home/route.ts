import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [hero, vision, valeurs, projets, cta, homeGallery] = await Promise.all([
      prisma.hero.findFirst().then(h => h || {
        id: "new",
        title: "",
        subtitle: "",
        backgroundImage: "/images/default-hero.jpg"
      }),
      prisma.vision.findFirst({
        include: {
          mission: true,
          images: true,
        },
      }).then(v => v || {
        id: "new",
        title: "",
        description: "",
        mission: {
          id: "new",
          title: "",
          description: ""
        },
        images: {
          id: "new",
          top: "",
          bottom: ""
        }
      }),
      prisma.valeur.findMany(),
      prisma.project.findMany(),
      prisma.cTA.findFirst({
        include: {
          parrain: true,
          don: true,
        },
      }).then(c => c || {
        id: "new",
        backgroundImage: "/images/default-cta.jpg",
        parrain: {
          id: "new",
          title: "",
          description: "",
          buttonText: ""
        },
        don: {
          id: "new",
          title: "",
          description: "",
          buttonText: ""
        }
      }),
      prisma.homeGallery.findMany().then(images => 
        images.map(img => ({
          ...img,
          image: img.image || "/images/placeholder.jpg"
        }))
      ),
    ])

    console.log(homeGallery)

    return NextResponse.json({
      success: true,
      data: {
        hero,
        vision,
        valeurs,
        projets,
        cta,
        homeGallery,
      },
    })
  } catch (error: any) {
    console.error("Error fetching home data:", error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Mise à jour ou création de la section Hero
    const hero = await prisma.hero.upsert({
      where: { id: data.hero?.id || "new" },
      update: {
        title: data.hero.title,
        subtitle: data.hero.subtitle,
        backgroundImage: data.hero.backgroundImage,
      },
      create: {
        title: data.hero.title,
        subtitle: data.hero.subtitle,
        backgroundImage: data.hero.backgroundImage,
      },
    })

    // Mise à jour ou création de la section Vision
    const mission = await prisma.mission.upsert({
      where: { id: data.vision?.mission?.id || "new" },
      update: {
        title: data.vision.mission.title,
        description: data.vision.mission.description,
      },
      create: {
        title: data.vision.mission.title,
        description: data.vision.mission.description,
      },
    })

    const images = await prisma.images.upsert({
      where: { id: data.vision?.images?.id || "new" },
      update: {
        top: data.vision.images.top,
        bottom: data.vision.images.bottom,
      },
      create: {
        top: data.vision.images.top,
        bottom: data.vision.images.bottom,
      },
    })

    const vision = await prisma.vision.upsert({
      where: { id: data.vision?.id || "new" },
      update: {
        title: data.vision.title,
        description: data.vision.description,
        missionId: mission.id,
        imagesId: images.id,
      },
      create: {
        title: data.vision.title,
        description: data.vision.description,
        missionId: mission.id,
        imagesId: images.id,
      },
    })

    // Mise à jour ou création des Valeurs
    const existingValeurs = await prisma.valeur.findMany()
    const valeursToDelete = existingValeurs.filter(
      (existing) => !data.valeurs.some((valeur: any) => valeur.id === existing.id)
    )

    // Supprimer les valeurs qui ne sont plus présentes
    await Promise.all(
      valeursToDelete.map((valeur) =>
        prisma.valeur.delete({
          where: { id: valeur.id },
        })
      )
    )

    // Mettre à jour ou créer les valeurs existantes
    const valeurs = await Promise.all(
      data.valeurs.map(async (valeur: any) => {
        return prisma.valeur.upsert({
          where: { id: valeur.id || "new" },
          update: {
            title: valeur.title,
            description: valeur.description,
            image: valeur.image,
          },
          create: {
            title: valeur.title,
            description: valeur.description,
            image: valeur.image,
          },
        })
      })
    )

    // Mise à jour ou création des Projets
    const existingProjets = await prisma.project.findMany()
    const projetsToDelete = existingProjets.filter(
      (existing) => !data.projets.some((projet: any) => projet.id === existing.id)
    )

    // Supprimer les projets qui ne sont plus présents
    await Promise.all(
      projetsToDelete.map((projet) =>
        prisma.project.delete({
          where: { id: projet.id },
        })
      )
    )

    // Mettre à jour ou créer les projets existants
    const projets = await Promise.all(
      data.projets.map(async (projet: any) => {
        return prisma.project.upsert({
          where: { id: projet.id || "new" },
          update: {
            title: projet.title,
            description: projet.description,
            image: projet.image,
            published: projet.published ?? true,
          },
          create: {
            title: projet.title,
            description: projet.description,
            image: projet.image,
            published: projet.published ?? true,
          },
        })
      })
    )

    // Mise à jour ou création de la section CTA
    // D'abord, supprimer l'ancien CTA s'il existe pour éviter les conflits de relations uniques
    if (data.cta?.id && data.cta.id !== "new") {
      try {
        await prisma.cTA.delete({
          where: { id: data.cta.id }
        })
      } catch (error) {
        console.log("No existing CTA to delete")
      }
    }

    // Créer ou mettre à jour le Parrain
    const parrain = await prisma.parrain.upsert({
      where: { id: data.cta?.parrain?.id || "new" },
      update: {
        title: data.cta.parrain.title,
        description: data.cta.parrain.description,
        buttonText: data.cta.parrain.buttonText,
      },
      create: {
        title: data.cta.parrain.title,
        description: data.cta.parrain.description,
        buttonText: data.cta.parrain.buttonText,
      },
    })

    // Créer ou mettre à jour le Don
    const don = await prisma.don.upsert({
      where: { id: data.cta?.don?.id || "new" },
      update: {
        title: data.cta.don.title,
        description: data.cta.don.description,
        buttonText: data.cta.don.buttonText,
      },
      create: {
        title: data.cta.don.title,
        description: data.cta.don.description,
        buttonText: data.cta.don.buttonText,
      },
    })

    // Créer le nouveau CTA
    const cta = await prisma.cTA.create({
      data: {
        backgroundImage: data.cta.backgroundImage,
        parrain: {
          connect: {
            id: parrain.id
          }
        },
        don: {
          connect: {
            id: don.id
          }
        }
      },
    })

    // Mise à jour ou création de la Galerie
    const existingHomeGallery = await prisma.homeGallery.findMany()
    const homeGalleryToDelete = existingHomeGallery.filter(
      (existing) => !data.homeGallery.some((image: any) => image.id === existing.id)
    )

    // Supprimer les images qui ne sont plus présentes
    await Promise.all(
      homeGalleryToDelete.map((image) =>
        prisma.homeGallery.delete({
          where: { id: image.id },
        })
      )
    )

    // Mettre à jour ou créer les images existantes
    const homeGallery = await Promise.all(
      data.homeGallery.map(async (image: any) => {
        return prisma.homeGallery.upsert({
          where: { id: image.id || "new" },
          update: {
            title: image.title || "Sans titre",
            image: image.image || "/images/placeholder.jpg",
          },
          create: {
            title: image.title || "Sans titre",
            image: image.image || "/images/placeholder.jpg",
          },
        })
      })
    )

    return NextResponse.json({
      success: true,
      data: {
        hero,
        vision,
        valeurs,
        projets,
        cta,
        homeGallery,
      },
    })
  } catch (error: any) {
    console.error("Error updating home data:", error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
} 