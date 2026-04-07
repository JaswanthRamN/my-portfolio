import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import { SITE_NAME, SITE_DESCRIPTION } from '@/utils/constants'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  title: `${SITE_NAME} | Data Analyst Portfolio`,
  description: SITE_DESCRIPTION,
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans noise-overlay">
        <ScrollProgress />
        <Header />
        <main className="min-h-screen relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
