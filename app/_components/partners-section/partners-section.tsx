import actionaid from "@/public/images/actionaid.svg";
import styles from './partners-section.module.css';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, ElementRef } from 'react';
import { ScrollTrigger } from "gsap/ScrollTrigger";


const PartnersSection = () => {

    const containerRef = useRef<ElementRef<"section">>(null);

    const partnersLogoStyle = `.${styles.partners__logos}`;

    useGSAP(() => {

        const mm = gsap.matchMedia()

        mm.add("(min-width:1024px)", () => {
                gsap.to(partnersLogoStyle, {
                x: -1100,
                // duration: 3,
                scrollTrigger: {
                    trigger: containerRef.current,
                    // endTrigger: partnersLogoStyle,
                    start: "top top",
                    end: "bottom+=100% bottom",
                    scrub: 3,
                    pin: true,
                    // markers: true,
                    id: "partners-logo-anim"
                }
            })
        })

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "bottom top",
            end: "bottom bottom",
            id: "dark-mode-switcher",
            onEnter: () => {
                document.querySelector('body')?.setAttribute('data-theme', 'dark');
            },
            onEnterBack: () => {
                document.querySelector('body')?.setAttribute('data-theme', 'light');
                // gsap.to("main", {backgroundColor: "", duration: 0.5})
            },
            // markers: true,
        })

    })

    return (
        <section className={styles.container} ref={containerRef}>
                <div className={styles.title}>Ils nous font confiance</div>
                <div className={styles.partners__logos}>
                    <Image
                        src={actionaid}
                        alt="ActionAid"
                        width={240}
                        height={50}
                        className={styles.partner__image}
                    />
                    <Image
                        src={actionaid}
                        alt="ActionAid"
                        width={240}
                        height={50}
                        className={styles.partner__image}
                    />
                    <Image
                        src={actionaid}
                        alt="ActionAid"
                        width={240}
                        height={50}
                        className={styles.partner__image}
                    />
                    <Image
                        src={actionaid}
                        alt="ActionAid"
                        width={240}
                        height={50}
                        className={styles.partner__image}
                    />
                    <Image
                        src={actionaid}
                        alt="ActionAid"
                        width={240}
                        height={50}
                        className={styles.partner__image}
                    />
                    <Image
                        src={actionaid}
                        alt="ActionAid"
                        width={240}
                        height={50}
                        className={styles.partner__image}
                    />
                </div>
        </section>
    )
}

export default PartnersSection;
