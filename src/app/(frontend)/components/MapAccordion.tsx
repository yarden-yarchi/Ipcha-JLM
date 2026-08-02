'use client'

import Image from 'next/image'
import { useState } from 'react'

import mapImage from '../../../../assets/partners/neighborhood-map.png'
import styles from './MapAccordion.module.css'

// TODO: תוכן זמני - יוחלף בשמות ותיאורים סופיים של בתי הספר
const SCHOOLS = [
  { id: 1, name: 'ת"לי מתמטי', x: 9.7, y: 11.5 },
  { id: 2, name: 'פסגת דוד', x: 47.0, y: 33.2 },
  { id: 3, name: 'מדעי טכנולוגי', x: 35.9, y: 40.1 },
  { id: 4, name: 'טדי קולק', x: 24.8, y: 48.8 },
  { id: 5, name: 'מדעים ואמנויות', x: 25.8, y: 68.2 },
  { id: 6, name: 'של"ב', x: 15.4, y: 69.8 },
  { id: 7, name: 'ת"לי פסגות מונטסורי', x: 69.7, y: 68.2 },
  { id: 8, name: 'השחר', x: 53.8, y: 72.3 },
  { id: 9, name: 'ישיבת שפ"ע', x: 46.0, y: 82.3 },
]

const PLACEHOLDER_DESCRIPTION = 'תיאור בית הספר יתווסף בקרוב.'

export function MapAccordion() {
  const [activeId, setActiveId] = useState<number | null>(null)

  return (
    <div className={styles.wrapper}>
      <div className={styles.mapWrap}>
        <Image src={mapImage} alt="מפת בתי הספר בשכונה" className={styles.mapImage} />
        {SCHOOLS.map((school) => (
          <button
            key={school.id}
            type="button"
            className={`${styles.pin} ${activeId === school.id ? styles.pinActive : ''}`}
            style={{ left: `${school.x}%`, top: `${school.y}%` }}
            onMouseEnter={() => setActiveId(school.id)}
            onClick={() => setActiveId(school.id)}
            aria-label={school.name}
          >
            {school.id}
          </button>
        ))}
      </div>

      <div className={styles.accordion}>
        {SCHOOLS.map((school) => {
          const isOpen = activeId === school.id
          return (
            <div key={school.id} className={styles.row}>
              <button
                type="button"
                className={styles.rowHeader}
                onClick={() => setActiveId(isOpen ? null : school.id)}
                onMouseEnter={() => setActiveId(school.id)}
              >
                <span className={styles.rowSign}>{isOpen ? '-' : '+'}</span>
                <span className={styles.rowTitle}>{school.name}</span>
                <span className={styles.rowBadge}>{school.id}</span>
              </button>
              {isOpen && <p className={styles.rowDescription}>{PLACEHOLDER_DESCRIPTION}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
