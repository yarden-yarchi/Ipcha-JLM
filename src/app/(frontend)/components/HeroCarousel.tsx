'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'

import styles from './HeroCarousel.module.css'

export function HeroCarousel({
  images,
  mobileImages,
}: {
  images: StaticImageData[]
  mobileImages?: StaticImageData[]
}) {
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
          key={`desktop-${index}`}
          src={image}
          alt=""
          fill
          priority={index === 0}
          className={`${styles.image} ${mobileImages ? styles.desktopOnly : ''}`}
          style={{ opacity: index === active ? 1 : 0 }}
        />
      ))}
      {mobileImages?.map((image, index) => (
        <Image
          key={`mobile-${index}`}
          src={image}
          alt=""
          fill
          priority={index === 0}
          className={`${styles.image} ${styles.mobileOnly}`}
          style={{ opacity: index === active ? 1 : 0 }}
        />
      ))}
    </div>
  )
}
