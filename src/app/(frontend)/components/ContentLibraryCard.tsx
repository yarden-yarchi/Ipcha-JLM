import Image from 'next/image'

import type { ContentLibraryItem, Media } from '@/payload-types'
import styles from './ContentLibraryCard.module.css'

const FREE_HINTS = ['ללא עלות', 'חינם', 'חינמי']

export function ContentLibraryCard({ item }: { item: ContentLibraryItem }) {
  const image = item.image as Media
  const isFree = FREE_HINTS.some((hint) => item.price.includes(hint))

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        {image?.url && (
          <Image src={image.url} alt={image.alt} fill className={styles.image} sizes="(max-width: 700px) 90vw, 406px" />
        )}
      </div>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.description}>{item.description}</p>
      <div className={styles.footer}>
        <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer" className={styles.cta}>
          {isFree ? 'להורדה >>' : 'לרכישה >>'}
        </a>
        <span className={styles.price}>{item.price}</span>
      </div>
    </div>
  )
}
