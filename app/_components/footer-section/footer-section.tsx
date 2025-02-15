'use client'

import styles from './footer-section.module.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef, ElementRef } from 'react'
import Link from 'next/link'
import { Copyright, Facebook, Instagram, Linkedin } from 'lucide-react'

const FooterSection = () => {
    const footerTitleRef = useRef<ElementRef<"div">>(null)
    const containerRef = useRef<ElementRef<"section">>(null)
    const buttonRef = useRef<ElementRef<"button">>(null)

    useGSAP(() => {
        const mm = gsap.matchMedia()

        let textAppearAnim = gsap.fromTo(footerTitleRef.current, 
            {
                yPercent: 100,
            },
            {
                yPercent: 0,
                duration: 0.5,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top-=27% top",
                    end: "bottom center",
                    id: "text-footer-appear",
                    onEnterBack: () => {
                        textAppearAnim.restart()
                    },
                    onLeaveBack: () => {
                        textAppearAnim.reverse()
                    }
                },
                ease: "ease-in-out",
            }
        )

        // Button hover animation
        if (buttonRef.current) {
            buttonRef.current.addEventListener('mouseenter', () => {
                gsap.to(buttonRef.current, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                })
            })

            buttonRef.current.addEventListener('mouseleave', () => {
                gsap.to(buttonRef.current, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                })
            })
        }
    })

    return (
        <section className={styles.container} ref={containerRef}>
            <div className={styles.textAppearWrapper}>
                <div className={styles.title} ref={footerTitleRef}>
                    Envie d&apos;en savoir plus ?
                </div>
            </div>
            <button ref={buttonRef} className={styles.ouiButton}>
                OUI !
            </button>
            <footer className={styles.footer}>
                <div className={styles.footer__content}>
                    <div className={styles.footer__left}>
                        <span className={styles.footer__copyright}>
                            <Copyright size={16} className={styles.copyright_icon} />
                            <span className={styles.copyright__text}>Collab</span>
                        </span>
                    </div>
                    <div className={styles.footer__socialmedia}>
                        <Link href="https://www.instagram.com/el.collab/">
                            <Instagram size={18} color="white"/>
                        </Link>
                        <Link href="https://www.facebook.com/el.collab">
                            <Facebook size={18} color="white"/>
                        </Link>
                        <Link href="https://www.instagram.com/el.collab/">
                            <Linkedin size={18} color="white"/>
                        </Link>
                    </div>
                    <div className={styles.footer__madeby}>
                        Made by Iheb
                    </div>
                </div>
            </footer>
        </section>
    )
}

export default FooterSection

