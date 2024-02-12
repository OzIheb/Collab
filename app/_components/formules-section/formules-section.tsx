import styles from './formules-section.module.css';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useRef, ElementRef, useState } from 'react';


const FormulesSection = () => {

    const darkModeRef = useRef<ElementRef<"div">>(null);
    const explainerTextRef = useRef<ElementRef<"div">>(null);
    const formuleContainerRef = useRef<ElementRef<"section">>(null);
    const innerRef = useRef<ElementRef<"article">>(null);
    const formuleFirstRef = useRef<ElementRef<"h3">>(null);
    const formuleSecondRef = useRef<ElementRef<"h3">>(null);
    const formuleThirdRef = useRef<ElementRef<"h3">>(null);
    
    const textAppearWrapperStyle = `.${styles.textAppearWrapper}`;
    const innerStyle = `.${styles.inner}`;

    const [phraseExplainer, setPhraseExplainer] = useState("clés en main");

    const phrasesFormule = ["clés en main", "sans engagement", "à la carte", "sur-mesure"]
    let currentIndex = 0;

    const { contextSafe } = useGSAP();

    useGSAP((contextSafe) => {

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
                currentIndex = (currentIndex + 1) % phrasesFormule.length;
                setPhraseExplainer(phrasesFormule[currentIndex]);
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
            trigger: darkModeRef.current,
            start: "start-=50% top",
            end: "start-=50% bottom",
            id: "yellow-mode-switcher",
            onEnter: () => {
                document.querySelector('body')?.setAttribute('data-theme', 'dark');
            },
            onEnterBack: () => {
                document.querySelector('body')?.setAttribute('data-theme', 'yellow');
                // gsap.to("main", {backgroundColor: "", duration: 0.5})
            },
            // markers: true,
        })

        mm.add('(max-width:575.98px)', () => {
            (gsap.utils.toArray([formuleFirstRef.current, formuleSecondRef.current, formuleThirdRef.current]) as HTMLElement[]).forEach((element: HTMLElement) => {
                let textAppearAnim = gsap.fromTo(element, {
                    yPercent: 100,
                },
                {
                    yPercent: 0,
                    duration: 0.5,
                    scrollTrigger: {
                    trigger: element.parentElement,
                    endTrigger: formuleContainerRef.current,
                    start: "top-=100% top",
                    end: "bottom+=50% bottom-=30%",
                    id: "text-appear-formule-mobile",
                    // markers: true,
                    onEnterBack: () => {
                        textAppearAnim.restart();
                    },
                    onLeave: () => {
                        textAppearAnim.reverse();
                    },
                    // onLeaveBack: () => {
                    //     textAppearAnim.reverse();
                    // }
                    },
                    ease: "ease-in-out",
                })
            })
        })

         mm.add('(min-width:700px)', () => {
            let textAppearAnim = gsap.fromTo(textAppearWrapperStyle, {
                yPercent: 100,
                
            },
            {
                yPercent: 0,
                duration: 0.5,
                scrollTrigger: {
                trigger: formuleContainerRef.current,
                start: "top top",
                end: "bottom bottom-=30%",
                id: "text-appear-formule",
                // markers: true,
                onEnterBack: () => {
                    textAppearAnim.restart();
                },
                onLeave: () => {
                    textAppearAnim.reverse();
                },
                onLeaveBack: () => {
                    textAppearAnim.reverse();
                }
                },
                ease: "ease-in-out",
            })
         })

        //  TODO:light mode switcher
        ScrollTrigger.create({
            trigger: formuleContainerRef.current,
            start: "bottom+=10% top",
            end: "bottom+=10% bottom",
            id: "light-mode-switcher",
            onEnter: () => {
                document.querySelector('body')?.setAttribute('data-theme', 'light');
            },
            onEnterBack: () => {
                document.querySelector('body')?.setAttribute('data-theme', 'dark');
                // gsap.to("main", {backgroundColor: "", duration: 0.5})
            },
            // markers: true,
        })
            
            

    })


        const mouseEnterHandler = contextSafe((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {  
            const rect = event.currentTarget?.getBoundingClientRect();
            const x = event.clientX - rect!.left;
            const y = event.clientY - rect!.top;
            console.log(`circle(100% at ${x}px ${y}px)`)
            const element = event.currentTarget.querySelector(innerStyle) as Element;
            const liElements = event.currentTarget.querySelectorAll("li") as NodeListOf<Element>;
                    
            let animation = gsap.to(element, {
                clipPath: `circle(200% at ${x}px ${y}px)`,
                duration: 1,
                ease: "ease-in-out",
                startAt: {clipPath: `circle(0) at ${x}px ${y}px`},
                onComplete: () => {
                    animation.kill();
                }
                })

            liElements.forEach((li, index) => {
                gsap.fromTo(li, {
                    yPercent: 100,
                    opacity: 0,
                },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.2,
                    ease: "ease-in-out",
                    startAt: {yPercent: 100},
                    delay: 0.1 * index,
                })
            })

        })

        const mouseLeaveHandler = contextSafe((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect!.left;
            const y = event.clientY - rect!.top;
            console.log(`circle(100% at ${x}px ${y}px) MOUSE LEAVE`)
            const element = event.currentTarget.querySelector(innerStyle) as Element;
            const liElements = event.currentTarget.querySelectorAll("li") as NodeListOf<Element>;
                    
            gsap.to(element, {
                clipPath: `circle(0% at ${x}px ${y}px)`,
                duration: 1,
                ease: "ease-out-in",
                // startAt: {clipPath: `circle(200% at ${x}px ${y}px)`},
                })

            liElements.forEach((li, index) => {
                gsap.to(li, {
                    yPercent: 100,
                    opacity: 0,
                    duration: 0.2,
                    ease: "ease-in-out",
                    startAt: {yPercent: 0},
                    delay: 0.1 * index,
                })
            })
        })

            




    return (
        <section className={styles.formulesContainer} ref={formuleContainerRef}>
            <div className={styles.container} ref={darkModeRef}>
                <div className={styles.typeExplainer}>
                    <div>Nos formules sont</div>
                    <div className={styles.typeAnim}><div ref={explainerTextRef}>{phraseExplainer}</div></div>
                </div>
            </div>
            <div className={styles.formulesContent}>
                <article ref={innerRef} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
                    <h3 className={`${styles.h2} ${styles.m_0} ${styles.textAppear}`} ref={formuleFirstRef}>
                        <div className={styles.textAppear}>
                            <div className={styles.textAppearWrapper}>Lieu</div>
                        </div>
                        <div className={styles.textAppear}>
                            <div className={styles.textAppearWrapper}>privilégié</div>
                        </div>
                    </h3>
                    <div className={styles.inner} >
                        <ul className={styles.list}>
                            <li>450m² à partager</li>
                            <li>450m² à partager</li>
                            <li>450m² à partager</li>
                            <li>450m² à partager</li>
                            <li>450m² à partager</li>
                            <li>450m² à partager</li>
                        </ul>
                    </div>
                </article>
                <article onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
                    <h3 className={`${styles.h2} ${styles.m_0}`} ref={formuleSecondRef}>
                        <div className={styles.textAppear}>
                            <div className={styles.textAppearWrapper}>Lieu</div>
                        </div>
                        <div className={styles.textAppear}>
                            <div className={styles.textAppearWrapper}>privilégié</div>
                        </div>
                    </h3>
                    <div className={styles.inner}>
                        <ul className={styles.list}>
                            <li>450m² à partager</li>
                            <li>450m² à partager</li>
                            <li>450m² à partager</li>
                            <li>450m² à partager</li>
                            <li>450m² à partager</li>
                            <li>450m² à partager</li>
                        </ul>
                    </div>
                </article>
                <article onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
                    <h3 className={`${styles.h2} ${styles.m_0}`} ref={formuleThirdRef}>
                        <div className={styles.textAppear}>
                            <div className={styles.textAppearWrapper}>Lieu</div>
                        </div>
                        <div className={styles.textAppear}>
                            <div className={styles.textAppearWrapper}>privilégié</div>
                        </div>
                    </h3>
                    <div className={styles.inner}>
                        <ul className={styles.list}>
                            <li>450m² à partager</li>
                            <li>450m² à partager</li>
                            <li>450m² à partager</li>
                            <li>450m² à partager</li>
                            <li>450m² à partager</li>
                            <li>450m² à partager</li>
                        </ul>
                    </div>
                </article>
            </div>
        </section>
    )
}

export default FormulesSection