import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './intro-section.module.css';
import { useRef, ElementRef, useState } from 'react';


const IntroSection = () => {

    const [phraseExplainer, setPhraseExplainer] = useState("chaleureux");

    const containerIntroRef = useRef<ElementRef<"div">>(null);
    const explainerTextRef = useRef<ElementRef<"div">>(null);
    const yellowModeRef = useRef<ElementRef<"div">>(null);

    const highlightStyle = `.${styles.highlight}`;

    const phrasesExplainer = ["chaleureux", "flexible", "simple"]

    let currentIndex = 0;

    useGSAP(() => {
        
        const mm = gsap.matchMedia();

        let explainerSwitcher = gsap.timeline({
            repeat: -1,
            repeatDelay: 1,
            })

            explainerSwitcher.to(explainerTextRef.current, 
            {
                yPercent: -100,

                duration: 0.3, 
                ease: "ease-in-out",
                onComplete: () => {
                currentIndex = (currentIndex + 1) % phrasesExplainer.length;
                setPhraseExplainer(phrasesExplainer[currentIndex]);
                // typeRef.current.innerHTML = phrases[currentIndex];
                }
            })

            explainerSwitcher.to(explainerTextRef.current,{
            yPercent: 0,
            stagger: 0.01,
            duration: 0.3, 
            ease: "ease-in-out",
            startAt: {yPercent: 100},
        })

        ScrollTrigger.create({
            trigger: yellowModeRef.current,
            start: "start-=50% top",
            end: "start-=50% bottom",
            id: "yellow-mode-switcher",
            onEnter: () => {
                document.querySelector('body')?.setAttribute('data-theme', 'yellow');
            },
            onEnterBack: () => {
                document.querySelector('body')?.setAttribute('data-theme', 'light');
                // gsap.to("main", {backgroundColor: "", duration: 0.5})
            },
            // markers: true,
        })

        

    // Text highlight
        mm.add({
            isMD: "(min-width: 501px)",
            isMobile: "(max-width: 500px)",
        },
        (context) => {

            if (context.conditions) {
                var { isMD, isMobile } = context.conditions;
            }

            gsap.utils.toArray(`${highlightStyle}`).forEach((highlight: any) => {
                ScrollTrigger.create({
                    trigger: containerIntroRef.current,
                    endTrigger: containerIntroRef.current,
                    start: "top-=40% top",
                    end: "bottom+=80% bottom",
                    // markers: true,
                    id: "text-highlight",
                    onEnter: () => { 
                        gsap.to(highlight, {
                            color: "white",
                            backgroundPosition: "-100% center",
                            duration: 1,
                            ease: "expo.inOut",

                        })
                    },
                    onLeaveBack: () => {
                        gsap.to(highlight, {
                            color: "",
                            backgroundPosition: "0% center",
                            duration: 1,
                            ease: "expo.inOut",
                        })
                    },
                    onLeave: () => {
                        gsap.to(highlight, {
                            color: "",
                            backgroundPosition: "0% center",
                            duration: 1,
                            ease: "expo.inOut",
                        })
                    },
                    onEnterBack: () => {
                        gsap.to(highlight, {
                            color: "white",
                            backgroundPosition: "-100% center",
                            duration: 1,
                            ease: "expo.inOut",
                        })
                    }
                })
            })
        })
    })


    return (
        <section>
            <div className={styles.container} ref={containerIntroRef}>
                <div className={styles.introText}>
                    <div className={styles.kolTitle}>En plein coeur de Sfax, Collab est un lieu intimiste dédié a <strong className={styles.highlight}>la creation collaboratif</strong> et au developpement de nouveaux projets <strong className={`${styles.highlight} ${styles.highlight__text}`}>audiovisuels et creatifs.</strong></div>
                </div>
            </div>
            <div className={styles.container2} ref={yellowModeRef}>
                <div className={styles.typeExplainer}>
                    <div>Un espace de travail</div>
                    <div className={styles.typeAnim}><div ref={explainerTextRef}>{phraseExplainer}</div></div>
                </div>
            </div>
        </section>
    )
}

export default IntroSection;