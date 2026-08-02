import localFont from 'next/font/local'

export const arbel = localFont({
  src: [
    { path: '../../../fonts/ArbelG-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../../fonts/ArbelG-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../../fonts/ArbelG-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-arbel',
  display: 'swap',
})

export const arbelStencil = localFont({
  src: '../../../fonts/ArbelG-Stencil.woff2',
  variable: '--font-arbel-stencil',
  display: 'swap',
})

export const eshkolita = localFont({
  src: '../../../fonts/eshkolita-regular-fm.woff2',
  variable: '--font-eshkolita',
  display: 'swap',
})
