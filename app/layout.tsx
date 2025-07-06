import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tawala - Revolutionizing Kenya\'s Gig Economy',
  description: 'Connect with professionals for short-term services. Join Kenya\'s leading gig economy platform that bridges the gap between service providers and clients.',
  keywords: 'gig economy, Kenya, freelance, services, events, marketplace, professionals, short-term work',
  authors: [{ name: 'Tawala Team' }],
  creator: 'Tawala',
  publisher: 'Tawala',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tawala-web.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tawala-web.vercel.app/',
    title: 'Tawala - Revolutionizing Kenya\'s Gig Economy',
    description: 'Connect with professionals for short-term services. Join Kenya\'s leading gig economy platform.',
    siteName: 'Tawala',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tawala - Gig Economy Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tawala - Revolutionizing Kenya\'s Gig Economy',
    description: 'Connect with professionals for short-term services. Join Kenya\'s leading gig economy platform.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

