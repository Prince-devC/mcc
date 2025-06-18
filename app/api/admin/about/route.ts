import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const about = await prisma.about.findFirst({
      include: {
        members: true,
        partners: true,
      },
    })

    const testimonials = await prisma.testimonial.findMany({
      where: { published: true },
    })

    if (!about) {
      // Créer une entrée par défaut si aucune n'existe
      const defaultAbout = await prisma.about.create({
        data: {
          heroTitle: "Qui sommes – nous ?",
          heroSubtitle: "Historique et expériences de l'ONG",
          heroImage: "/about/founder.jpg",
          historyTitle: "Notre Histoire",
          historyContent: "L'ONG MCC, initialement connue sous le nom de GBEMENOU Charity, est née d'une histoire de résilience, d'injustice sociale et d'un profond désir de transformation.\n\nSon fondateur, GBEMENOU Drice Aurel, a vécu une enfance marquée par la précarité et l'abandon. Après avoir perdu son père en 2006, puis sa mère en 2012, seulement trois jours après sa proclamation et ses résultats au BEPC, il a connu l'orphelinat, puis la rue. Placé en internat par un oncle, il a dû, en cache sous l'aumônerie scolaire, lutter ici et là pour survivre, réaliser ses projets et enfin soutenir d'autres enfants. De son expérience, il tire l'inspiration sociale de son engagement envers les enfants vulnérables qui savent tout l'instant, leur sort dépend d'un geste, d'un sourire, d'un partage, d'un accompagnement. Comme de nombreux enfants, il a croisé la route de personnes qui ont su lui redonner espoir et sens à sa vie, à l'instar du pasteur Abidjo, qui a été à ses côtés.\n\nUn soir, touché par la détresse des enfants vivant dans l'enceinte du marché de Dantokpa, Aurel a décidé d'agir. Il a rassemblé ces enfants pour leur offrir un repas, les laver et leur adresser des mots d'encouragement. Ce soir-là, plus de 200 enfants vulnérables ont bénéficié de son action. Ce moment de partage fut le déclencheur. Ce qui n'était au départ qu'un groupe de compassion est rapidement devenu une véritable mission de vie. GBEMENOU Charity était née, avec un objectif clair : redonner espoir et opportunités aux enfants en situation difficile.",
          historyImage: "/about/founder.jpg",
          teamTitle: "L'équipe",
          teamSubtitle: "Derrière chaque action de MCC se trouvent des femmes et des hommes passionnés, engagés et profondément convaincus de la nécessité d'agir pour améliorer le sort des enfants vulnérables. Notre équipe est composée de bénévoles et de professionnels aux compétences diverses et complémentaires, tous animés par la même volonté de faire la différence. Découvrez ci-dessous qui sont les piliers de notre association.",
          partnersTitle: "Nos Partenaires",
          partnersSubtitle: "Ils nous font confiance",
        },
        include: {
          members: true,
          partners: true,
        },
      })

      // Créer les membres de l'équipe par défaut
      const defaultMembers = [
        {
          name: 'Aurel GBEMENOU',
          role: 'Directeur Exécutif de MCC',
          description: 'Spécialiste en formalisation et impact social des ONG, coaching et accompagnement, structuration et reconnaissance légale.',
          image: '/about/founder.jpg',
          aboutId: defaultAbout.id,
        },
        {
          name: 'Estelle DEHA',
          role: 'Chargée de Programme 2 MCC',
          description: 'Informaticienne de gestion de formation, développement informatique et pilotage de projet.',
          image: '/about/estelle.jpg',
          aboutId: defaultAbout.id,
        },
        {
          name: 'Sapience LAOUROU',
          role: 'Responsable Suivi Évaluation',
          description: 'Expert en monitoring de projet, analyse des politiques publiques, genre et inclusion.',
          image: '/about/sapience.jpg',
          aboutId: defaultAbout.id,
        },
        {
          name: 'Mabelle ODE',
          role: 'Responsable Comptabilité',
          description: 'Experte comptable stagiaire, responsable comptabilité au sein de MCC.',
          image: '/about/mabelle.jpg',
          aboutId: defaultAbout.id,
        },
        {
          name: 'Rebecca EDOH',
          role: 'Chargée de Formation et d\'Éducation',
          description: 'Spécialiste en agronomie, nutrition, sciences et technologie alimentaire, leadership et communication.',
          image: '/about/rebecca.jpg',
          aboutId: defaultAbout.id,
        },
        {
          name: 'Manuela FATONDJI',
          role: 'Responsable Trésorerie',
          description: 'Auditeur financier et comptable, responsable trésorerie au sein de MCC.',
          image: '/about/manuella.jpg',
          aboutId: defaultAbout.id,
        },
        {
          name: 'Huguette BOSSE',
          role: 'Responsable Communication',
          description: 'Spécialiste en stratégie commerciale et communication, organisation de projets et accompagnement des jeunes et femmes vulnérables.',
          image: '/about/huguette.jpg',
          aboutId: defaultAbout.id,
        },
      ]

      await prisma.teamMember.createMany({
        data: defaultMembers,
      })

      // Créer les témoignages par défaut
      const defaultTestimonials = [
        {
          name: 'DOSSOU Bertin',
          role: 'Parrain',
          content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique in pellentesque ultrices et massa neque, convallis lorem. Erat proin in posuere dui accumsan lorem."',
          published: true,
        },
        {
          name: 'AGOSSOU Jonathan',
          role: 'Enfant',
          content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique in pellentesque ultrices et massa neque, convallis lorem. Erat proin in posuere dui accumsan lorem."',
          published: true,
        },
      ]

      await prisma.testimonial.createMany({
        data: defaultTestimonials,
      })

      const updatedAbout = await prisma.about.findUnique({
        where: { id: defaultAbout.id },
        include: {
          members: true,
          partners: true,
        },
      })

      const updatedTestimonials = await prisma.testimonial.findMany()

      return NextResponse.json({ 
        success: true, 
        data: { 
          ...updatedAbout, 
          testimonials: updatedTestimonials 
        } 
      })
    }

    return NextResponse.json({ success: true, data: { ...about, testimonials } })
  } catch (error) {
    console.error("Error fetching about data:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la récupération des données" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Mettre à jour ou créer l'entrée About
    const about = await prisma.about.upsert({
      where: { id: data.id || "" },
      create: {
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroImage: data.heroImage || "/about/founder.jpg",
        historyTitle: data.historyTitle,
        historyContent: data.historyContent,
        historyImage: data.historyImage,
        teamTitle: data.teamTitle,
        teamSubtitle: data.teamSubtitle,
        partnersTitle: data.partnersTitle,
        partnersSubtitle: data.partnersSubtitle,
      },
      update: {
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroImage: data.heroImage || "/about/founder.jpg",
        historyTitle: data.historyTitle,
        historyContent: data.historyContent,
        historyImage: data.historyImage,
        teamTitle: data.teamTitle,
        teamSubtitle: data.teamSubtitle,
        partnersTitle: data.partnersTitle,
        partnersSubtitle: data.partnersSubtitle,
      },
    })

    // Supprimer les membres et partenaires existants
    await prisma.teamMember.deleteMany({
      where: { aboutId: about.id },
    })
    await prisma.partner.deleteMany({
      where: { aboutId: about.id },
    })

    // Créer les nouveaux membres
    if (data.members && data.members.length > 0) {
      await prisma.teamMember.createMany({
        data: data.members.map((member: any) => ({
          ...member,
          image: member.image || '/about/default-member.jpg',
          aboutId: about.id,
        })),
      })
    }

    // Créer les nouveaux partenaires
    if (data.partners && data.partners.length > 0) {
      await prisma.partner.createMany({
        data: data.partners.map((partner: any) => ({
          ...partner,
          aboutId: about.id,
        })),
      })
    }

    // Gérer les témoignages
    if (data.testimonials && data.testimonials.length > 0) {
      // Supprimer les témoignages existants
      await prisma.testimonial.deleteMany()

      // Créer les nouveaux témoignages
      await prisma.testimonial.createMany({
        data: data.testimonials.map((testimonial: any) => ({
          name: testimonial.name,
          content: testimonial.content,
          role: testimonial.role,
          published: testimonial.published,
        })),
      })
    }

    // Récupérer les données mises à jour
    const updatedAbout = await prisma.about.findUnique({
      where: { id: about.id },
      include: {
        members: true,
        partners: true,
      },
    })

    const updatedTestimonials = await prisma.testimonial.findMany()

    return NextResponse.json({ 
      success: true, 
      data: { 
        ...updatedAbout, 
        testimonials: updatedTestimonials 
      } 
    })
  } catch (error) {
    console.error("Error updating about data:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la mise à jour des données" },
      { status: 500 }
    )
  }
} 