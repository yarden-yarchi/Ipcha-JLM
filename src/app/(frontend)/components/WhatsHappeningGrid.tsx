'use client'

import Image from 'next/image'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import type { Media, WhatsHappeningHere } from '@/payload-types'
import starOrange from '../../../../assets/partners/star-orange.svg'
import { AdminEditLink } from './AdminEditLink'
import { FadeInView } from './FadeInView'
import { WhatsHappeningCard } from './WhatsHappeningCard'
import styles from './WhatsHappeningGrid.module.css'

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
        {items.map((item) => (
          <FadeInView key={item.id} className={styles.cardWrap}>
            <WhatsHappeningCard item={item} onClick={() => setActive(item)} />
            <AdminEditLink collection="whats-happening-here" id={item.id} />
          </FadeInView>
        ))}
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
