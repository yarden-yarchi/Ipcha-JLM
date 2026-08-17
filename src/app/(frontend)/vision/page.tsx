import Image from 'next/image'

import heroImage from '../../../../assets/vision/hero.jpg'
import starPink from '../../../../assets/vision/star-pink.svg'
import doodle1 from '../../../../assets/vision/doodle-1.png'
import doodle2 from '../../../../assets/vision/doodle-2.png'
import doodle3 from '../../../../assets/vision/doodle-3.png'
import doodle4 from '../../../../assets/vision/doodle-4.png'
import supportPhoto from '../../../../assets/home/image-07.jpeg'
import { FadeInView } from '../components/FadeInView'
import { PageHero } from '../components/PageHero'
import { PhotoBand } from '../components/PhotoBand'
import { StepCardStack, type Step } from '../components/StepCardStack'
import styles from './page.module.css'

const BELIEFS_ROWS = [
  [
    {
      content: (
        <>
          <p className={styles.beliefParagraph}>
            <strong>מהי בכלל חדשנות בחינוך?</strong>
          </p>
          <p className={styles.beliefParagraph}>
            חדשנות היא האומץ לקחת את היומיום המוכר ולשאול עליו שאלות. להיות מורה חדשני זה לאתגר את
            השגרה המוכרת, ולהפוך את הכיתה למרחב שבו יצירתיות וסקרנות קובעות את הקצב.
          </p>
        </>
      ),
    },
    {
      content: (
        <p className={styles.beliefParagraph}>
          <strong>אנו מאמינים</strong> שחינוך איכותי הוא תהליך דינמי ומתפתח, המונע מכוחן של תשוקה
          וסקרנות ללמידה. אנו מחויבים ליצירת סביבה חינוכית המקדמת הרחבת אופקים וצמיחה אישית
          ומקצועית למורה, מתוך הבנה שאלו הן אבני היסוד של פדגוגיה פורצת דרך.
        </p>
      ),
    },
  ],
  [
    {
      content: (
        <>
          <p className={styles.beliefParagraph}>
            <strong>כדי להגשים את זה,</strong> אנחנו מבינים שחשוב להפנות את הזרקור אל המורה עצמו,
            על מנת לייצר חוויית למידה משמעותית עבור התלמידים.
          </p>
          <p className={styles.beliefParagraph}>
            התפתחות אישית ומקצועית של המורה היא המנוע של כל המערכת, ולכן כדי לצמוח צריך להרחיב את
            נקודות המבט. פדגוגיה פורצת דרך מתרחשת כאשר יוצאים מהאזור החינוכי המוכר, באמצעות
            הסתכלות מחודשת על עצמנו והתנסות במתודות מעולמות תוכן אחרים: עיצוב, יזמות, טכנולוגיה,
            אמנות ועוד.
          </p>
        </>
      ),
    },
    {
      content: (
        <>
          <p className={styles.beliefParagraph}>
            <strong>איך אנחנו יודעים שהצלחנו?</strong>
          </p>
          <p className={styles.beliefParagraph}>
            כאשר המורה מצליח לראות באתגרים פדגוגיים הזדמנות לצמיחה. כלומר, המורה פועל מתוך
            יצירתיות, תעוזה וביטחון להתנסות בפרקטיקות הוראה חדשניות. כתוצאה מכך, הוא מצליח להעביר
            שיעורים מדויקים המותאמים לצורכי הכיתה, והופך את חוויית הלמידה למיטבית ומשמעותית.
            כשהמורה מעצב את חוויית הלמידה, מתאפשר לו לממש את מלוא הפוטנציאל שלו ולהפוך לגרסה
            הטובה ביותר של עצמו כאיש חינוך.
          </p>
        </>
      ),
    },
  ],
]

export const metadata = {
  title: 'החזון שלנו | איפכא',
}

