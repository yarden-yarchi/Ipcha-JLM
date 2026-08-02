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

const SITEMAP_LINKS = [
  { href: '/vision', label: 'החזון שלנו' },
  { href: '/', label: 'בואו לאיפכא' },
  { href: '/partners', label: 'מה תמצאו אצלנו?' },
  { href: '/content-library', label: 'מאגר תכנים' },
]

// TODO: להחליף בקישורים חיצוניים אמיתיים (רשתות חברתיות, טלפון, מייל, מיקום, וואטסאפ) כשיישלחו
const SOCIAL_LINKS = [
  { icon: iconInstagram, href: '#', label: 'אינסטגרם' },
  { icon: iconFacebook, href: '#', label: 'פייסבוק' },
  { icon: iconPhone, href: 'tel:', label: 'טלפון' },
  { icon: iconMail, href: 'mailto:', label: 'מייל' },
  { icon: iconPin, href: '#', label: 'מיקום' },
]

export function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.inner}>
        <ContactForm />
        <div className={styles.right}>
          <Image src={logoLockup} alt="איפכא" className={styles.logo} />
          <ul className={styles.sitemap}>
            {SITEMAP_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <div className={styles.social}>
            {SOCIAL_LINKS.map((link) => (
              <a key={link.label} href={link.href} aria-label={link.label}>
                <Image src={link.icon} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className={styles.copyright}>כל הזכויות שמורות לאיפכא / קרדיטים מיתוג עיצוב בנייה צילום</p>
      {/* TODO: לקשר למספר וואטסאפ אמיתי */}
      <a href="#" className={styles.whatsapp} aria-label="שלחו לנו הודעה בוואטסאפ">
        <Image src={whatsappBubble} alt="" />
      </a>
    </footer>
  )
}
