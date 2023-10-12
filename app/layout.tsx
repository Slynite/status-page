import { Metadata } from 'next';
import './globals.css'
import { Inter } from 'next/font/google';
import Footer from '@/components/footer/footer';

const inter = Inter({ subsets: ['latin'], weight: "variable" });

export const metadata: Metadata = {
  title: 'Slynite Status',
  description: 'Status page for Slynite services',
  authors: [
    {
      name: 'Slynite',
      url: 'https://slynite.com',
    },
  ],
  keywords: ['status', 'slynite', 'uptime', 'monitoring'],
  creator: 'Slynite and contributors',
  robots: 'index, follow',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
      suppressHydrationWarning={true} 
      className={`container mx-auto bg-black ${inter.className} text-white text-sm`}>
		<main className="flex min-h-screen flex-col items-center p-8 lg:pt-24 lg:pb-24 lg:pl-64 lg:pr-64">
			{children}
          	<Footer />
        </main>
      </body>
    </html>
  )
}