const PROCESS_STEPS: Step[] = [
  {
    number: '01',
    title: 'מחקר אמפתי',
    text: 'שלב ראשוני שנועד להבין באמת את השטח ואת המצב הקיים. בעזרת כלי התבוננות שמתמקדים בחוויה האנושית, יוצאים לחקר משמעותי ורחב – מקיימים שיחות, בוחנים התנהגויות ומזהים את נקודות הכאב.',
    image: doodle1,
    color: 'blue',
  },
  {
    number: '02',
    title: 'הגדרת הזדמנות',
    text: 'איסוף התובנות הגולמיות משלב המחקר האמפתי וגיבושן לכדי בעיה מוגדרת היטב, המזמינה פתרון יצירתי. זהו רגע של הארה – הבנה משמעותית של צורך אמיתי, שממנו מנסחים אתגר שניתן לעבוד איתו.',
    image: doodle2,
    color: 'pink',
  },
  {
    number: '03',
    title: 'רעיונאות',
    text: 'שלב חשוב וחגיגי בתהליך, שבו מתקיים סיעור מוחות יצירתי, ובעזרת כלים ייחודיים מעלים כמה שיותר רעיונות מגוונים. רעיונאות מאפשרת לנו לפגוש רעיונות שונים ומשונים, להשתחרר מכל המגבלות ולעוף עם הדמיון. בסופו נבחר הרעיון בעל הפוטנציאל הגבוה ביותר.',
    image: doodle3,
    color: 'blue',
  },
  {
    number: '04',
    title: 'פרוטוטייפ ובדיקה',
    text: 'השלב שבו הופכים רעיונות מופשטים לייצוגים מוחשיים, מהירים ופשוטים, כדי לבחון אותם בשטח. המטרה היא לנסות את הפתרון, ללמוד מהר מה עובד ומה לא, ובעת הצורך לחזור לשלבים הקודמים ולדייק.',
    image: doodle4,
    color: 'pink',
  },
]

export default function VisionPage() {
  return (
    <>
      <PageHero image={heroImage} title="מורים הם מעצבי העתיד: כך בונים למידה אחרת" />

      <section className={`${styles.intro} gridLinesWhite`}>
        <h2 className={styles.introHeading}>
          ברוכים הבאים לאיפכא
          <br />
          מרכז לחדשנות פדגוגית
        </h2>

        <div className={styles.beliefs}>
          {BELIEFS_ROWS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`${styles.beliefsRow} ${
                rowIndex === 0 ? styles.beliefsRowDivided : styles.beliefsRowSecond
              }`}
            >
              {row.map((item, itemIndex) => (
                <FadeInView key={itemIndex} className={styles.beliefBox}>
                  <Image src={starPink} alt="" className={styles.beliefStar} />
                  <div className={styles.beliefTextWrap}>{item.content}</div>
                </FadeInView>
              ))}
            </div>
          ))}
        </div>

        <p className={styles.quote}>
          אז...בואו לעצב איתנו
          <br />
          <span className={styles.quoteHighlightWrap}>
            <span className={styles.quoteHighlightBg} />
            <span className={styles.quoteHighlightText}>את החוויה הבאה!</span>
          </span>
        </p>
      </section>

      <section className={`${styles.steps} gridLinesBlue`}>
        <h2 className={styles.stepsHeading}>בואו נבין- מהי חשיבה עיצובית?</h2>

        <StepCardStack steps={PROCESS_STEPS} />
      </section>

      <section className={styles.reflectionSection}>
        <div className={styles.reflection}>
          <div className={styles.reflectionText}>
            <Image src={starPink} alt="" className={styles.reflectionStar} />
            <h2 className={styles.reflectionHeading}>אז איך מעצבים חוית הוראה?</h2>
            <p>
              כאשר מתחיל תהליך העיצוב, המעצבים שלנו נפגשים עם המורה, בוחרים תחום דעת ומבררים יחד איתו
              מהם האתגרים שהוא חווה בשגרת ההוראה. באמצעות כלי חשיבה עיצובית חוקרים ומדייקים את הצורך,
              ויחד מזהים את האזורים שבהם אפשר לפעול כדי לייצר שינוי. לאחר מכן, בסיעור מוחות יצירתי,
              מעלים מגוון רעיונות לפתרונות, בוחרים את הפתרון בעל פוטנציאל ההצלחה הגבוה ביותר, מנסים
              אותו בשטח, בוחנים את מידת ההצלחה שלו וחוזרים חזרה לדיוק, שינוי או ייצור סופי.
            </p>
          </div>
          <div className={styles.reflectionImageWrap}>
            <Image src={supportPhoto} alt="" className={styles.reflectionImage} />
          </div>
        </div>
      </section>

      <PhotoBand />
    </>
  )
}
