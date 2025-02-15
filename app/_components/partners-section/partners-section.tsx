'use client'

import actionaid from "@/public/images/actionaid.svg"
import styles from './partners-section.module.css'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef, ElementRef } from 'react'
import { ScrollTrigger } from "gsap/ScrollTrigger"

const PartnersSection = () => {
    const containerRef = useRef<ElementRef<"section">>(null)
    const scrollContainerRef = useRef<ElementRef<"div">>(null)

    useGSAP(() => {
        // Animation code temporarily disabled
        /* const mm = gsap.matchMedia()

        // Desktop animation
        mm.add("(min-width: 768px)", () => {
            gsap.to(`.${styles.partners__logos}`, {
                x: -1100,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom+=100% bottom",
                    scrub: 3,
                    pin: true,
                    id: "partners-logo-anim"
                }
            })
        })

        // Mobile horizontal scroll hint animation
        mm.add("(max-width: 767px)", () => {
            const scrollHint = gsap.to(`.${styles.partners__logos}`, {
                x: -100,
                duration: 1,
                ease: "power2.inOut",
                repeat: 2,
                yoyo: true,
                paused: true
            })

            // Play scroll hint when component is in view
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top center",
                onEnter: () => scrollHint.play(),
                once: true
            })
        }) */

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "bottom top",
            end: "bottom bottom",
            id: "dark-mode-switcher",
            onEnter: () => {
                document.querySelector('body')?.setAttribute('data-theme', 'dark')
            },
            onEnterBack: () => {
                document.querySelector('body')?.setAttribute('data-theme', 'light')
            },
        })
    })

    return (
        <section className={styles.container} ref={containerRef}>
            <h2 className={styles.title}>Ils nous font confiance</h2>
            <div className={styles.partners__wrapper}>
                <div className={styles.partners__logos} ref={scrollContainerRef}>
                    <Image
                        src={actionaid || "/placeholder.svg"}
                        alt="ActionAid"
                        width={240}
                        height={50}
                        className={styles.partner__image}
                    />
                </div>
            </div>
        </section>
    )
}

export default PartnersSection

