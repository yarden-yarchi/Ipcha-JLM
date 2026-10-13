'use client'

import Image from 'next/image'
import { useLayoutEffect, useRef, useState } from 'react'

import type { Media, WhatsHappeningHere } from '@/payload-types'
import styles from './WhatsHappeningGrid.module.css'

function CardTitle({ title }: { title: string }) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [lastLineStart, setLastLineStart] = useState(0)
  const words = title.split(' ')

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    function measure() {
      const wordEls = Array.from(container!.querySelectorAll<HTMLSpanElement>('[data-word]'))
      if (wordEls.length === 0) return
      const tops = wordEls.map((el) => el.offsetTop)
      const maxTop = Math.max(...tops)
      setLastLineStart(tops.findIndex((top) => top === maxTop))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    return () => observer.disconnect()
  }, [title])

  return (
    <span ref={containerRef} className={styles.cardTitleText}>
      {words.map((word, index) => (
        <span
          key={index}
          data-word
          className={index >= lastLineStart ? styles.cardTitleUnderline : undefined}
        >
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

export function WhatsHappeningCard({
  item,
  onClick,
}: {
  item: Pick<WhatsHappeningHere, 'title' | 'image'>
  onClick?: () => void
}) {
  const image = item.image as Media

  return (
    <button type="button" className={styles.card} onClick={onClick}>
      {image?.url && (
        <Image
          src={image.url}
          alt={image.alt}
          fill
          className={styles.cardImage}
          sizes="(max-width: 700px) 90vw, 301px"
        />
      )}
      <span className={styles.cardTitle}>
        <CardTitle title={item.title} />
      </span>
    </button>
  )
}
