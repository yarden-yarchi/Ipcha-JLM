'use client'

import Image from 'next/image'
import { useState } from 'react'

import type { Media, WhatsHappeningHere } from '@/payload-types'
import styles from './WhatsHappeningGrid.module.css'

export function WhatsHappeningGrid({ items }: { items: WhatsHappeningHere[] }) {
  const [active, setActive] = useState<WhatsHappeningHere | null>(null)
  const activeImage = active?.image as Media | undefined

  return (
    <section className={`${styles.section} gridLinesWhite`}>
      <h2 className={styles.heading}>מה עוד קורה כאן?</h2>
      <div className={styles.grid}>
        {items.map((item) => {
          const image = item.image as Media
          return (
            <button
              key={item.id}
              type="button"
              className={styles.card}
              onClick={() => setActive(item)}
            >
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
              <span className={styles.cardTitle}>{item.title}</span>
            </button>
          )
        })}
        {items.length === 0 && <p className={styles.empty}>עדיין אין פריטים.</p>}
      </div>

      {active && (
        <div className={styles.modalBackdrop} onClick={() => setActive(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setActive(null)}
              aria-label="סגירה"
            >
              ✕
            </button>
            {activeImage?.url && (
              <div className={styles.modalImageWrap}>
                <Image src={activeImage.url} alt={activeImage.alt} fill className={styles.modalImage} />
              </div>
            )}
            <div className={styles.modalContent}>
              <h3>{active.title}</h3>
              <p>{active.text}</p>
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
          </div>
        </div>
      )}
    </section>
  )
}
