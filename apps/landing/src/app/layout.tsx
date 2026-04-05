import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CloneMyVoice - Your Voice, Infinite Possibilities',
  description: 'Clone your voice with AI. Reply to thousands of fans in your own voice while you sleep.',
  keywords: ['voice cloning', 'AI voice', 'creator tools', 'DM automation', 'influencer tools'],
  openGraph: {
    title: 'CloneMyVoice - Your Voice, Infinite Possibilities',
    description: 'Clone your voice with AI. Reply to thousands of fans in your own voice while you sleep.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
