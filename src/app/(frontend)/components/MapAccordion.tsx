'use client'

import Image from 'next/image'
import { useState } from 'react'

import type { MapLocation } from '@/payload-types'
import mapImage from '../../../../assets/partners/neighborhood-map.png'
import styles from './MapAccordion.module.css'

const TOOLTIP_PATH =
  'M6.7598 0H162.149L162.168 0.0106613C162.519 0.20366 162.967 0.278514 163.353 0.412371C166.213 1.40261 168.3 4.12341 168.906 7.05124V29.3913C168.019 32.123 166.94 34.1887 164.239 35.5629C163.231 36.0783 162.131 36.3871 161.002 36.4713C159.772 36.5651 157.861 36.5009 156.571 36.4991L148.463 36.4937L122.478 36.4956L47.4919 36.4968L22.7286 36.4969C18.6189 36.4968 13.8203 36.3687 9.79153 36.522C6.65802 39.6186 3.44314 42.9912 0.274135 46H0V6.95882C0.0968366 6.62502 0.198399 6.29262 0.304656 5.9617C1.05131 3.67057 2.6421 1.76728 4.8281 0.692191C5.45495 0.383896 6.2865 0.244228 6.74051 0.0101235L6.7598 0Z'

export function MapAccordion({ locations }: { locations: MapLocation[] }) {
  const [activeId, setActiveId] = useState<number | undefined>(locations[0]?.id)
  const activeLocation = locations.find((location) => location.id === activeId)

  return (
    <div className={styles.wrapper}>
      <div className={styles.accordion}>
        {locations.map((location) => {
          const isOpen = activeId === location.id
          return (
            <div key={location.id} className={styles.row}>
              <button
                type="button"
                className={styles.rowHeader}
                onClick={() => setActiveId(location.id)}
              >
                <span className={styles.rowSign}>{isOpen ? '-' : '+'}</span>
                <span className={styles.rowTitle}>{location.title}</span>
                <span className={styles.rowBadge}>{location.order}</span>
              </button>
              {isOpen && <p className={styles.rowDescription}>{location.description}</p>}
            </div>
          )
        })}
      </div>

      <div className={styles.mapPadding}>
        <div className={styles.mapWrap}>
          <Image src={mapImage} alt="מפת בתי הספר בשכונה" className={styles.mapImage} />
          {locations.map(
            (location) =>
              activeId === location.id && (
                <span
                  key={location.id}
                  className={styles.pinHalo}
                  style={{ left: `${location.position.x}%`, top: `${location.position.y}%` }}
                />
              ),
          )}
          {locations.map((location) => (
            <button
              key={location.id}
              type="button"
              className={`${styles.pin} ${activeId === location.id ? styles.pinActive : ''}`}
              style={{ left: `${location.position.x}%`, top: `${location.position.y}%` }}
              onClick={() => setActiveId(location.id)}
              aria-label={location.title}
            >
              {location.order}
            </button>
          ))}

          {activeLocation && (
            <div
              className={styles.tooltip}
              style={{ left: `${activeLocation.position.x}%`, top: `${activeLocation.position.y}%` }}
            >
              <svg
                className={styles.tooltipShape}
                viewBox="0 0 169 46"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d={TOOLTIP_PATH} fill="#042CD2" />
              </svg>
              <span className={styles.tooltipText}>{activeLocation.title}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
