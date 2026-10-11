import Image, { type StaticImageData } from 'next/image'
import type { CSSProperties, ReactNode } from 'react'

import styles from './PageHero.module.css'

export function PageHero({
  image,
  title,
  extraMobileHeight,
}: {
  image: StaticImageData
  title: ReactNode
  extraMobileHeight?: number
}) {
  return (
    <section
      className={styles.hero}
      style={
        extraMobileHeight
          ? ({ '--hero-extra-height': `${extraMobileHeight}px` } as CSSProperties)
          : undefined
      }
    >
      <Image src={image} alt="" fill priority className={styles.image} />
      <div className={styles.overlay} />
      <h1 className={styles.title}>{title}</h1>
    </section>
  )
}
