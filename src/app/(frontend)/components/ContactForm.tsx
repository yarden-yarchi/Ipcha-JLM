'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'

import styles from './ContactForm.module.css'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  message: '',
  privacyConsent: false,
  marketingConsent: false,
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState(EMPTY_FORM)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setForm(EMPTY_FORM)
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>דברו אלינו</h2>

      <label className={styles.field}>
        <span>שם</span>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
      </label>

      <label className={styles.field}>
        <span>טלפון</span>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
      </label>

      <label className={styles.field}>
        <span>מייל</span>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </label>

      <label className={styles.field}>
        <span>איך נוכל לעזור?</span>
        <input
          type="text"
          required
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
      </label>

      <label className={styles.checkboxField}>
        <input
          type="checkbox"
          required
          checked={form.privacyConsent}
          onChange={(e) => setForm((f) => ({ ...f, privacyConsent: e.target.checked }))}
        />
        <span>
          קראתי ואני מסכימ/ה ל<Link href="/privacy-policy">מדיניות הפרטיות</Link>
        </span>
      </label>

      <label className={styles.checkboxField}>
        <input
          type="checkbox"
          checked={form.marketingConsent}
          onChange={(e) => setForm((f) => ({ ...f, marketingConsent: e.target.checked }))}
        />
        <span>אני מעוניינ/ת לקבל עדכונים ותוכן שיווקי מאיפכא</span>
      </label>

      <button type="submit" className={styles.submit} disabled={status === 'submitting'}>
        {'שלח/י >>'}
      </button>

      {status === 'success' && <p className={styles.status}>ההודעה נשלחה, תודה!</p>}
      {status === 'error' && <p className={styles.status}>אירעה שגיאה, נסו שוב.</p>}
    </form>
  )
}
