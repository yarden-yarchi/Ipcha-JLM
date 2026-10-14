'use client'

import type { DefaultCellComponentProps } from 'payload'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const LABELS: Record<string, string> = {
  draft: 'טיוטה',
  published: 'פורסם',
}

export function StatusCell({ cellData, collectionSlug, rowData }: DefaultCellComponentProps) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const status = typeof cellData === 'string' ? cellData : 'published'
  const nextStatus = status === 'published' ? 'draft' : 'published'

  async function toggle(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setPending(true)
    try {
      await fetch(`/api/${collectionSlug}/${rowData.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      })
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      title={`לחצו כדי להפוך ל${LABELS[nextStatus]}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        border: 'none',
        borderRadius: '999px',
        padding: '4px 12px',
        fontSize: '13px',
        fontWeight: 600,
        cursor: pending ? 'wait' : 'pointer',
        opacity: pending ? 0.6 : 1,
        background: status === 'published' ? '#d1f5d3' : '#f0f0f0',
        color: status === 'published' ? '#1a7a2e' : '#666',
      }}
    >
      {LABELS[status]}
    </button>
  )
}
