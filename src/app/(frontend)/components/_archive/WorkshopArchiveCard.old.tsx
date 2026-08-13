import Image from 'next/image'

import type { Media, Workshop } from '@/payload-types'
import styles from './WorkshopArchiveCard.module.css'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
  })
}

export function WorkshopArchiveCard({ workshop, index }: { workshop: Workshop; index: number }) {
  const image = workshop.image as Media
  const isPink = index % 2 === 1

  return (
    <div
      className={`${styles.card} ${isPink ? styles.pink : styles.blue} ${
        isPink ? styles.imageFirst : ''
      }`}
    >
      <div className={styles.content}>
        {workshop.preTitle && <p className={styles.preTitle}>{workshop.preTitle}</p>}
        <h3 className={styles.title}>{workshop.title}</h3>
        <p className={styles.description}>{workshop.description}</p>
        <div className={styles.badges}>
          {workshop.hours && <span className={styles.badge}>{workshop.hours}</span>}
          <span className={styles.badge}>{formatDate(workshop.date)}</span>
        </div>
        {workshop.location && <span className={styles.locationBadge}>{workshop.location}</span>}
        <a href={workshop.signupUrl} target="_blank" rel="noopener noreferrer" className={styles.cta}>
          {'לפרטים והרשמה >>'}
        </a>
      </div>

      {image?.url && (
        <div className={styles.imageWrap}>
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className={styles.image}
            sizes="(max-width: 900px) 100vw, 519px"
          />
        </div>
      )}

      {workshop.bubbleText && <span className={styles.bubble}>{workshop.bubbleText}</span>}
    </div>
  )
}
