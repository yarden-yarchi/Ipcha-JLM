import Image from 'next/image'

import heroImage from '../../../../assets/vision/hero.jpg'
import supportPhoto from '../../../../assets/home/image-07.jpeg'
import { PageHero } from '../components/PageHero'
import { PhotoBand } from '../components/PhotoBand'
import styles from './page.module.css'

export const metadata = {
  title: 'החזון שלנו | איפכא',
}

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'מחקר אמפתי',
    text: 'שלב ראשוני שנועד להבין באמת את השטח ואת המצב הקיים. בעזרת כלי התבוננות שמתמקדים בחוויה האנושית, יוצאים לחקר משמעותי ורחב – מקיימים שיחות, בוחנים התנהגויות ומזהים את נקודות הכאב.',
  },
  {
    number: '02',
    title: 'הגדרת הזדמנות',
    text: 'איסוף התובנות הגולמיות משלב המחקר האמפתי וגיבושן לכדי בעיה מוגדרת היטב, המזמינה פתרון יצירתי. זהו רגע של הארה – הבנה משמעותית של צורך אמיתי, שממנו מנסחים אתגר שניתן לעבוד איתו.',
  },
  {
    number: '03',
    title: 'רעיונאות',
    text: 'שלב חשוב וחגיגי בתהליך, שבו מתקיים סיעור מוחות יצירתי, ובעזרת כלים ייחודיים מעלים כמה שיותר רעיונות מגוונים. רעיונאות מאפשרת לנו לפגוש רעיונות שונים ומשונים, להשתחרר מכל המגבלות ולעוף עם הדמיון. בסופו נבחר הרעיון בעל הפוטנציאל הגבוה ביותר.',
  },
  {
    number: '04',
    title: 'פרוטוטייפ ובדיקה',
    text: 'השלב שבו הופכים רעיונות מופשטים לייצוגים מוחשיים, מהירים ופשוטים, כדי לבחון אותם בשטח. המטרה היא לנסות את הפתרון, ללמוד מהר מה עובד ומה לא, ובעת הצורך לחזור לשלבים הקודמים ולדייק.',
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

        <div className={styles.introColumns}>
          <div className={styles.introColumnStacked}>
            <p className={styles.introParagraph}>
              <strong>מהי בכלל חדשנות בחינוך?</strong> חדשנות היא האומץ לקחת את היומיום המוכר ולשאול
              עליו שאלות. להיות מורה חדשני זה לאתגר את השגרה המוכרת, ולהפוך את הכיתה למרחב שבו
              יצירתיות וסקרנות קובעות את הקצב.
            </p>
            <p className={styles.introParagraph}>
              <strong>כדי להגשים את זה,</strong> אנחנו מבינים שחשוב להפנות את הזרקור אל המורה עצמו,
              על מנת לייצר חוויית למידה משמעותית עבור התלמידים. התפתחות אישית ומקצועית של המורה היא
              המנוע של כל המערכת, ולכן כדי לצמוח צריך להרחיב את נקודות המבט. פדגוגיה פורצת דרך
              מתרחשת כאשר יוצאים מהאזור החינוכי המוכר, באמצעות הסתכלות מחודשת על עצמנו והתנסות
              במתודות מעולמות תוכן אחרים: עיצוב, יזמות, טכנולוגיה, אמנות ועוד.
            </p>
          </div>

          <p className={styles.introParagraph}>
            <strong>אנו מאמינים</strong> שחינוך איכותי הוא תהליך דינמי ומתפתח, המונע מכוחן של תשוקה
            וסקרנות ללמידה. אנו מחויבים ליצירת סביבה חינוכית המקדמת הרחבת אופקים וצמיחה אישית
            ומקצועית למורה, מתוך הבנה שאלו הן אבני היסוד של פדגוגיה פורצת דרך.
          </p>
        </div>

        <p className={styles.quote}>
          אז...בואו לעצב איתנו
          <br />
          את החוויה הבאה!
        </p>
      </section>

      <section className={`${styles.steps} gridLinesBlue`}>
        <h2 className={styles.stepsHeading}>בואו נבין- מהי חשיבה עיצובית?</h2>

        <div className={styles.stepsList}>
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.number}
              className={`${styles.stepCard} ${index % 2 === 0 ? styles.stepBlue : styles.stepPink}`}
            >
              <h3 className={styles.stepTitle}>
                <span className={styles.stepNumber}>{step.number}/</span> {step.title}
              </h3>
              <p className={styles.stepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.reflection} gridLinesBlue`}>
        <div className={styles.reflectionText}>
          <h2 className={styles.reflectionHeading}>אז איך מעצבים חוית הוראה?</h2>
          <p>
            כאשר מתחיל תהליך העיצוב, המעצבים שלנו נפגשים עם המורה, בוחרים תחום דעת ומבררים יחד איתו
            מהם האתגרים שהוא חווה בשגרת ההוראה. באמצעות כלי חשיבה עיצובית חוקרים ומדייקים את הצורך,
            ויחד מזהים את האזורים שבהם אפשר לפעול כדי לייצר שינוי. לאחר מכן, בסיעור מוחות יצירתי,
            מעלים מגוון רעיונות לפתרונות, בוחרים את הפתרון בעל פוטנציאל ההצלחה הגבוה ביותר, מנסים
            אותו בשטח, בוחנים את מידת ההצלחה שלו וחוזרים חזרה לדיוק, שינוי או ייצור סופי.
          </p>
          <h3 className={styles.reflectionSubheading}>איך אנחנו יודעים שהצלחנו?</h3>
          <p>
            כאשר המורה מצליח לראות באתגרים פדגוגיים הזדמנות לצמיחה. כלומר, המורה פועל מתוך יצירתיות,
            תעוזה וביטחון להתנסות בפרקטיקות הוראה חדשניות. כתוצאה מכך, הוא מצליח להעביר שיעורים
            מדויקים המותאמים לצורכי הכיתה, והופך את חוויית הלמידה למיטבית ומשמעותית. כשהמורה מעצב את
            חוויית הלמידה, מתאפשר לו לממש את מלוא הפוטנציאל שלו ולהפוך לגרסה הטובה ביותר של עצמו
            כאיש חינוך.
          </p>
        </div>
        <div className={styles.reflectionImageWrap}>
          <Image src={supportPhoto} alt="" className={styles.reflectionImage} />
        </div>
      </section>

      <PhotoBand />
    </>
  )
}
