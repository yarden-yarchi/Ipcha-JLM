'use client'

import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import Image, { type StaticImageData } from 'next/image'
import { useLayoutEffect, useRef, useState } from 'react'

import styles from './StepCardStack.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip)
}

export type Step = {
  number: string
  title: string
  text: string
  image: StaticImageData
  color: 'blue' | 'pink'
}

type StackEntry = {
  uid: string
  step: Step
}

export function StepCardStack({ steps }: { steps: Step[] }) {
  const [stack, setStack] = useState<StackEntry[]>(() =>
    [...steps].reverse().map((step, i) => ({ uid: `initial-${i}`, step })),
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const pendingStateRef = useRef<Flip.FlipState | null>(null)

  const advance = () => {
    const container = containerRef.current
    if (!container) return

    const items = container.querySelectorAll<HTMLElement>(`.${styles.item}`)
    pendingStateRef.current = Flip.getState(items)

    setStack((prev) => {
      const front = prev[prev.length - 1]
      const uid = `${front.step.number}-${Date.now()}`
      return [{ uid, step: front.step }, ...prev.slice(0, -1)]
    })
  }

  useLayoutEffect(() => {
    const state = pendingStateRef.current
    const container = containerRef.current
    if (!state || !container) return
    pendingStateRef.current = null

    const items = container.querySelectorAll<HTMLElement>(`.${styles.item}`)
    Flip.from(state, {
      targets: items,
      ease: 'sine.inOut',
      absolute: true,
      onEnter: (elements) =>
        gsap.from(elements, { duration: 0.3, yPercent: 20, opacity: 0, ease: 'expo.out' }),
      onLeave: (elements) =>
        gsap.to(elements, {
          duration: 0.3,
          yPercent: 5,
          xPercent: -5,
          transformOrigin: 'bottom left',
          opacity: 0,
          ease: 'expo.out',
        }),
    })
  }, [stack])

  return (
    <>
      <p className={styles.hint}>לחצו על הכרטיסייה למעבר לשלב הבא</p>
      <div
        ref={containerRef}
        className={styles.stackWrap}
        onClick={advance}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            advance()
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="הצג את שלב התהליך הבא"
      >
        {stack.map(({ uid, step }) => (
          <div
            key={uid}
            className={`${styles.item} ${styles.stepCard} ${
              step.color === 'blue' ? styles.stepBlue : styles.stepPink
            }`}
          >
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>
                <span className={styles.stepNumber}>{step.number}/</span> {step.title}
              </h3>
              <p className={styles.stepText}>{step.text}</p>
            </div>
            <div className={styles.stepImageWrap}>
              <Image src={step.image} alt="" fill className={styles.stepImage} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
