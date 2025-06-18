"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface HomeData {
  hero: {
    title: string
    subtitle: string
    backgroundImage: string
  }
  vision: {
    title: string
    description: string
    mission: {
      title: string
      description: string
    }
    images: {
      top: string
      bottom: string
    }
  }
  settings: {
    siteName: string
    logo: string
  }
  valeurs: Array<{
    title: string
    description: string
    image: string
  }>
  projets: Array<{
    title: string
    description: string
    image: string
  }>
  cta: {
    parrain: {
      title: string
      description: string
      buttonText: string
    }
    don: {
      title: string
      description: string
      buttonText: string
    }
    backgroundImage: string
  }
}

const defaultHomeData: HomeData = {
  hero: {
    title: "Lorem Ipsum Dolor Set Amer",
    subtitle: "Lorem ipsum Dolor Sit Amet",
    backgroundImage: "/images/hero-bg.jpg"
  },
  vision: {
    title: "Notre Vision",
    description: "Se positionner comme une référence nationale dans l'accompagnement et l'insertion des jeunes et femmes vulnérables au travers de programmes de protection, d'accompagnement et d'insertion dans la société.",
    mission: {
      title: "Notre Mission",
      description: "Protéger, accompagner et insérer les enfants, jeunes et femmes vulnérables afin de faire d'eux des modèles qui influencent positivement la société."
    },
    images: {
      top: "/images/vision-1.jpg",
      bottom: "/images/vision-2.jpg"
    }
  },
  settings: {
    siteName: "MCC",
    logo: "/images/logo.png"
  },
  valeurs: [
    {
      title: "Amour",
      description: "Agir avec bienveillance et respect envers chaque enfant, jeune et femme vulnérable, en les impliquant dans des initiatives chaleureuses où ils se sentent accueillis et soutenus",
      image: "/images/valeur-1.jpg"
    },
    {
      title: "Engagement",
      description: "S'investir pleinement dans la protection, l'accompagnement et l'insertion des enfants, jeunes et femmes vulnérables, avec une détermination sans faille pour améliorer leur avenir.",
      image: "/images/valeur-2.jpg"
    },
    {
      title: "Transparence",
      description: "Assurer une gestion claire et honnête de toutes les ressources, actions et décisions prises, afin de garantir la confiance des partenaires, des bénéficiaires et de la communauté.",
      image: "/images/valeur-3.jpg"
    }
  ],
  projets: [
    {
      title: "Miracle de Noël",
      description: "Chaque année, ce projet offre de beaux moments de joie aux enfants vulnérables en leur offrant des soins.",
      image: "/images/valeur-1.jpg"
    },
    {
      title: "La Rentrée Pour Tous",
      description: "L'objectif de ce projet est de donner l'accès à l'éducation pour les enfants issus de milieux défavorisés.",
      image: "/images/valeur-2.jpg"
    },
    {
      title: "Instant de Bonheur",
      description: "Chaque année, pendant les fêtes de Pâques, ce projet contribue au divertissement et à l'épanouissement.",
      image: "/images/valeur-3.jpg"
    }
  ],
  cta: {
    parrain: {
      title: "Devenir parrain",
      description: "Devenez un atout clé de la vie d'un enfant vulnérable. En tant que parrain, vous offrez plus que du soutien financier.",
      buttonText: "S'INSCRIRE"
    },
    don: {
      title: "Faire un don",
      description: "Chaque contribution nous permet d'agir concrètement pour aider plus d'enfants vulnérables.",
      buttonText: "FAIRE UN DON"
    },
    backgroundImage: "/images/cta.jpg"
  }
}

interface HomeContextType {
  homeData: HomeData
  updateHomeData: (data: Partial<HomeData>) => void
}

const HomeContext = createContext<HomeContextType | undefined>(undefined)

export function HomeProvider({ children }: { children: ReactNode }) {
  const [homeData, setHomeData] = useState<HomeData>(defaultHomeData)

  const updateHomeData = (data: Partial<HomeData>) => {
    setHomeData(prev => ({ ...prev, ...data }))
  }

  return (
    <HomeContext.Provider value={{ homeData, updateHomeData }}>
      {children}
    </HomeContext.Provider>
  )
}

export function useHome() {
  const context = useContext(HomeContext)
  if (context === undefined) {
    throw new Error("useHome must be used within a HomeProvider")
  }
  return context
} 