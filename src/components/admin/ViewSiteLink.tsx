import React from 'react'

/**
 * Official Payload override point: registered via admin.components.header in
 * payload.config.ts, alongside AdminTheme.
 */
export function ViewSiteLink() {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '32px',
        padding: '0 16px',
        background: '#4b5563',
        fontFamily: 'ArbelG, sans-serif',
        fontSize: '13px',
      }}
    >
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#fff', textDecoration: 'none' }}
      >
        צפייה באתר ↗
      </a>
    </div>
  )
}
