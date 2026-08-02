'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'

import styles from './HeroCarousel.module.css'

export function HeroCarousel({ images }: { images: StaticImageData[] }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className={styles.carousel}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt=""
          fill
          priority={index === 0}
          className={styles.image}
          style={{ opacity: index === active ? 1 : 0 }}
        />
      ))}
    </div>
  )
}
