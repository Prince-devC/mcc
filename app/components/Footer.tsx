import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1B2537] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-xl mb-4">MCC</h3>
          <p className="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus magna purus, nisl dolor sed egestas ut imperdiet volutpat.</p>
          <div className="flex space-x-4 mt-4">
            <Link href="https://facebook.com" className="bg-yellow-600 p-2 rounded-full hover:bg-yellow-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
              </svg>
            </Link>
            <Link href="https://twitter.com" className="bg-yellow-600 p-2 rounded-full hover:bg-yellow-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
              </svg>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-4">Liens utiles</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-gray-300 hover:text-white">Qui sommes-nous?</Link></li>
            <li><Link href="/projects" className="text-gray-300 hover:text-white">Nos projets</Link></li>
            <li><Link href="/support" className="text-gray-300 hover:text-white">Nous soutenir</Link></li>
            <li><Link href="/blog" className="text-gray-300 hover:text-white">blogs</Link></li>
            <li><Link href="/partnership" className="text-gray-300 hover:text-white">Partenariat</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Soutenir</h3>
          <Link 
            href="/donate"
            className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700 inline-block"
          >
            SOUTENIR
          </Link>
        </div>

        <div>
          <h3 className="font-bold mb-4">Newsletter</h3>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Votre email"
              className="bg-gray-700 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-600 flex-1"
            />
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-full hover:bg-yellow-700">
              S'INSCRIRE
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
} 