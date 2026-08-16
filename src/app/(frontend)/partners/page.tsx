import { getPayload } from 'payload'

import config from '@/payload.config'
import heroImage from '../../../../assets/partners/hero.jpg'
import { MapAccordion } from '../components/MapAccordion'
import { PageHero } from '../components/PageHero'
import { PhotoBand } from '../components/PhotoBand'
import { WhatsHappeningGrid } from '../components/WhatsHappeningGrid'
import styles from './page.module.css'

export const metadata = {
  title: 'שותפים ותוכניות | איפכא',
}

export default async function PartnersPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const whatsHappening = await payload.find({
    collection: 'whats-happening-here',
    sort: '-createdAt',
    limit: 50,
  })

  const mapLocations = await payload.find({
    collection: 'map-locations',
    sort: 'order',
    limit: 100,
  })

  return (
    <>
      <PageHero image={heroImage} title="מה תמצאו אצלנו?" />

      <div className={`${styles.pageBg} gridLinesBlue`}>
        <MapAccordion locations={mapLocations.docs} />
        <WhatsHappeningGrid items={whatsHappening.docs} />
      </div>

      <PhotoBand />
    </>
  )
}
