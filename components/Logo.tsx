"use client"

import Image from 'next/image'

// Données par défaut pour le logo
const defaultLogoData = {
  logo: "/images/noir.png",
  siteName: "MCC"
}

export default function Logo() {
  return (
    <div className="relative w-48 h-12">
      <Image
        src={defaultLogoData.logo}
        alt={defaultLogoData.siteName}
        fill
        className="object-contain"
        priority
      />
    </div>
  )
} 