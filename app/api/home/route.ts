import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [hero, vision, valeurs, projets, cta, homeGallery, settings] = await Promise.all([
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
      prisma.project.findMany({
        where: {
          published: true
        }
      }),
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
        images?.map(img => ({
          ...img,
          image: img.image || "/images/placeholder.jpg"
        }))
      ),
      prisma.settings.findFirst().then(s => s || {
        id: "new",
        siteName: "MCC",
        siteDescription: "Mission Chrétienne pour les Enfants",
        logo: "/images/logo.png",
        contactEmail: "",
        contactPhone: "",
        address: "",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        linkedinUrl: "",
        youtubeUrl: "",
        tiktokUrl: ""
      })
    ])

    return NextResponse.json({
      success: true,
      data: {
        hero,
        vision,
        valeurs,
        projets,
        cta,
        homeGallery,
        settings
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