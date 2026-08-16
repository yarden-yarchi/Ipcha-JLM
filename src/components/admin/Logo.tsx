import Image from 'next/image'
import React from 'react'

import logoLockup from '../../../assets/misc/logo-footer-lockup.svg'

export function Logo() {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#052cd1',
        borderRadius: '24px',
        padding: '24px 40px',
      }}
    >
      <Image src={logoLockup} alt="איפכא" style={{ width: '180px', height: 'auto' }} priority />
    </div>
  )
}
