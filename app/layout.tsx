import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Suspense } from 'react'
import MetaPixel from '@/components/MetaPixel'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lane — Scheduled Auto Transport',
  description:
    'Scheduled auto transport between Houston and the DFW area. Published prices, Thursday and Friday departures. No surprise markups at dispatch.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-lane-bg text-lane-ink font-sans">
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
