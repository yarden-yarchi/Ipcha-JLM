import Image, { type StaticImageData } from 'next/image'
import type { ReactNode } from 'react'

import styles from './PageHero.module.css'

export function PageHero({ image, title }: { image: StaticImageData; title: ReactNode }) {
  return (
    <section className={styles.hero}>
      <Image src={image} alt="" fill priority className={styles.image} />
      <div className={styles.overlay} />
      <h1 className={styles.title}>{title}</h1>
    </section>
  )
}
