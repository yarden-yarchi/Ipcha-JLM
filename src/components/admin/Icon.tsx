import Image from 'next/image'
import React from 'react'

import favicon from '../../../favicon.svg'

export function Icon() {
  return <Image src={favicon} alt="" style={{ width: '20px', height: '20px' }} />
}
