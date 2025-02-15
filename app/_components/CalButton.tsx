'use client'

import { useEffect, useState } from 'react'
import { getCalApi } from "@calcom/embed-react"
import styles from './CalButton.module.css'

const CalButton = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    (async function () {
      const cal = await getCalApi()
      cal("ui", {
        theme: "light",
        styles: {
          branding: { brandColor: "white" },
        },
      })
      setIsLoaded(true)
    })()
  }, [])

  if (!isLoaded) {
    return null
  }

  return (
    <button 
      className={styles.calButton} 
      data-cal-link="iheb-ouelhazi-6qdezv/reservation-espace-collab" 
      data-cal-config='{"theme":"light"}'
    >
      Réserver
    </button>
  )
}

export default CalButton

