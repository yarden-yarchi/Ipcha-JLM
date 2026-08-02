import Image from 'next/image'

import photoBandImage from '../../../../assets/misc/photo-band.jpg'
import squiggleFooter from '../../../../assets/misc/squiggle-footer.svg'
import styles from './PhotoBand.module.css'

export function PhotoBand() {
  return (
    <div className={styles.band}>
      <Image src={photoBandImage} alt="" className={styles.image} />
      <Image src={squiggleFooter} alt="" className={styles.squiggle} />
    </div>
  )
}
