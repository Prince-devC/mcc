'use client';

import { useState } from 'react';
import Image from 'next/image';
import LoadingScreen from '../components/LoadingScreen';
import { useEffect } from 'react';


const donationAmounts = [
  { amount: 10, label: '10€' },
  { amount: 25, label: '25€' },
  { amount: 50, label: '50€' },
  { amount: 100, label: '100€' },
  { amount: 250, label: '250€' },
  { amount: 500, label: '500€' },
];

export default function DonatePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour traiter le don
    console.log({
      amount: selectedAmount || customAmount,
      isMonthly,
      ...formData,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-[#1B2537]">
        <div className="absolute inset-0">
          <Image
            src="/images/valeur-2.jpg"
            alt="Faire un don"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Faire un don</h1>
            <p className="text-xl">Votre soutien fait la différence</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Donation Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Votre don</h2>
            
            {/* Donation Type Toggle */}
            <div className="flex items-center space-x-4 mb-8">
              <button
                className={`flex-1 py-3 px-6 rounded-lg ${
                  !isMonthly
                    ? 'bg-[#C38A00] text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setIsMonthly(false)}
              >
                Don unique
              </button>
              <button
                className={`flex-1 py-3 px-6 rounded-lg ${
                  isMonthly
                    ? 'bg-[#C38A00] text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setIsMonthly(true)}
              >
                Don mensuel
              </button>
            </div>

            {/* Amount Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Montant du don</h3>
              <div className="grid grid-cols-3 gap-4">
                {donationAmounts.map(({ amount, label }) => (
                  <button
                    key={amount}
                    className={`py-3 px-4 rounded-lg border-2 ${
                      selectedAmount === amount
                        ? 'border-[#C38A00] bg-[#C38A00] text-white'
                        : 'border-gray-200 hover:border-[#C38A00]'
                    }`}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <input
                  type="number"
                  placeholder="Autre montant"
                  className="w-full py-3 px-4 rounded-lg border-2 border-gray-200 focus:border-[#C38A00] focus:outline-none"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                />
              </div>
            </div>

            {/* Donor Information Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 focus:border-[#C38A00] focus:outline-none"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 focus:border-[#C38A00] focus:outline-none"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 focus:border-[#C38A00] focus:outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 focus:border-[#C38A00] focus:outline-none"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 focus:border-[#C38A00] focus:outline-none"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 focus:border-[#C38A00] focus:outline-none"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code postal
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 focus:border-[#C38A00] focus:outline-none"
                    value={formData.postalCode}
                    onChange={(e) =>
                      setFormData({ ...formData, postalCode: e.target.value })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C38A00] text-white py-3 px-6 rounded-lg hover:bg-[#A67A00] transition-colors"
              >
                {isMonthly ? 'Faire un don mensuel' : 'Faire un don'}
              </button>
            </form>
          </div>

          {/* Right Column - Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Pourquoi faire un don ?</h2>
              <p className="text-gray-600 mb-4">
                Votre don nous permet de continuer notre mission d'aide aux enfants,
                jeunes et femmes vulnérables. Chaque contribution compte et fait une
                réelle différence dans leur vie.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-[#C38A00] mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Financement de nos programmes éducatifs</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-[#C38A00] mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Soutien aux familles dans le besoin</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-[#C38A00] mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Développement de nouveaux projets</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Informations importantes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Reçu fiscal</h3>
                  <p className="text-gray-600">
                    Un reçu fiscal vous sera envoyé pour tout don supérieur à 50€.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Sécurité</h3>
                  <p className="text-gray-600">
                    Vos informations sont sécurisées et ne seront jamais partagées
                    avec des tiers.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Questions ?</h3>
                  <p className="text-gray-600">
                    Pour toute question concernant votre don, n'hésitez pas à nous
                    contacter au 01 23 45 67 89 ou par email à contact@mcc.org
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 