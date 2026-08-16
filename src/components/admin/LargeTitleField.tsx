'use client'

import { useField } from '@payloadcms/ui'

export function LargeTitleField() {
  const { value, setValue, path } = useField<string>()

  return (
    <div className="field-type text" style={{ marginBottom: 'var(--base)' }}>
      <input
        id={`field-${path}`}
        type="text"
        value={value || ''}
        onChange={(e) => setValue(e.target.value)}
        placeholder="כותרת..."
        style={{
          width: '100%',
          fontSize: '2em',
          fontWeight: 700,
          padding: '0.3em 0',
          border: 'none',
          borderBottom: '2px solid var(--theme-elevation-150)',
          outline: 'none',
          background: 'transparent',
          fontFamily: 'inherit',
          color: 'var(--theme-text)',
        }}
      />
    </div>
  )
}
