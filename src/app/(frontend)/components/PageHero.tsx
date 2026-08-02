import Image, { type StaticImageData } from 'next/image'

import { Nav } from './Nav'
import styles from './PageHero.module.css'

export function PageHero({ image, title }: { image: StaticImageData; title: string }) {
  return (
    <section className={styles.hero}>
      <Image src={image} alt="" fill priority className={styles.image} />
      <div className={styles.overlay} />
      <Nav />
      <h1 className={styles.title}>{title}</h1>
    </section>
  )
}
