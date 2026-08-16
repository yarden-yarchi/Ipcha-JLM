import Image from 'next/image'

import type { Media, Workshop } from '@/payload-types'
import sparkleStar from '../../../../assets/misc/sparkle-star.png'
import { AdminEditLink } from './AdminEditLink'
import styles from './WorkshopTeaserCard.module.css'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
  })
}

export function WorkshopTeaserCard({ workshop }: { workshop: Workshop }) {
  const image = workshop.image as Media

  return (
    <div className={styles.card}>
      <AdminEditLink collection="workshops" id={workshop.id} />
      {image?.url && (
        <div className={styles.imageWrap}>
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className={styles.image}
            sizes="(max-width: 800px) 100vw, 482px"
          />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{workshop.title}</h3>
        </div>

        <div className={styles.descriptionRow}>
          <p className={styles.description}>{workshop.description}</p>
          <Image src={sparkleStar} alt="" className={styles.starRight} />
        </div>

        <div className={styles.metaRow}>
          <div className={`${styles.metaCell} ${styles.metaCellDate}`}>
            {formatDate(workshop.date)}
          </div>
          <div className={`${styles.metaCell} ${styles.metaCellHours}`}>{workshop.hours}</div>
          <div className={styles.metaCell}>{workshop.location}</div>
          <Image src={sparkleStar} alt="" className={styles.starLeft} />
        </div>

        <a
          href={workshop.signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          <span className={styles.ctaText}>{'לכל הפרטים >>'}</span>
        </a>
      </div>

      {workshop.bubbleText && <span className={styles.bubble}>{workshop.bubbleText}</span>}
    </div>
  )
}
