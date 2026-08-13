import { getPayload } from 'payload'

import config from '@/payload.config'
import heroImage from '../../../../assets/content-library/hero.jpg'
import { ContentLibraryCard } from '../components/ContentLibraryCard'
import { PageHero } from '../components/PageHero'
import { PhotoBand } from '../components/PhotoBand'
import styles from './page.module.css'

export const metadata = {
  title: 'מאגר תכנים | איפכא',
}

export default async function ContentLibraryPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const items = await payload.find({
    collection: 'content-library-items',
    sort: '-createdAt',
    limit: 100,
  })

  return (
    <>
      <PageHero image={heroImage} title="כאן מוצאים השראה" />

      <section className={`${styles.gridSection} gridLinesBlue`}>
        <div className={styles.grid}>
          {items.docs.map((item) => (
            <ContentLibraryCard key={item.id} item={item} />
          ))}
          {items.docs.length === 0 && <p className={styles.empty}>עדיין אין פריטים במאגר התכנים.</p>}
        </div>
      </section>

      <PhotoBand />
    </>
  )
}
