'use client'

import Image from 'next/image'
import { useState } from 'react'

import type { MapLocation } from '@/payload-types'
import mapImage from '../../../../assets/partners/neighborhood-map.png'
import styles from './MapAccordion.module.css'

const TOOLTIP_PIN_PATH = 'M0 8C0 3.58172 3.58172 0 8 0H9.376V33L0 45V8Z'

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
              <span className={styles.tooltipLabel}>{activeLocation.title}</span>
              <svg className={styles.tooltipPin} viewBox="0 0 9.376 45" aria-hidden="true">
                <path d={TOOLTIP_PIN_PATH} fill="var(--color-blue)" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
