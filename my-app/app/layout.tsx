import type { Metadata } from 'next'
import { Inter } from 'next/font/google' // <-- UNCOMMENTED
import './globals.css' // <-- UNCOMMENTED

/*
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', // Using Inter as the font
})
*/

// =============================================================================
// NEW METADATA BLOCK
// =============================================================================
export const metadata: Metadata = {
  // This sets the browser tab title
  title: 'Rajesh Kumar | Cyber Security Analyst & Researcher',
  
  // This is the description for Google
  description: 'The professional portfolio of Rajesh Kumar, a Cyber Security Analyst specializing in SIEM, Penetration Testing, and Digital Forensics.',
  
  // These are the "What's Missing" SEO tags for social sharing
  openGraph: {
    title: 'Rajesh Kumar | Cyber Security Analyst & Researcher',
    description: 'Explore the portfolio of Rajesh Kumar, Cyber Security Analyst.',
    url: 'https://rajeshkumar.tech', // Once your domain is live
    siteName: 'Rajesh Kumar Portfolio',
    images: [
      {
        // You should create this image (1200x630) and put it in /public/images/
        url: '/images/og-image.png', 
        width: 1200,
        height: 630,
        alt: 'Rajesh Kumar - Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajesh Kumar | Cyber Security Analyst & Researcher',
    description: 'Explore the portfolio of Rajesh Kumar, Cyber Security Analyst.',
    images: ['/images/og-image.png'], // This image is used for Twitter cards too
  },
}
// =============================================================================
// END OF NEW BLOCK
// =============================================================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* FAVICON: You already have a 'favicon.ico' file in your 'app/' folder. 
        Next.js automatically detects this file, so you don't need to add
        any code here for the favicon!
      */}
      {/* <body className={inter.variable}>{children}</body> {/* <-- RESTORED FONT */}
      <body className="">{children}</body>
    </html>
  )
}