import Image from 'next/image';

export default function About() {
  const team = [
    {
      name: 'Aurel GBEMENOU',
      role: 'Spécialiste en Formalisation et Impact social des ONG, Fondateur et auto-emploi | Accompagnement en création, structuration et reconstruction légale | Entrepreneur social',
      image: '/about/founder.jpg'
    },
    {
      name: 'Estelle DEHA',
      role: 'Informaticienne de gestion de formation | Développeur informatique de profession | Chargée de Programme à MCC',
      image: '/about/estelle.jpg'
    },
    {
      name: 'Sapience LAOUROU',
      role: 'Expert en Monitoring de Projet/Programme | Statisticien Economiste | Facilitateur de Développement Local | Analyste des politiques publiques | Consultant en Développement',
      image: '/about/sapience.jpg'
    }
  ];

  const testimonials = [
    {
      name: 'DOSSOU Bertin',
      role: 'Parent',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique in pellentesque ultrices et massa neque, convallis ipsum. Erat amet sit justo et turpis dui accumsan lorem. Diam justo, amet nunc amet quis. Fringilla nunc, pharetra ut risus. Amet nunc placerat ultricies.'
    },
    {
      name: 'AGOSSOU Jonathan',
      role: 'Enfant',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique in pellentesque ultrices et massa neque, convallis ipsum. Erat amet sit justo et turpis dui accumsan lorem. Diam justo, amet nunc amet quis. Fringilla nunc, pharetra ut risus. Amet nunc placerat ultricies.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-8 text-black">Qui sommes - nous ?</h1>
        <h2 className="text-2xl font-semibold mb-4 text-black">L'historique et expériences de l'ONG</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="prose max-w-none">
            <p className="text-black">L'ONG MCC, sérieusement connue sous le nom de GBEMENOU Charity, est née d'une histoire de résilience, d'équité sociale et d'un profond désir de transformation.</p>
            <p className="text-black">Son fondateur, GBEMENOU Brice Aurel, a vécu une enfance marquée par la précarité et l'isolement. Après avoir connu bon nombre de défis, plus ou moins durs en 2015, notamment trois jours après la proclamation de ses résultats du BEPC, il a connu l'agréable phase la rue. Plus tard, il a pu par ses mérites et son abnégation, se relever et se reconstruire. Aujourd'hui, il se renouvelle sans cesse ni oublier. Dans un contexte où la promotion sociale des scolarisés et enfants vulnérables était quasi inexistante, il a su se battre pour survivre. Comme de nombreux jeunes abandonnés, il a dû se battre pour survivre bien qu'étant un enfant, il a quitté son pays pour s'exiler. Sa vie a été un parcours semé d'embûches et de défis. En tant qu'agent de sécurité, tout en poursuivant ses études universitaires et ses activités de violence intercalée. Mais cette expérience lui a fait renforcer sa prise de conscience. Beaucoup d'enfants font face à la même réalité et n'ont pas ces mêmes possibilités.</p>
          </div>
          <div className="relative h-[650px] -mt-32">
            <Image 
              src="/about/founder.jpg"
              alt="Fondateur de MCC"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">L'équipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">{member.name}</h3>
              <p className="text-gray-600 text-black">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-black">Temoignages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <blockquote className="text-gray-700 mb-4">"{testimonial.text}"</blockquote>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-gray-600">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Souscrivez à notre newsletter</h2>
        <p className="mb-4">Recevez régulièrement des dernières nouvelles et actualités pour soutenir les enfants de notre expérience.</p>
        <form className="flex gap-4">
          <input
            type="email"
            placeholder="Votre adresse email"
            className="flex-1 px-4 py-2 rounded-lg border"
          />
          <button
            type="submit"
            className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700"
          >
            S'inscrire
          </button>
        </form>
      </section>
    </div>
  );
} 