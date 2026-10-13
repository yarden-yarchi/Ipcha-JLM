import Image from 'next/image'
import Link from 'next/link'

import iconFacebook from '../../../../assets/misc/icon-facebook.svg'
import iconInstagram from '../../../../assets/misc/icon-instagram.svg'
import iconMail from '../../../../assets/misc/icon-mail.svg'
import iconPhone from '../../../../assets/misc/icon-phone.svg'
import iconPin from '../../../../assets/misc/icon-pin.svg'
import logoLockup from '../../../../assets/misc/logo-footer-lockup.svg'
import whatsappBubble from '../../../../assets/misc/whatsapp-bubble.png'
import { ContactForm } from './ContactForm'
import styles from './Footer.module.css'
import { NAV_LINKS } from './navLinks'

const CREDITS = [
  { label: 'עיצוב: טלי גלעד', href: 'https://taligilad.co.il/' },
  { label: 'צילומים: מרסל דייצ׳ב', href: 'https://www.instagram.com/marcelle_photographer/' },
  { label: 'פיתוח: ירדן ירחי', href: 'https://yarden-yarchi.com' },
]

const SOCIAL_LINKS = [
  {
    icon: iconInstagram,
    href: 'https://www.instagram.com/ipcha.jlm?psln=b3JwMnF2OWNqM2ds&utm_source=qr',
    label: 'אינסטגרם',
  },
  {
    icon: iconFacebook,
    href: 'https://www.facebook.com/share/1BtNsNkaDs/?mibextid=wwXIfr',
    label: 'פייסבוק',
  },
  { icon: iconPhone, href: 'tel:+972733946200', label: 'טלפון' },
  { icon: iconMail, href: 'mailto:office@ipcha.org.il', label: 'מייל' },
  { icon: iconPin, href: 'https://maps.app.goo.gl/eqyhGKTG8qGupirL7', label: 'מיקום' },
]

export function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.inner}>
        <div className={styles.right}>
          <Image src={logoLockup} alt="איפכא" className={styles.logo} />
          <ul className={styles.sitemap}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <div className={styles.social}>
            {SOCIAL_LINKS.map((link) => {
              const isExternal = link.href.startsWith('http')
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                >
                  <Image src={link.icon} alt="" />
                </a>
              )
            })}
          </div>
        </div>
        <ContactForm />
      </div>
      <div className={styles.copyrightRow}>
        <p className={styles.copyright}>כל הזכויות שמורות לאיפכא</p>
        <div className={styles.legalLinks}>
          <Link href="/privacy-policy">מדיניות פרטיות</Link>
          <Link href="/accessibility">הצהרת נגישות</Link>
        </div>
      </div>
      <div className={styles.credits}>
        {CREDITS.map((credit) => (
          <a key={credit.label} href={credit.href} target="_blank" rel="noopener noreferrer">
            {credit.label}
          </a>
        ))}
      </div>
      <a
        href="https://wa.me/972733946200"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsapp}
        aria-label="שלחו לנו הודעה בוואטסאפ"
      >
        <Image src={whatsappBubble} alt="" />
      </a>
    </footer>
  )
}
