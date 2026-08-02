import React from 'react'
import './styles.css'
import { Footer } from './components/Footer'
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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
