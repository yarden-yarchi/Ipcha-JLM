'use client'

import { PayloadAdminBar } from '@payloadcms/admin-bar'
import type { PayloadMeUser } from '@payloadcms/admin-bar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

import styles from './AdminBarProvider.module.css'

export type AdminBarOffsetState = 'bar' | 'none'

const AdminUserContext = createContext<PayloadMeUser>(null)
const AdminBarOffsetContext = createContext<AdminBarOffsetState>('none')

export function useAdminUser() {
  return useContext(AdminUserContext)
}

export function useAdminBarOffset() {
  return useContext(AdminBarOffsetContext)
}

const PATH_TO_CREATE_LINKS: Record<string, { slug: string; label: string }[]> = {
  '/workshops': [{ slug: 'workshops', label: 'הוסף סדנא/השתלמות' }],
  '/content-library': [{ slug: 'content-library-items', label: 'הוסף יחידת תוכן' }],
  '/partners': [
    { slug: 'map-locations', label: 'הוסף מיקום על המפה' },
    { slug: 'whats-happening-here', label: 'הוסף "מה עוד קורה כאן"' },
  ],
}

export function AdminBarProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PayloadMeUser>(null)
  const pathname = usePathname()
  const createLinks = PATH_TO_CREATE_LINKS[pathname] ?? []
  const offsetState: AdminBarOffsetState = user ? 'bar' : 'none'

  return (
    <AdminUserContext.Provider value={user}>
      <AdminBarOffsetContext.Provider value={offsetState}>
        {/* Mounted only to poll auth state via the official onAuthChange hook; its own UI is hidden — we render a fully custom bar below. */}
        <PayloadAdminBar cmsURL="" adminPath="/admin-dashboard" onAuthChange={setUser} style={{ display: 'none' }} />
        {user && (
          <>
            <div className={styles.spacer} />
            <div className={styles.bar}>
              <div className={styles.barGroup}>
                <Link href="/admin-dashboard" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  ניהול
                </Link>
                {user.email && <span className={styles.userEmail}>{user.email}</span>}
              </div>

              {createLinks.length > 0 && (
                <div className={styles.barGroup}>
                  {createLinks.map((link) => (
                    <Link
                      key={link.slug}
                      href={`/admin-dashboard/collections/${link.slug}/create`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.createLink}
                    >
                      + {link.label}
                    </Link>
                  ))}
                </div>
              )}

              <a
                href="/admin-dashboard/logout"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                התנתק
              </a>
            </div>
          </>
        )}
        {children}
      </AdminBarOffsetContext.Provider>
    </AdminUserContext.Provider>
  )
}
