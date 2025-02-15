'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './hero.module.css'
import collab from '@/public/images/collab-logo.png'
import Image from 'next/image'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    gsap.config({
      force3D: true
    })

    if (heroRef.current && textRef.current) {
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
        }
      )
    }

    // Ensure video playback on iOS
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video playback failed:", error)
      })
    }
  }, [])
  

  return (
    <div className={styles.hero} ref={heroRef}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={styles.video}
        poster="/hero-poster.jpg" // Assuming you have a poster image in public folder
      >
        <source
          src="/collab.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image
            src={collab}
            alt="Collab Logo"
            width={200}
            height={200}
            className={styles.logo}
            priority
          />
        </div>
        <h1 className={styles.title} ref={textRef}>
          <span className={styles.titleLine}>JOIN US</span>
          <span className={styles.titleLine}>TODAY</span>
        </h1>
      </div>
    </div>
  )
}

