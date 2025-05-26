"use client";
import Image from 'next/image';
import Link from 'next/link';
import LoadingScreen from '../components/LoadingScreen';
import { useState } from 'react';
import { useEffect } from 'react';


export default function Projects() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un temps de chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 secondes de chargement

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  const projects = [
    {
      id: 'miracle-noel',
      title: "Miracle de Noël",
      description: "Chaque année, ce projet phare de l'ONG permet de soutenir les enfants vulnérables en leur offrant des soins médicaux gratuits, des kits alimentaires, des fournitures scolaires et des vêtements....",
      image: "/images/projects/valeur-1.jpg",
      progress: 17
    },
    {
      id: 'rentree-pour-tous',
      title: "La Rentrée Pour Tous",
      description: "L'objectif de ce projet est de faciliter l'accès à l'éducation pour les enfants issus de milieux défavorisés. Grâce à la distribution de kits scolaires et au parrainage, plus de 20 jeunes ont pu reprendre leur ...",
      image: "/images/projects/valeur-2.jpg",
      progress: 52
    },
    {
      id: 'paquinous',
      title: "Paquinous",
      description: "Chaque année pendant les fêtes de Pâques, ce projet combine divertissement, apprentissage et soutien psychologique. Il permet à plus de 150 jeunes de bénéficier de jeux éducatifs, de coaching en .....",
      image: "/images/projects/valeur-3.jpg",
      progress: 17
    },
    {
      id: 'instant-bonheur',
      title: "Instant de Bonheur",
      description: "Ce projet vise à apporter un moment de réconfort aux enfants en situation difficile à travers des activités ludiques, des spectacles et des partages de repas....",
      image: "/images/projects/valeur-3.jpg",
      progress: 32
    }
  ];

  return (
    <main className="min-h-screen py-8 sm:py-12 bg-gray-50">
      {/* En-tête de la page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Nos Projets</h1>
          
          {/* Barre de recherche */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
            <input
              type="text"
              placeholder="Recherche projet"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 text-sm sm:text-base"
            />
            <button className="bg-yellow-600 text-white px-6 sm:px-8 py-2 rounded-lg hover:bg-yellow-700 text-sm sm:text-base whitespace-nowrap">
              RECHERCHE
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <p className="text-gray-600 text-sm sm:text-base">4 Résultats trouvés</p>
            <select className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 text-sm sm:text-base">
              <option>les projets les plus recherchés</option>
            </select>
          </div>
        </div>

        {/* Grille des projets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-48 sm:h-56">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">{project.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4">{project.description}</p>
                
                {/* Barre de progression */}
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-yellow-600 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{project.progress}% des fonds récoltés</p>
                </div>

                <Link 
                  href={`/projects/${project.id}`}
                  className="inline-block bg-yellow-600 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-yellow-700 text-sm sm:text-base"
                >
                  EN SAVOIR PLUS
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Devenir parrain / Faire un don */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-[#1B2537] text-white p-6 sm:p-8 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Devenir parrain</h2>
            <p className="mb-6 text-sm sm:text-base">Devenez un pilier dans la vie d'un enfant en difficulté. En tant que parrain, vous offrez bien plus qu'un soutien financier : vous offrez de l'espoir, de la stabilité et un lien humain précieux. Ensemble, construisons un avenir meilleur.</p>
            <Link 
              href="/partnership"
              className="bg-yellow-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-yellow-700 inline-block text-sm sm:text-base"
            >
              S'INSCRIRE
            </Link>
          </div>

          <div className="bg-[#1B2537] text-white p-6 sm:p-8 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Faire un don</h2>
            <p className="mb-6 text-sm sm:text-base">Soutenez nos actions en faisant un don. Chaque contribution nous permet d'agir concrètement auprès des plus démunis. Ensemble, apportons aide, dignité et espoir là où le besoin est urgent.</p>
            <Link 
              href="/donate"
              className="bg-yellow-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-yellow-700 inline-block text-sm sm:text-base"
            >
              FAIRE UN DON
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 