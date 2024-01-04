import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'pathcraft',
  description: 'pathcraft app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='min-h-screen'>
        {children}
        <footer className='flex justify-center'>
          <p>Made with love by<a target='blank' className='hover:bg-gray-400 p-1' href='https://buarki.com'>buarki.com.</a></p>
        </footer>
      </body>
    </html>
  )
}
