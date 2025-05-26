"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un temps de chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 secondes de chargement

    return () => clearTimeout(timer);
  }, []);

  // Valeurs pour le carrousel
  const valeurs = [
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
    },
    // Ajoute d'autres valeurs ici si besoin
  ];

  // Projets pour le carrousel
  const projets = [
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
  ];

  const [startIndexValeurs, setStartIndexValeurs] = useState(0);
  const [startIndexProjets, setStartIndexProjets] = useState(0);
  const visibleCount = 3;
  const totalValeurs = valeurs.length;
  const totalProjets = projets.length;

  const nextValeurs = () => setStartIndexValeurs((prev) => (prev + 1) % totalValeurs);
  const prevValeurs = () => setStartIndexValeurs((prev) => (prev - 1 + totalValeurs) % totalValeurs);
  const nextProjets = () => setStartIndexProjets((prev) => (prev + 1) % totalProjets);
  const prevProjets = () => setStartIndexProjets((prev) => (prev - 1 + totalProjets) % totalProjets);

  // Pour afficher 3 valeurs à la fois, même en boucle
  const getVisibleValeurs = () => {
    let arr = [];
    for (let i = 0; i < visibleCount; i++) {
      arr.push(valeurs[(startIndexValeurs + i) % totalValeurs]);
    }
    return arr;
  };

  // Pour afficher 3 projets à la fois, même en boucle
  const getVisibleProjets = () => {
    let arr = [];
    for (let i = 0; i < visibleCount; i++) {
      arr.push(projets[(startIndexProjets + i) % totalProjets]);
    }
    return arr;
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Hero background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Lorem Ipsum Dolor<br />Set Amer</h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl">Lorem ipsum Dolor Sit Amet</p>
          <Link href="/solutions" className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base">
            NOUS SOUTENIR
          </Link>
        </div>
      </section>

      {/* Notre Vision Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <span className="text-sm uppercase tracking-wider text-gray-600">Bienvenue à MCC</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4 sm:mb-6 text-black">Notre Vision</h2>
            <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg">
              Se positionner comme une référence nationale dans l'accompagnement et l'insertion des jeunes et femmes vulnérables au travers de programmes de protection, d'accompagnement et d'insertion dans la société.
            </p>
            <div className="bg-[#FFF8F0] p-4 sm:p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/images/icon/badge-validation.jpeg" alt="Vision Icon" width={25} height={25} />
                <h3 className="font-semibold text-lg sm:text-xl text-[#C38A00]">Notre Mission</h3>
              </div>
              <p className="text-gray-700 text-base sm:text-lg">
                Protéger, accompagner et insérer les enfants, jeunes et femmes vulnérables afin de faire d'eux des modèles qui influencent positivement la société.
              </p>
            </div>
          </div>
          <div className="relative h-[500px] md:h-auto">
            {/* Image du haut */}
            <div className="absolute left-0 sm:left-12 top-0 bg-[#F4B63C] bg-opacity-12 p-4 rounded-lg shadow-lg transform-rotate-2">
              <div className="relative w-[250px] sm:w-[300px] h-[200px] sm:h-[280px]">
                <Image
                  src="/images/vision-1.jpg"
                  alt="Enfants jouant ensemble"
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 640px) 250px, (max-width: 768px) 300px, 440px"
                />
              </div>
            </div>
            {/* Image du bas */}
            <div className="absolute right-0 sm:right-12 top-48 bg-[#F4B63C] bg-opacity-12 p-4 rounded-lg shadow-lg transform rotate-2">
              <div className="relative w-[250px] sm:w-[300px] h-[150px] sm:h-[200px]">
                <Image
                  src="/images/vision-2.jpg"
                  alt="Enfants souriant"
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 640px) 250px, (max-width: 768px) 300px, 363px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs Section */}
      <section className="bg-[#FAF7ED] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-black">Nos valeurs</h2>
          <div className="flex justify-center mb-8">
            <span className="block w-12 h-1 bg-yellow-700 rounded"></span>
          </div>
          <div className="relative flex items-center">
            {/* Flèche gauche */}
            <button
              onClick={prevValeurs}
              className="absolute -left-4 sm:-left-12 z-10 bg-white rounded-full shadow p-2 mx-3 hover:bg-yellow-100 focus:outline-none"
              aria-label="Précédent"
            >
              <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            {/* Cartes */}
            <div className="flex-1 flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
              {getVisibleValeurs().map((value, idx) => (
                <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-lg w-full sm:max-w-sm flex-1 flex flex-col">
                  <div className="h-48 sm:h-56 w-full relative">
                    <Image src={value.image} alt={value.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" />
                  </div>
                  <div className="p-4 sm:p-6 flex flex-col flex-1">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#222]">{value.title}</h3>
                    <p className="text-gray-700 text-sm sm:text-base flex-1">{value.description}</p>
                    <button className="mt-4 sm:mt-6 bg-[#C38A00] text-white px-4 sm:px-6 py-2 rounded-full hover:bg-yellow-700 self-start text-sm sm:text-base">
                      SOUTENIR
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Flèche droite */}
            <button
              onClick={nextValeurs}
              className="absolute -right-4 sm:-right-12 z-10 bg-white rounded-full shadow p-2 mx-3 hover:bg-yellow-100 focus:outline-none"
              aria-label="Suivant"
            >
              <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-6 sm:mt-8 gap-2">
            {valeurs.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full ${idx === startIndexValeurs ? 'bg-[#C38A00]' : 'bg-gray-300'} inline-block`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/cta.jpg"
            alt="Fond CTA"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#1B2537] opacity-75"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          <div className="text-center md:text-left text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Devenir parrain</h2>
            <p className="mb-6 text-sm sm:text-base">Devenez un atout clé de la vie d'un enfant vulnérable. En tant que parrain, vous offrez plus que du soutien financier.</p>
            <button className="bg-primary text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-primary/90 text-sm sm:text-base">
              S'INSCRIRE
            </button>
          </div>
          <div className="text-center md:text-left text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Faire un don</h2>
            <p className="mb-6 text-sm sm:text-base">Chaque contribution nous permet d'agir concrètement pour aider plus d'enfants vulnérables.</p>
            <button className="bg-primary text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-primary/90 text-sm sm:text-base">
              FAIRE UN DON
            </button>
          </div>
        </div>
      </section>

      {/* Nos Projets Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-black">Nos projets</h2>
          <div className="flex justify-center mb-8">
            <span className="block w-12 h-1 bg-yellow-700 rounded"></span>
          </div>
          <div className="relative flex items-center">
            {/* Flèche gauche */}
            <button
              onClick={prevProjets}
              className="absolute -left-4 sm:-left-12 z-10 bg-white rounded-full shadow p-2 mx-3 hover:bg-yellow-100 focus:outline-none"
              aria-label="Précédent"
            >
              <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            {/* Cartes */}
            <div className="flex-1 flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
              {getVisibleProjets().map((project, idx) => (
                <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-lg w-full sm:max-w-sm flex-1 flex flex-col">
                  <div className="h-48 sm:h-56 w-full relative">
                    <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" />
                  </div>
                  <div className="p-4 sm:p-6 flex flex-col flex-1">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#222]">{project.title}</h3>
                    <p className="text-gray-700 text-sm sm:text-base flex-1">{project.description}</p>
                    <button className="mt-4 sm:mt-6 bg-[#C38A00] text-white px-4 sm:px-6 py-2 rounded-full hover:bg-yellow-700 self-start text-sm sm:text-base">
                      EN SAVOIR PLUS
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Flèche droite */}
            <button
              onClick={nextProjets}
              className="absolute -right-4 sm:-right-12 z-10 bg-white rounded-full shadow p-2 mx-3 hover:bg-yellow-100 focus:outline-none"
              aria-label="Suivant"
            >
              <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-6 sm:mt-8 gap-2">
            {projets.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full ${idx === startIndexProjets ? 'bg-[#C38A00]' : 'bg-gray-300'} inline-block`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      
    </main>
  )
} 