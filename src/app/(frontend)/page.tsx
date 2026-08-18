import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@/payload.config'
import heroSlide1 from '../../../assets/hero-slides/hero-slide-1.png'
import heroSlide2 from '../../../assets/hero-slides/hero-slide-2.png'
import heroSlide3 from '../../../assets/hero-slides/hero-slide-3.png'
import cardTitle1 from '../../../assets/home/image-18.png'
import cardTitle2 from '../../../assets/home/image-19.png'
import cardTitle3 from '../../../assets/home/image-20.png'
import teamPhoto from '../../../assets/home/image-27-alt.jpeg'
import sparkPhoto from '../../../assets/home/image-09.jpeg'
import stickerBg from '../../../assets/misc/sticker-bg.svg'
import stickerText from '../../../assets/misc/sticker-text.svg'
import sparkleStar from '../../../assets/misc/sparkle-star.png'
import squiggle from '../../../assets/misc/squiggle-hero.svg'
import squiggleMobile from '../../../assets/misc/squiggle-hero-mobile.png'
import { FoldedCornerCard, type FoldCorner } from './components/FoldedCornerCard'
import { HeroCarousel } from './components/HeroCarousel'
import { PhotoBand } from './components/PhotoBand'
import { ScrollRotatingSticker } from './components/ScrollRotatingSticker'
import { WorkshopTeaserCard } from './components/WorkshopTeaserCard'
import styles from './page.module.css'

type StarPosition = 'top-left' | 'bottom-right' | 'top-right'

const WHAT_WE_DO_CARDS: {
  titleImage: typeof cardTitle1
  titleAlt: string
  titleRotate: number
  text: string
  ctaLabel: string
  href: string
  corner: FoldCorner
  star: StarPosition
}[] = [
  {
    titleImage: cardTitle1,
    titleAlt: 'כאן מוצאים השראה',
    titleRotate: 6.16,
    text: 'ספרייה מתעדכנת של עזרים פדגוגיים מעוצבים, שנועדו להכניס צבע, יצירתיות וחדשנות לכיתה שלך.',
    ctaLabel: 'למאגר התכנים >>',
    href: '/content-library',
    corner: 'top-right',
    star: 'top-left',
  },
  {
    titleImage: cardTitle2,
    titleAlt: 'עוזרים להצית את הניצוץ',
    titleRotate: -5.67,
    text: 'הזדמנויות ללמידה באמצעות כלי חשיבה עיצובית. מפגשים שמעניקים למורים כלים רעננים ליצירת הוראה רלוונטית ומותאמת, והופכים תיאוריה לפרקטיקה.',
    ctaLabel: 'סדנאות והשתלמויות >>',
    href: '/workshops',
    corner: 'top-left',
    star: 'bottom-right',
  },
  {
    titleImage: cardTitle3,
    titleAlt: 'בתי ספר מעצבים לחיים',
    titleRotate: 5.1,
    text: 'תהליך שמזהה אתגרים חינוכיים והופך אותם להזדמנויות. הזמנה לצאת מהשגרה ולחשוב כמו מעצבים: בואו להכיר פדגוגיה שיוצאת מהקופסה ונשארת מחוברת לכיתה.',
    ctaLabel: 'התפיסה שלנו >>',
    href: '/vision',
    corner: 'bottom-right',
    star: 'top-right',
  },
]

