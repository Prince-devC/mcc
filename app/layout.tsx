import './globals.css'
import type { Metadata } from 'next'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { merriweather } from './fonts'

export const metadata: Metadata = {
  title: 'MCC - Mission Chrétienne pour Christ',
  description: 'Mission Chrétienne pour Christ - Aider les plus démunis',
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