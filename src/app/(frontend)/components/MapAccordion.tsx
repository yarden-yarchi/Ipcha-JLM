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

const TOOLTIP_PATH =
  'M6.7598 0H162.149L162.168 0.0106613C162.519 0.20366 162.967 0.278514 163.353 0.412371C166.213 1.40261 168.3 4.12341 168.906 7.05124V29.3913C168.019 32.123 166.94 34.1887 164.239 35.5629C163.231 36.0783 162.131 36.3871 161.002 36.4713C159.772 36.5651 157.861 36.5009 156.571 36.4991L148.463 36.4937L122.478 36.4956L47.4919 36.4968L22.7286 36.4969C18.6189 36.4968 13.8203 36.3687 9.79153 36.522C6.65802 39.6186 3.44314 42.9912 0.274135 46H0V6.95882C0.0968366 6.62502 0.198399 6.29262 0.304656 5.9617C1.05131 3.67057 2.6421 1.76728 4.8281 0.692191C5.45495 0.383896 6.2865 0.244228 6.74051 0.0101235L6.7598 0Z'

export function MapAccordion() {
  const [activeId, setActiveId] = useState<number>(SCHOOLS[0].id)
  const activeSchool = SCHOOLS.find((school) => school.id === activeId)

  return (
    <div className={styles.wrapper}>
      <div className={styles.accordion}>
        {SCHOOLS.map((school) => {
          const isOpen = activeId === school.id
          return (
            <div key={school.id} className={styles.row}>
              <button
                type="button"
                className={styles.rowHeader}
                onClick={() => setActiveId(school.id)}
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

      <div className={styles.mapWrap}>
        <Image src={mapImage} alt="מפת בתי הספר בשכונה" className={styles.mapImage} />
        {SCHOOLS.map(
          (school) =>
            activeId === school.id && (
              <span
                key={school.id}
                className={styles.pinHalo}
                style={{ left: `${school.x}%`, top: `${school.y}%` }}
              />
            ),
        )}
        {SCHOOLS.map((school) => (
          <button
            key={school.id}
            type="button"
            className={`${styles.pin} ${activeId === school.id ? styles.pinActive : ''}`}
            style={{ left: `${school.x}%`, top: `${school.y}%` }}
            onClick={() => setActiveId(school.id)}
            aria-label={school.name}
          >
            {school.id}
          </button>
        ))}

        {activeSchool && (
          <div
            className={styles.tooltip}
            style={{ left: `${activeSchool.x}%`, top: `${activeSchool.y}%` }}
          >
            <svg
              className={styles.tooltipShape}
              viewBox="0 0 169 46"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d={TOOLTIP_PATH} fill="#042CD2" />
            </svg>
            <span className={styles.tooltipText}>{activeSchool.name}</span>
          </div>
        )}
      </div>
    </div>
  )
}
