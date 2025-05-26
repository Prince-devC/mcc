"use client"
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import LoadingScreen from '../components/LoadingScreen';


const teamMembers = [
  {
    name: 'Aurel GBEMENOU',
    role: 'Directeur Exécutif de MCC',
    desc: 'Spécialiste en formalisation et impact social des ONG, coaching et accompagnement, structuration et reconnaissance légale.',
    img: '/about/founder.jpg',
  },
  {
    name: 'Estelle DEHA',
    role: 'Chargée de Programme 2 MCC',
    desc: 'Informaticienne de gestion de formation, développement informatique et pilotage de projet.',
    img: '/about/estelle.jpg',
  },
  {
    name: 'Sapience LAOUROU',
    role: 'Responsable Suivi Évaluation',
    desc: 'Expert en monitoring de projet, analyse des politiques publiques, genre et inclusion.',
    img: '/about/sapience.jpg',
  },
  {
    name: 'Mabelle ODE',
    role: 'Responsable Comptabilité',
    desc: 'Experte comptable stagiaire, responsable comptabilité au sein de MCC.',
    img: '/about/mabelle.jpg',
  },
  {
    name: 'Rebecca EDOH',
    role: 'Chargée de Formation et d\'Éducation',
    desc: 'Spécialiste en agronomie, nutrition, sciences et technologie alimentaire, leadership et communication.',
    img: '/about/rebecca.jpg',
  },
  {
    name: 'Manuela FATONDJI',
    role: 'Responsable Trésorerie',
    desc: 'Auditeur financier et comptable, responsable trésorerie au sein de MCC.',
    img: '/about/manuella.jpg',
  },
  {
    name: 'Huguette BOSSE',
    role: 'Responsable Communication',
    desc: 'Spécialiste en stratégie commerciale et communication, organisation de projets et accompagnement des jeunes et femmes vulnérables.',
    img: '/about/huguette.jpg',
  },
];

const testimonials = [
  {
    text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique in pellentesque ultrices et massa neque, convallis lorem. Erat proin in posuere dui accumsan lorem."',
    author: 'DOSSOU Bertin',
    role: 'Parrain',
  },
  {
    text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique in pellentesque ultrices et massa neque, convallis lorem. Erat proin in posuere dui accumsan lorem."',
    author: 'AGOSSOU Jonathan',
    role: 'Enfant',
  },
  // Ajoute d'autres témoignages ici si besoin
];

function chunkArray(arr, size) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

