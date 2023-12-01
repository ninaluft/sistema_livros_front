import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layouts/navbar'
import { toast, ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <ToastContainer />

        {children}

      </body>
    </html>
  )
}
