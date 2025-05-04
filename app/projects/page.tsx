import Image from 'next/image';
import Link from 'next/link';

export default function Projects() {
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
    <main className="min-h-screen py-12 bg-gray-50">
      {/* En-tête de la page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Nos Projets</h1>
          
          {/* Barre de recherche */}
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              placeholder="Recherche projet"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
            <button className="bg-yellow-600 text-white px-8 py-2 rounded-lg hover:bg-yellow-700">
              RECHERCHE
            </button>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600">4 Résultats trouvés</p>
            <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600">
              <option>les projets les plus recherchés</option>
            </select>
          </div>
        </div>

        {/* Grille des projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                {/* Barre de progression */}
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-yellow-600 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{project.progress}% des fonds récoltés</p>
                </div>

                <Link 
                  href={`/projects/${project.id}`}
                  className="inline-block bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700"
                >
                  EN SAVOIR PLUS
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Devenir parrain / Faire un don */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#1B2537] text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Devenir parrain</h2>
            <p className="mb-6">Devenez un pilier dans la vie d'un enfant en difficulté. En tant que parrain, vous offrez bien plus qu'un soutien financier : vous offrez de l'espoir, de la stabilité et un lien humain précieux. Ensemble, construisons un avenir meilleur.</p>
            <Link 
              href="/partnership"
              className="bg-yellow-600 text-white px-8 py-3 rounded-full hover:bg-yellow-700 inline-block"
            >
              S'INSCRIRE
            </Link>
          </div>

          <div className="bg-[#1B2537] text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Faire un don</h2>
            <p className="mb-6">Soutenez nos actions en faisant un don. Chaque contribution nous permet d'agir concrètement auprès des plus démunis. Ensemble, apportons aide, dignité et espoir là où le besoin est urgent.</p>
            <Link 
              href="/donate"
              className="bg-yellow-600 text-white px-8 py-3 rounded-full hover:bg-yellow-700 inline-block"
            >
              FAIRE UN DON
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 