export default function AboutPage() {
  // TOUS les hooks en haut !
  const [isLoading, setIsLoading] = useState(true);
  const [slide, setSlide] = useState(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [membersPerSlide, setMembersPerSlide] = useState(3);
  const [client, setClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  useEffect(() => {
    // Simuler un temps de chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 secondes de chargement
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setClient(true);
    function handleResize() {
      if (window.innerWidth < 640) setMembersPerSlide(1);
      else if (window.innerWidth < 768) setMembersPerSlide(2);
      else setMembersPerSlide(3);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = chunkArray(teamMembers, membersPerSlide);
  const maxSlide = slides.length - 1;
  const maxTestimonialSlide = testimonials.length - 1;

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setSlide((prev) => (prev === maxSlide ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxSlide, isHovered]);

  useEffect(() => {
    if (isTestimonialHovered) return;
    const interval = setInterval(() => {
      setTestimonialSlide((prev) => (prev === maxTestimonialSlide ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxTestimonialSlide, isTestimonialHovered]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (!client) return null;

  return (
    <div className="bg-[#F8F6EF] min-h-screen">
      {/* Header section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-4 text-[#1B2537]">Qui sommes – nous ?</h1>
            <h2 className="text-lg font-semibold text-yellow-700 mb-2">Historique et expériences de l'ONG</h2>
            <p className="mb-4 text-gray-800">
              L'ONG MCC, initialement connue sous le nom de GBEMENOU Charity, est née d'une histoire de résilience, d'injustice sociale et d'un profond désir de transformation.<br /><br />
              Son fondateur, GBEMENOU Drice Aurel, a vécu une enfance marquée par la précarité et l'abandon. Après avoir perdu son père en 2006, puis sa mère en 2012, seulement trois jours après sa proclamation et ses résultats au BEPC, il a connu l'orphelinat, puis la rue. Placé en internat par un oncle, il a dû, en cache sous l'aumônerie scolaire, lutter ici et là pour survivre, réaliser ses projets et enfin soutenir d'autres enfants. De son expérience, il tire l'inspiration sociale de son engagement envers les enfants vulnérables qui savent tout l'instant, leur sort dépend d'un geste, d'un sourire, d'un partage, d'un accompagnement. Comme de nombreux enfants, il a croisé la route de personnes qui ont su lui redonner espoir et sens à sa vie, à l'instar du pasteur Abidjo, qui a été à ses côtés.<br /><br />
              Un soir, touché par la détresse des enfants vivant dans l'enceinte du marché de Dantokpa, Aurel a décidé d'agir. Il a rassemblé ces enfants pour leur offrir un repas, les laver et leur adresser des mots d'encouragement. Ce soir-là, plus de 200 enfants vulnérables ont bénéficié de son action. Ce moment de partage fut le déclencheur. Ce qui n'était au départ qu'un groupe de compassion est rapidement devenu une véritable mission de vie. GBEMENOU Charity était née, avec un objectif clair : redonner espoir et opportunités aux enfants en situation difficile.
            </p>
            <h3 className="text-lg font-semibold text-yellow-700 mb-2">Un contexte social et économique difficile</h3>
            <p className="mb-4 text-gray-800">
              À l'époque de la création de l'ONG, la situation des enfants et jeunes orphelins faisait l'écho d'une montée alarmante du nombre d'enfants des rues, conséquence de la pauvreté des familles, de l'absence de politiques publiques efficaces et de la précarité de l'enfance. Les jeunes issus de milieux défavorisés étaient confrontés à l'exclusion, à la marginalisation et à l'absence de perspectives. Les rares structures d'accueil existantes étaient saturées et inadaptées, et les enfants étaient souvent livrés à eux-mêmes, exposés à toutes sortes de dangers. C'est dans ce contexte que l'ONG MCC a vu le jour, avec la volonté de faire la différence et d'apporter une aide concrète à ceux qui en ont le plus besoin.
            </p>
            <h3 className="text-lg font-semibold text-yellow-700 mb-2">Le déclic : un geste de solidarité qui change tout</h3>
            <p className="mb-4 text-gray-800">
              Un soir, touché par la détresse des enfants vivant dans l'enceinte du marché de Dantokpa, Aurel a décidé d'agir. Il a rassemblé ces enfants pour leur offrir un repas, les laver et leur adresser des mots d'encouragement. Ce soir-là, plus de 200 enfants vulnérables ont bénéficié de son action. Ce moment de partage fut le déclencheur. Ce qui n'était au départ qu'un groupe de compassion est rapidement devenu une véritable mission de vie. GBEMENOU Charity était née, avec un objectif clair : redonner espoir et opportunités aux enfants en situation difficile.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center md:justify-end">
            <Image
              src="/about/founder.jpg"
              alt="Aurel GBEMENOU"
              width={500}
              height={800}
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Équipe section - carrousel */}
      <div className="bg-[#F8F6EF] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8">
            <h2 className="text-2xl font-bold text-[#1B2537] mb-4 md:mb-0 md:w-1/3">L'équipe</h2>
            <p className="text-gray-700 md:w-2/3">
              Derrière chaque action de MCC se trouvent des femmes et des hommes passionnés, engagés et profondément convaincus de la nécessité d'agir pour améliorer le sort des enfants vulnérables. Notre équipe est composée de bénévoles et de professionnels aux compétences diverses et complémentaires, tous animés par la même volonté de faire la différence. Découvrez ci-dessous qui sont les piliers de notre association.
            </p>
          </div>
          <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSlide((s) => Math.max(0, s - 1))}
                  className="p-2 rounded-full bg-white text-yellow-600 shadow hover:bg-yellow-600 hover:text-white transition disabled:opacity-30"
                  disabled={slide === 0}
                aria-label="Précédent"
              >
                &#8592;
              </button>
              <div className="flex-1 flex justify-center gap-2">
                {slides.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-3 h-3 rounded-full inline-block ${slide === idx ? 'bg-yellow-600' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setSlide((s) => Math.min(maxSlide, s + 1))}
                className="p-2 rounded-full bg-white text-yellow-600 shadow hover:bg-yellow-600 hover:text-white transition disabled:opacity-30"
                disabled={slide === maxSlide}
                aria-label="Suivant"
              >
                &#8594;
              </button>
            </div>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${slide * 100}%)` }}
              >
                {slides.map((group, groupIdx) => (
                  <div
                    key={groupIdx}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-w-full"
                  >
                    {group.map((member) => (
                      <div key={member.name} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                        <Image src={member.img} alt={member.name} width={120} height={120} className="rounded-full object-cover mb-2" />
                        <h3 className="font-semibold text-[#1B2537]">{member.name}</h3>
                        <p className="text-xs text-gray-500 mb-1">{member.role}</p>
                        <p className="text-sm text-center text-gray-700">{member.desc}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Témoignages section - carrousel */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[#1B2537] mb-8">Témoignages</h2>
        <div className="relative" onMouseEnter={() => setIsTestimonialHovered(true)} onMouseLeave={() => setIsTestimonialHovered(false)}>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setTestimonialSlide((s) => Math.max(0, s - 1))}
              className="p-2 rounded-full bg-white text-yellow-600 shadow hover:bg-yellow-600 hover:text-white transition disabled:opacity-30"
              disabled={testimonialSlide === 0}
              aria-label="Précédent"
            >
              &#8592;
            </button>
            <div className="flex-1 flex justify-center gap-2">
              {testimonials.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-3 h-3 rounded-full inline-block ${testimonialSlide === idx ? 'bg-yellow-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setTestimonialSlide((s) => Math.min(maxTestimonialSlide, s + 1))}
              className="p-2 rounded-full bg-white text-yellow-600 shadow hover:bg-yellow-600 hover:text-white transition disabled:opacity-30"
              disabled={testimonialSlide === maxTestimonialSlide}
              aria-label="Suivant"
            >
              &#8594;
            </button>
          </div>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${testimonialSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="min-w-full">
                  <div className="bg-[#F8F6EF] rounded-lg shadow p-6">
                    <p className="italic text-gray-700 mb-2">{testimonial.text}</p>
                    <div className="font-bold text-[#1B2537]">{testimonial.author}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter section */}
      <div className="bg-[#F8F6EF] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#1B2537] mb-2">Souscrivez à notre newsletter</h2>
          <p className="mb-4 text-gray-700">Restez informé(e) des dernières nouvelles et initiatives pour soutenir les enfants de notre orphelinat.</p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-2 max-w-xl mx-auto">
            <input type="email" placeholder="Votre adresse mail" className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 w-full sm:w-auto" />
            <button type="submit" className="px-6 py-2 bg-white border border-yellow-600 text-yellow-700 font-semibold rounded hover:bg-yellow-600 hover:text-white transition">S'inscrire</button>
          </form>
        </div>
      </div>
    </div>
  );
} 