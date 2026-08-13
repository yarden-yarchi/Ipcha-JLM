import { getPayload } from 'payload'

import config from '@/payload.config'
import heroImage from '../../../../assets/workshops/hero.jpg'
import { PageHero } from '../components/PageHero'
import { PhotoBand } from '../components/PhotoBand'
import { WorkshopTeaserCard } from '../components/WorkshopTeaserCard'
import styles from './page.module.css'

export const metadata = {
  title: 'סדנאות והשתלמויות | איפכא',
}

export default async function WorkshopsPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const workshops = await payload.find({
    collection: 'workshops',
    sort: '-date',
    limit: 100,
  })

  return (
    <>
      <PageHero image={heroImage} title="כאן מתמקצעים" />

      <section className={`${styles.listSection} gridLinesBlue`}>
        <div className={styles.list}>
          {workshops.docs.map((workshop) => (
            <WorkshopTeaserCard key={workshop.id} workshop={workshop} />
          ))}
          {workshops.docs.length === 0 && <p className={styles.empty}>עדיין אין סדנאות מתוכננות.</p>}
        </div>
      </section>

      <PhotoBand />
    </>
  )
}
