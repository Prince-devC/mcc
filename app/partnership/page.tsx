import Image from 'next/image';

export default function Partnership() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px]">
        <div className="absolute inset-0">
          <Image
            src="/images/partnership/hero-bg.jpg"
            alt="Enfants soutenus"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">PARRAINNER UN ENFANT</h1>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-yellow-600 text-center mb-6">
          Nous nous rendons disponibles pour vous !
        </h2>

        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16">
          Parrainner un enfant, c'est lui donner la chance de poursuivre sa scolarité dans de bonnes conditions. Grâce à votre soutien,
          il pourra bénéficier de fournitures scolaires, d'un accompagnement éducatif et d'un encadrement bienveillant. Chaque
          parrainage est un pas de plus vers un avenir meilleur pour ces enfants.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/images/partnership/valeur-3.jpg"
              alt="Enfants bénéficiaires"
              fill
              className="object-cover"
            />
          </div>

          {/* Formulaire */}
          <div className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
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
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                Pourquoi voudrez-vous nous contacter ?
              </label>
              <select
                id="reason"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              >
                <option value="parrainage">Parrainner un enfant</option>
                <option value="don">Faire un don</option>
                <option value="benevolat">Devenir bénévole</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                placeholder="Votre message"
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