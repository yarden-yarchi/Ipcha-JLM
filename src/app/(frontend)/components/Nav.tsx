'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import logo from '../../../../assets/logo-site.svg'
import styles from './Nav.module.css'

const NAV_LINKS = [
  { href: '/content-library', label: 'מאגר תכנים' },
  { href: '/partners', label: 'שותפים ותוכניות' },
  { href: '/workshops', label: 'סדנאות והשתלמויות' },
  { href: '/vision', label: 'החזון שלנו' },
]

function NavLinkItem({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string
  label: string
  isActive: boolean
  onClick?: () => void
}) {
  return (
    <li>
      <Link href={href} className={isActive ? styles.linkActive : undefined} onClick={onClick}>
        {isActive && <span className={styles.linkActiveBg} />}
        <span className={styles.linkText}>{label}</span>
      </Link>
    </li>
  )
}

export function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={styles.header}>
      <nav className={styles.pill} aria-label="ניווט ראשי">
        <Link href="/" className={styles.logo} aria-label="איפכא - לעמוד הבית">
          <Image src={logo} alt="איפכא" priority />
        </Link>

        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <NavLinkItem key={link.href} {...link} isActive={pathname === link.href} />
          ))}
        </ul>

        <a href="#contact" className={styles.cta}>
          דברו אלינו
        </a>

        <button
          type="button"
          className={styles.hamburger}
          aria-label={menuOpen ? 'סגירת תפריט' : 'פתיחת תפריט'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileLinks}>
            {NAV_LINKS.map((link) => (
              <NavLinkItem key={link.href} {...link} isActive={pathname === link.href} onClick={closeMenu} />
            ))}
          </ul>
          <a href="#contact" className={styles.mobileCta} onClick={closeMenu}>
            דברו אלינו
          </a>
        </div>
      )}
    </header>
  )
}
