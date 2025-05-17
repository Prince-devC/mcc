import './globals.css'
import type { Metadata } from 'next'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { merriweather } from './fonts'

export const metadata: Metadata = {
  title: 'MCC - Modèles de Changement de la Cité',
  description: 'Modèles de Changement de la Cité',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${merriweather.variable} font-merriweather flex flex-col min-h-screen`}>
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 