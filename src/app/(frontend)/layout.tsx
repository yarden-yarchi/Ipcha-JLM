import React from 'react'
import './styles.css'
import { AdminBarProvider } from './components/AdminBarProvider'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { arbel, arbelStencil, eshkolita } from './fonts'

export const metadata = {
  description: 'עמותת איפכא - מרחב חינוכי לקהילה',
  title: 'איפכא',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      lang="he"
      dir="rtl"
      className={`${arbel.variable} ${arbelStencil.variable} ${eshkolita.variable}`}
    >
      <body>
        <AdminBarProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </AdminBarProvider>
      </body>
    </html>
  )
}
