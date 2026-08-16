'use client'

import { useField } from '@payloadcms/ui'
import Image from 'next/image'
import { useCallback, useRef } from 'react'

import mapImage from '../../../assets/partners/neighborhood-map.png'

export function MapPositionField() {
  const xField = useField<number>({ path: 'position.x' })
  const yField = useField<number>({ path: 'position.y' })
  const wrapRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = wrapRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = Math.round((((e.clientX - rect.left) / rect.width) * 100 + Number.EPSILON) * 10) / 10
      const y = Math.round((((e.clientY - rect.top) / rect.height) * 100 + Number.EPSILON) * 10) / 10
      xField.setValue(Math.min(100, Math.max(0, x)))
      yField.setValue(Math.min(100, Math.max(0, y)))
    },
    [xField, yField],
  )

  const hasPosition = typeof xField.value === 'number' && typeof yField.value === 'number'

  return (
    <div className="field-type" style={{ marginBottom: 'var(--base)' }}>
      <label className="field-label">מיקום על המפה — לחצו על המפה כדי לקבוע את המיקום</label>
      <div
        ref={wrapRef}
        onClick={handleClick}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 520,
          cursor: 'crosshair',
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: 8,
          overflow: 'hidden',
          userSelect: 'none',
        }}
      >
        <Image
          src={mapImage}
          alt=""
          style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: 'none' }}
        />
        {hasPosition && (
          <div
            style={{
              position: 'absolute',
              left: `${xField.value}%`,
              top: `${yField.value}%`,
              transform: 'translate(-50%, -50%)',
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: '#fbb040',
              border: '2px solid #fff',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
      <p style={{ fontSize: 12, color: 'var(--theme-elevation-400)', marginTop: 6 }}>
        {hasPosition
          ? `מיקום נוכחי: x=${xField.value}%, y=${yField.value}%`
          : 'טרם נקבע מיקום — לחצו על המפה למעלה'}
      </p>
    </div>
  )
}
