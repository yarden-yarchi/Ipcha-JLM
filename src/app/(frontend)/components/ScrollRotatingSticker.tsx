'use client'

import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import styles from './ScrollRotatingSticker.module.css'

export function ScrollRotatingSticker({
  href,
  ariaLabel,
  bgImage,
  textImage,
  className,
}: {
  href: string
  ariaLabel: string
  bgImage: StaticImageData
  textImage: StaticImageData
  className?: string
}) {
  const textRef = useRef<HTMLImageElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const baseScrollRef = useRef<number | null>(null)

  useEffect(() => {
    let frame = 0

    const rotate = () => {
      frame = 0
      if (baseScrollRef.current === null) return
      const angle = ((window.scrollY - baseScrollRef.current) * 0.15) % 360
      if (textRef.current) {
        textRef.current.style.transform = `rotate(${angle}deg)`
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(rotate)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && baseScrollRef.current === null) {
          baseScrollRef.current = window.scrollY
          rotate()
        }
      },
      { threshold: 0 },
    )
    if (linkRef.current) observer.observe(linkRef.current)

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  return (
    <Link
      ref={linkRef}
      href={href}
      className={`${styles.link} ${className ?? ''}`}
      aria-label={ariaLabel}
    >
      <Image src={bgImage} alt="" className={styles.bg} />
      <Image ref={textRef} src={textImage} alt="" className={styles.text} />
    </Link>
  )
}
