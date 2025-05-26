"use client";
import LoadingScreen from '@/app/components/LoadingScreen';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';


export default function RentreePourTous() {
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
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px]">
        <div className="absolute inset-0">
          <Image
            src="/images/projects/rentree-pour-tous/hero.jpg"
            alt="La Rentrée Pour Tous"
            fill
            className="object-cover"
          />
          {/* Overlay avec la couleur exacte du header */}
          <div className="absolute inset-0 bg-[#1B2537] opacity-75"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">LA RENTRÉE POUR TOUS</h1>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image principale */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-yellow-600/20 z-10 flex items-center justify-center">
              <button className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <Image
              src="/images/projects/rentree-pour-tous/main.jpg"
              alt="Élève en train d'étudier"
              fill
              className="object-cover"
            />
          </div>

          {/* Informations du projet */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-yellow-600">LA RENTRÉE POUR TOUS</h2>
            
            <p className="text-gray-700">
              L'objectif de ce projet est de faciliter l'accès à l'éducation pour les enfants issus de milieux défavorisés. 
              Grâce à la distribution de kits scolaires et au parrainage, plus de 20 jeunes ont pu reprendre leur scolarité dans de 
              meilleures conditions
            </p>

            {/* Statistiques de financement */}
            <div className="grid grid-cols-3 gap-4 py-6">
              <div>
                <div className="text-xl font-bold">10.000.000 FCFA</div>
                <div className="text-sm text-gray-600">Objectif de financement</div>
              </div>
              <div>
                <div className="text-xl font-bold">2.000.000 FCFA</div>
                <div className="text-sm text-gray-600">Fonds récoltés</div>
              </div>
              <div>
                <div className="text-xl font-bold">2.000.000 FCFA</div>
                <div className="text-sm text-gray-600">Fonds récoltés</div>
              </div>
            </div>

            {/* Barre de progression */}
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-yellow-600 h-full" style={{ width: '20%' }} />
            </div>

            {/* Formulaire de don */}
            <div className="flex gap-4 mt-8">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="10.000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
                <span className="text-sm text-gray-600 ml-2">FCFA</span>
              </div>
              <button className="bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors">
                SOUTENIR MAINTENANT
              </button>
            </div>
          </div>
        </div>

        {/* Galerie d'images */}
        <div className="grid grid-cols-4 gap-4 mt-12">
          <div className="relative h-24 rounded-lg overflow-hidden">
            <Image
              src="/images/projects/rentree-pour-tous/thumbnail-1.jpg"
              alt="Image du projet 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-24 rounded-lg overflow-hidden">
            <Image
              src="/images/projects/rentree-pour-tous/thumbnail-2.jpg"
              alt="Image du projet 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-24 rounded-lg overflow-hidden">
            <Image
              src="/images/projects/rentree-pour-tous/thumbnail-3.jpg"
              alt="Image du projet 3"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-24 rounded-lg overflow-hidden">
            <Image
              src="/images/projects/rentree-pour-tous/thumbnail-4.jpg"
              alt="Image du projet 4"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Section CTA */}
      <div className="bg-[#1B2537] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ensemble, donnons-leur un meilleur avenir</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="/partnership"
              className="bg-yellow-600 text-white px-8 py-3 rounded-full hover:bg-yellow-700 inline-block"
            >
              DEVENIR PARRAIN
            </Link>
            <button className="bg-white text-yellow-600 px-8 py-3 rounded-full hover:bg-gray-100">
              FAIRE UN DON
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 