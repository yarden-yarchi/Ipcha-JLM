'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import type { ContentLibraryItem, Media } from '@/payload-types'
import { AdminEditLink } from './AdminEditLink'
import styles from './ContentLibraryCard.module.css'

const FREE_HINTS = ['ללא עלות', 'חינם', 'חינמי']

export function ContentLibraryCard({ item }: { item: ContentLibraryItem }) {
  const image = item.image as Media
  const isFree = FREE_HINTS.some((hint) => item.price.includes(hint))

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <AdminEditLink collection="content-library-items" id={item.id} />
      <div className={styles.imageWrap}>
        {image?.url && (
          <Image src={image.url} alt={image.alt} fill className={styles.image} sizes="(max-width: 700px) 90vw, 406px" />
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
        <div className={styles.footer}>
          <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer" className={styles.cta}>
            {isFree ? 'להורדה >>' : 'לרכישה >>'}
          </a>
          <span className={styles.price}>{item.price}</span>
        </div>
      </div>
    </motion.div>
  )
}
