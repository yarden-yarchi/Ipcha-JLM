'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const COLLECTION_LABELS: Record<string, string> = {
  users: 'משתמשים',
  media: 'מדיה',
  workshops: 'סדנאות',
  'content-library-items': 'מאגר תכנים',
  'whats-happening-here': 'מה קורה כאן',
  'map-locations': 'מיקומים על המפה',
  'contact-submissions': 'פניות מטופס יצירת קשר',
}

export function BackToListButton() {
  const pathname = usePathname()
  const match = pathname?.match(/\/collections\/([^/]+)/)
  const slug = match?.[1]

  if (!slug) return null

  const label = COLLECTION_LABELS[slug] ?? 'רשימה'

  return (
    <Link
      href={`/admin-dashboard/collections/${slug}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        color: '#052cd1',
        fontSize: '0.95em',
        marginBottom: '1em',
        textDecoration: 'none',
      }}
    >
      → חזרה ל{label}
    </Link>
  )
}
