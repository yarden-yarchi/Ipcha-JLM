import Image from 'next/image'

import type { Media, Workshop } from '@/payload-types'
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
      <div className={styles.content}>
        <h3 className={styles.title}>{workshop.title}</h3>
        <p className={styles.description}>{workshop.description}</p>
        <div className={styles.meta}>
          <span>{workshop.location}</span>
          <span>{workshop.hours}</span>
          <span>{formatDate(workshop.date)}</span>
        </div>
        <a href={workshop.signupUrl} target="_blank" rel="noopener noreferrer" className={styles.cta}>
          {'לכל הפרטים >>'}
        </a>
      </div>
      {image?.url && (
        <div className={styles.imageWrap}>
          <Image src={image.url} alt={image.alt} fill className={styles.image} sizes="(max-width: 900px) 100vw, 482px" />
        </div>
      )}
    </div>
  )
}
