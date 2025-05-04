'use client'

import { useEffect } from 'react'

export default function SamsungPatch() {
  useEffect(() => {
    if (typeof window !== 'undefined' && /SamsungBrowser/.test(navigator?.userAgent)) {
      document.documentElement.style.backgroundColor = '#fff'
      document.body.style.backgroundColor = '#fff'
    }
  }, [])

  return null
}
