import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { SessionProvider } from "@/lib/SessionProvider";
import './globals.css'

export const metadata = {
  title: 'My App',
  description: 'Next.js App with navigation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <SessionProvider>
        <Navbar />
        <Sidebar />
        <main className="ml-64 pt-16 p-6 min-h-screen">
        {children}
        </main>
        </SessionProvider>
      </body>
    </html>
  )
}
