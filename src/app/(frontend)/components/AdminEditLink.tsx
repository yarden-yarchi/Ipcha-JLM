'use client'

import { useAdminUser } from './AdminBarProvider'
import styles from './AdminEditLink.module.css'

export function AdminEditLink({ collection, id }: { collection: string; id: string | number }) {
  const user = useAdminUser()

  if (!user) return null

  return (
    <a
      href={`/admin-dashboard/collections/${collection}/${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.editLink}
      onClick={(e) => e.stopPropagation()}
      aria-label="ערוך פריט זה"
      title="ערוך פריט זה"
    >
      ✎
    </a>
  )
}
