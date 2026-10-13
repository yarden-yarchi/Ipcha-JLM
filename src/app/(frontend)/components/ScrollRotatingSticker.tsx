'use client'

import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import styles from './ScrollRotatingSticker.module.css'

const DEGREES_PER_PIXEL = 0.3
const MOBILE_BREAKPOINT = 900
const MOBILE_BASE_ANGLE = -80
const DESKTOP_BASE_ANGLE = -100

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
  const textWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const baseAngle =
        window.innerWidth <= MOBILE_BREAKPOINT ? MOBILE_BASE_ANGLE : DESKTOP_BASE_ANGLE
      const angle = baseAngle + window.scrollY * DEGREES_PER_PIXEL
      if (textWrapRef.current) {
        textWrapRef.current.style.transform = `rotate(${angle}deg)`
      }
    }

    update()

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <Link href={href} className={`${styles.link} ${className ?? ''}`} aria-label={ariaLabel}>
      <Image src={bgImage} alt="" className={styles.bg} />
      <div ref={textWrapRef} className={styles.textWrap}>
        <Image src={textImage} alt="" className={styles.text} />
      </div>
    </Link>
  )
}