const STAR_CLASS: Record<StarPosition, string> = {
  'top-left': styles.cardStarTopLeft,
  'bottom-right': styles.cardStarBottomRight,
  'top-right': styles.cardStarTopRight,
}

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const latestWorkshops = await payload.find({
    collection: 'workshops',
    sort: '-date',
    limit: 1,
  })
  const latestWorkshop = latestWorkshops.docs[0]

  return (
    <>
      <section className={styles.hero}>
        <HeroCarousel images={[heroSlide1, heroSlide2, heroSlide3]} />
        <Image src={squiggle} alt="" className={styles.heroSquiggle} />
        <Image src={squiggleMobile} alt="" className={styles.heroSquiggleMobile} />
      </section>

      <section className={`${styles.whatWeDo} gridLinesBlue`}>
        <div className={styles.sectionHeadingWrap}>
          <span className={styles.sectionHeadingBg} />
          <h2 className={styles.sectionHeading}>מה עושים באיפכא?</h2>
        </div>

        <div className={styles.cardsGrid}>
          {WHAT_WE_DO_CARDS.map((card) => (
            <FoldedCornerCard key={card.titleAlt} corner={card.corner} className={styles.card}>
              <Image src={sparkleStar} alt="" className={`${styles.cardStar} ${STAR_CLASS[card.star]}`} />
              <div className={styles.cardContent}>
                <Link href={card.href}>
                  <Image
                    src={card.titleImage}
                    alt={card.titleAlt}
                    className={styles.cardTitleImage}
                    style={{ transform: `rotate(${card.titleRotate}deg)` }}
                  />
                </Link>
                <p>{card.text}</p>
                <Link href={card.href} className={styles.cardCta}>
                  {card.ctaLabel}
                </Link>
              </div>
            </FoldedCornerCard>
          ))}
        </div>
      </section>

      <section className={`${styles.teamBlurb} gridLinesWhite`}>
        <Image src={teamPhoto} alt="צוות איפכא" fill className={styles.teamBlurbPhoto} />
        <div className={styles.teamBlurbContent}>
          <div className={styles.teamText}>
            <div className={styles.teamTextInner} />
            <svg className={styles.teamTextFold} viewBox="0 0 89 89" aria-hidden="true">
              <path
                d="M88.3729 36.3833C88.3729 65.0705 61.5206 88.3285 28.3918 88.3285H0.36546L88.3729 0V36.3833Z"
                fill="#E6E6E6"
              />
            </svg>
            <div className={styles.teamTextContent}>
              <div className={styles.teamTextHeadingWrap}>
                <div className={styles.teamTextFoldSpacer} />
                <h2>היי, אנחנו איפכא!</h2>
              </div>
              <p>
                צוות של אנשי חינוך ומעצבים מתחומים מגוונים. הידע והניסיון שלנו יוצרים חיבור ודרך פעולה
                ייחודית, המאפשרת לנו לחבור לצוותי חינוך, לזהות אתגרים, להפוך אותם להזדמנויות ולהתנסות
                בפתרונות יצירתיים וחווייתיים שאפשר להביא לכיתה.
              </p>
              <Link href="/vision" className={styles.teamCta}>
                רוצים לגלות עוד?
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.teamMobilePhotoWrap}>
          <Image src={teamPhoto} alt="" fill className={styles.teamMobilePhoto} />
        </div>
      </section>

      <section className={`${styles.spark} gridLinesWhite`}>
        <div className={styles.sparkCard}>
          <div className={styles.sparkText}>
            <h2 className={styles.sparkHeading}>
              <span className={styles.sparkHeadingDesktopOnly}>
                <span className={styles.sparkHeadingBgDesktop} />
                <span className={styles.sparkHeadingText}>מחפשים את הניצוץ?</span>
              </span>
              <span className={styles.sparkHeadingMobileOnly}>
                <span className={styles.sparkHeadingHighlight}>
                  <span className={styles.sparkHeadingBg} />
                  <span className={styles.sparkHeadingText}>מחפשים את</span>
                </span>{' '}
                <span className={styles.sparkHeadingHighlight}>
                  <span className={styles.sparkHeadingBg} />
                  <span className={styles.sparkHeadingText}>הניצוץ?</span>
                </span>
              </span>
            </h2>
            <p>
              אנחנו באיפכא פותחים לכם את הדלת ללמידה והתנסות. בואו להעשיר את ארגז הכלים שלכם בחדשנות
              חינוכית וחשיבה עיצובית
            </p>
            <Link href="/workshops" className={styles.sparkCta}>
              {'הסדנאות וההשתלמויות שלנו >>'}
            </Link>
          </div>
          <div className={styles.sparkPhotoWrap}>
            <Image src={sparkPhoto} alt="" fill className={styles.sparkPhoto} />
          </div>
          <ScrollRotatingSticker
            href="/vision"
            ariaLabel="החזון שלנו"
            bgImage={stickerBg}
            textImage={stickerText}
            className={styles.sparkStickerLink}
          />
        </div>

        {latestWorkshop && (
          <div className={styles.latestWorkshop}>
            <WorkshopTeaserCard workshop={latestWorkshop} />
          </div>
        )}
      </section>

      <PhotoBand />
    </>
  )
}
