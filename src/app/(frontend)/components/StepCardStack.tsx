'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import Image, { type StaticImageData } from 'next/image'
import { useRef } from 'react'

import styles from './StepCardStack.module.css'

export type Step = {
  number: string
  title: string
  text: string
  image: StaticImageData
  color: 'blue' | 'pink'
}

function StickyStepCard({
  step,
  index,
  total,
  progress,
}: {
  step: Step
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const targetScale = Math.max(0.85, 1 - (total - index - 1) * 0.05)
  const range: [number, number] = [index / total, 1]
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div className={styles.stickyWrap}>
      <motion.div
        style={{ scale, top: `${index * 24}px` }}
        className={`${styles.motionCard} ${styles.stepCard} ${
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
      </motion.div>
    </div>
  )
}

export function StepCardStack({ steps }: { steps: Step[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      {steps.map((step, index) => (
        <StickyStepCard
          key={step.number}
          step={step}
          index={index}
          total={steps.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  )
}
