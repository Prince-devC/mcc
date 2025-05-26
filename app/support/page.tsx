"use client";
import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';

export default function Support() {

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
            src="/images/support/valeur-1.jpg"
            alt="Bénévoles en action"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">ETRE BENEVOLE</h1>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-yellow-600 text-center mb-6">
          Nous nous rendons disponibles pour vous !
        </h2>

        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16">
          Devenir bénévole, c'est s'engager concrètement pour faire grandir notre mission.
          Que ce soit pour aider lors de nos distributions, accompagner les enfants ou soutenir nos actions au quotidien, chaque
          geste compte. En donnant un peu de votre temps, vous contribuez à changer des vies.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/support/valeur-2.jpg"
              alt="Équipe de bénévoles"
              fill
              className="object-cover"
            />
          </div>

          {/* Formulaire */}
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                placeholder="Votre email"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                placeholder="Votre numéro de téléphone"
              />
            </div>

            <div>
              <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
                Profession
              </label>
              <input
                type="text"
                id="profession"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                placeholder="Votre profession"
              />
            </div>

            <button className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors">
              ENVOYER
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 