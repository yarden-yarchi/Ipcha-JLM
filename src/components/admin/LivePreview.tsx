'use client'

import { useAllFormFields } from '@payloadcms/ui'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import type { ContentLibraryItem, Media, WhatsHappeningHere, Workshop } from '@/payload-types'
import { ContentLibraryCard } from '../../app/(frontend)/components/ContentLibraryCard'
import { WhatsHappeningCard } from '../../app/(frontend)/components/WhatsHappeningCard'
import { WorkshopTeaserCard } from '../../app/(frontend)/components/WorkshopTeaserCard'
import { arbel, arbelStencil, eshkolita } from '../../app/(frontend)/fonts'
import '../../app/(frontend)/tokens.css'

const FONT_VARS = `${arbel.variable} ${arbelStencil.variable} ${eshkolita.variable}`

function useLiveImage(imageId: unknown): Media | undefined {
  const [media, setMedia] = useState<Media | undefined>(undefined)

  useEffect(() => {
    if (typeof imageId !== 'number' && typeof imageId !== 'string') {
      setMedia(undefined)
      return
    }
    let cancelled = false
    fetch(`/api/media/${imageId}`)
      .then((res) => (res.ok ? res.json() : undefined))
      .then((data) => {
        if (!cancelled) setMedia(data)
      })
      .catch(() => {
        if (!cancelled) setMedia(undefined)
      })
    return () => {
      cancelled = true
    }
  }, [imageId])

  return media
}

function PreviewButton({
  onClick,
  isOpen,
  cardWidth,
  cardAspectRatio,
  children,
}: {
  onClick: () => void
  isOpen: boolean
  cardWidth: number
  cardAspectRatio?: string
  children: React.ReactNode
}) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#052cd1',
          fontSize: '0.95em',
          marginBottom: '1em',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        👁 תצוגה מקדימה
      </button>
      {isOpen &&
        createPortal(
          <div
            onClick={onClick}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
              padding: 24,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={FONT_VARS}
              style={{
                position: 'relative',
                width: cardWidth,
                maxWidth: '100%',
                aspectRatio: cardAspectRatio,
                fontFamily: 'var(--font-arbel), system-ui, sans-serif',
              }}
            >
              <button
                type="button"
                onClick={onClick}
                aria-label="סגירה"
                style={{
                  position: 'absolute',
                  top: -16,
                  left: -16,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: 'none',
                  background: '#fff',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  cursor: 'pointer',
                  fontSize: 16,
                  zIndex: 1,
                }}
              >
                ✕
              </button>
              {children}
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

export function WorkshopLivePreview() {
  const [fields] = useAllFormFields()
  const [isOpen, setIsOpen] = useState(false)
  const image = useLiveImage(fields?.image?.value)

  const workshop = {
    id: 'preview',
    image: image ?? null,
    title: (fields?.title?.value as string) || 'כותרת הסדנה',
    description: (fields?.description?.value as string) || '',
    date: (fields?.date?.value as string) || new Date().toISOString(),
    hours: (fields?.hours?.value as string) || '',
    location: (fields?.location?.value as string) || '',
    signupUrl: (fields?.signupUrl?.value as string) || '',
    bubbleText: (fields?.bubbleText?.value as string) || '',
  } as unknown as Workshop

  return (
    <PreviewButton onClick={() => setIsOpen((o) => !o)} isOpen={isOpen} cardWidth={1000}>
      <WorkshopTeaserCard workshop={workshop} />
    </PreviewButton>
  )
}

export function ContentLibraryLivePreview() {
  const [fields] = useAllFormFields()
  const [isOpen, setIsOpen] = useState(false)
  const image = useLiveImage(fields?.image?.value)

  const item = {
    id: 'preview',
    image: image ?? null,
    title: (fields?.title?.value as string) || 'כותרת הפריט',
    description: (fields?.description?.value as string) || '',
    price: (fields?.price?.value as string) || '',
    downloadUrl: (fields?.downloadUrl?.value as string) || '',
  } as unknown as ContentLibraryItem

  return (
    <PreviewButton onClick={() => setIsOpen((o) => !o)} isOpen={isOpen} cardWidth={340}>
      <ContentLibraryCard item={item} />
    </PreviewButton>
  )
}

export function WhatsHappeningLivePreview() {
  const [fields] = useAllFormFields()
  const [isOpen, setIsOpen] = useState(false)
  const image = useLiveImage(fields?.image?.value)

  const item = {
    id: 'preview',
    image: image ?? null,
    title: (fields?.title?.value as string) || 'כותרת',
  } as unknown as WhatsHappeningHere

  return (
    <PreviewButton
      onClick={() => setIsOpen((o) => !o)}
      isOpen={isOpen}
      cardWidth={340}
      cardAspectRatio="1"
    >
      <WhatsHappeningCard item={item} />
    </PreviewButton>
  )
}
