import styles from './footer-section.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, ElementRef } from 'react';
import Link from 'next/link';
import { Copyright, Facebook, Instagram, Linkedin } from 'lucide-react';


const FooterSection = () => {

    const footerTitleRef = useRef<ElementRef<"div">>(null);
    const containerRef = useRef<ElementRef<"section">>(null);

    useGSAP(() => {
        let textAppearAnim = gsap.fromTo(footerTitleRef.current, {
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
                    // markers: true,
                    onLeave: () => {
                        textAppearAnim.reverse();
                        },
                    onEnterBack: () => {
                        textAppearAnim.restart();
                    },
                    onLeaveBack: () => {
                        textAppearAnim.reverse();
                    }
                },
                ease: "ease-in-out",
            })
    })

    return (
        <section className={styles.container} ref={containerRef}>
            <div className={styles.textAppearWrapper}>
                <div className={styles.title} ref={footerTitleRef}>
                    Envie d&apos;en savoir plus ?
                </div>
            </div>
            <div className={styles.footer}>
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
                <div className={styles.footer__copyright}>
                    <Copyright size={24}  className={styles.copyright_icon} /> <span className={styles.copyright__text}>El Collab</span>
                </div>
                <div className={styles.footer__madeby}>
                    Made by Iheb
                </div>
            </div>
        </section>
    )
}

export default FooterSection;