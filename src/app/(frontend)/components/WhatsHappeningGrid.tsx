'use client'

import Image from 'next/image'
import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import type { Media, WhatsHappeningHere } from '@/payload-types'
import starOrange from '../../../../assets/partners/star-orange.svg'
import { AdminEditLink } from './AdminEditLink'
import { FadeInView } from './FadeInView'
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

export function WhatsHappeningGrid({ items }: { items: WhatsHappeningHere[] }) {
  const [active, setActive] = useState<WhatsHappeningHere | null>(null)
  const activeImage = active?.image as Media | undefined

  return (
    <section className={styles.section}>
      <h2 className={styles.headingWrap}>
        <span className={`${styles.headingHighlight} ${styles.headingDesktopOnly}`}>
          <span className={styles.headingBg} />
          <span className={styles.heading}>מה עוד קורה כאן?</span>
        </span>
        <span className={styles.headingMobileOnly}>
          <span className={styles.headingHighlight}>
            <span className={styles.headingBg} />
            <span className={styles.heading}>מה עוד</span>
          </span>{' '}
          <span className={styles.headingHighlight}>
            <span className={styles.headingBg} />
            <span className={styles.heading}>קורה כאן?</span>
          </span>
        </span>
      </h2>
      <div className={styles.grid}>
        {items.map((item) => {
          const image = item.image as Media
          return (
            <FadeInView key={item.id} className={styles.cardWrap}>
              <button type="button" className={styles.card} onClick={() => setActive(item)}>
                {image?.url && (
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className={styles.cardImage}
                    sizes="(max-width: 700px) 90vw, 301px"
                  />
                )}
                <span className={styles.cardOverlay} />
                <span className={styles.cardTitle}>
                  <CardTitle title={item.title} />
                </span>
              </button>
              <AdminEditLink collection="whats-happening-here" id={item.id} />
            </FadeInView>
          )
        })}
        {items.length === 0 && <p className={styles.empty}>עדיין אין פריטים.</p>}
      </div>

      {active &&
        createPortal(
          <div className={styles.modalBackdrop} onClick={() => setActive(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <Image src={starOrange} alt="" className={styles.modalStar} />
              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setActive(null)}
                aria-label="סגירה"
              >
                ✕
              </button>
              <div className={styles.modalScroll}>
                <div className={styles.modalContent}>
                  <h3 className={styles.modalTitle}>{active.title}</h3>
                  <p className={styles.modalText}>{active.text}</p>
                  {active.buttonLabel && active.buttonUrl && (
                    <a
                      href={active.buttonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.modalCta}
                    >
                      {active.buttonLabel}
                    </a>
                  )}
                </div>
                {activeImage?.url && (
                  <div className={styles.modalImageWrap}>
                    <Image
                      src={activeImage.url}
                      alt={activeImage.alt}
                      fill
                      className={styles.modalImage}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  )
}
