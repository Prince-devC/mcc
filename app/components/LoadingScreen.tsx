'use client';

import Image from 'next/image';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Logo centré avec effet de pulsation */}
        <div className="absolute inset-0 flex items-center justify-center animate-pulse-scale">
          <Image
            src="/images/logomccnoir@300x-8.png"
            fill
            alt="MCC Logo"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

// Ajoute dans le fichier global CSS (par exemple globals.css) :
// @keyframes pulse-scale {
//   0%, 100% { transform: scale(1); }
//   50% { transform: scale(1.15); }
// }
// .animate-pulse-scale {
//   animation: pulse-scale 1.2s infinite cubic-bezier(0.4,0,0.6,1);
// } 