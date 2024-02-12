import { ElementRef, useRef, useState } from 'react';
import styles from './hero-text.module.css';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import coworking from '@/public/images/coworking.jpg';
import Image from 'next/image';
import gsap from "gsap";


const HeroText = () => {

    const [phraseIntro, setPhraseIntro] = useState("les echanges");

    const lightModeRef = useRef<ElementRef<"div">>(null);
    const introTextRef = useRef<ElementRef<"div">>(null);

    const typeFamilyStyle = `.${styles.typeFamily}`;
    const textAppearWrapperStyle = `.${styles.textAppearWrapper}`;
    const imageAnimStyle = `.${styles.imageAnim}`;
    const containerStyle = `.${styles.container}`;
    const imageStyle = `.${styles.image}`;
    


    let phrasesIntro = ["les echanges", "la collaboration", "la creativite", "la synergie" ];

    useGSAP(() => {


        let introSwitcher = gsap.timeline({
            repeat: -1,
            repeatDelay: 1,
            })

            // gsap.to()
        let currentIndex = 0;

        introSwitcher.to(introTextRef.current, 
            {
                yPercent: -100,

                duration: 0.3, 
                ease: "ease-in-out",
                onComplete: () => {
                currentIndex = (currentIndex + 1) % phrasesIntro.length;
                setPhraseIntro(phrasesIntro[currentIndex]);
                // typeRef.current.innerHTML = phrases[currentIndex];
                }
            }
        )

            introSwitcher.to(introTextRef.current,{
            yPercent: 0,
            stagger: 0.01,
            duration: 0.3, 
            ease: "ease-in-out",
            startAt: {yPercent: 100},
            })

        introSwitcher.pause();


        const mm = gsap.matchMedia();

        mm.add({
            isMD: "(min-width: 501px)",
            isTabletUpper: "max-width: 1023px",
            isMobile: "(max-width: 500px)"
        },
        (context) => {

            if  (context.conditions) {
                var { isMD, isTabletLower, isTabletUpper, isMobile } = context.conditions;
                console.log("tablet bouds are", isTabletUpper, "mobile is", isMobile, "desktop is", isMD)
            }

            let textAppearAnim = gsap.fromTo(textAppearWrapperStyle, {
            yPercent: 100,   
            },
        {
                yPercent: 0,
                duration: 0.5,
                scrollTrigger: {
                trigger: typeFamilyStyle,
                endTrigger: imageAnimStyle,
                start: () => isMD ? "top-=80% top" : isMobile ? "top-=200% top" :"top-=50% top",
                end: "bottom center",
                id: "text-appear",
                // markers: true,
                onEnterBack: () => {
                    textAppearAnim.restart();
                },
                onLeave: () => {
                    introSwitcher.restart();
                    introSwitcher.pause();
                    textAppearAnim.reverse();
                },
                onLeaveBack: () => {
                    introSwitcher.pause(); 
                    textAppearAnim.reverse();
                }
                },
                ease: "ease-in-out",
                onComplete: () => {
                introSwitcher.play();
                }
            })
            gsap.to(imageStyle, {
                scale: 1,
                scrollTrigger: {
                trigger: containerStyle,
                endTrigger: imageAnimStyle,
                start: () => isMobile ? "top-=150% top" :"top-=100% top",
                end: () => isMobile ? "bottom bottom-=50%" : "bottom bottom-=30%",
                id: "image-scale",
                scrub: 1,
                onEnter: () => {
                    // document.querySelector('main')?.setAttribute('data-theme', 'light');
                },
                // markers: true,
                },
                ease: "power1.out",
                startAt: {scale: 0.75},
            })
            ScrollTrigger.create({
                trigger: lightModeRef.current,
                start: () => isMobile? "start-=30% top" : "start top",
                end: () => isMobile? "start-=30% bottom" : "start bottom",
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
           
        

        
        
    })


    return (
        <section className={styles.section}>
            <div className={`${styles.container}` }>
                <div className={styles.typeFamily}>
                    <div className={`${styles.type}, ${styles.textAppear}`}><div className={styles.textAppearWrapper}>Un espace</div></div>
                    <div className={`${styles.type}, ${styles.textAppear}`} ><div className={styles.textAppearWrapper}>de travail partagé</div></div>
                    <div className={`${styles.type}, ${styles.textAppear}`} ref={lightModeRef}><div className={`${styles.textAppearWrapper}`}>qui favorise</div></div>
                    <div  className={`${styles.typeAnim}`}><div ref={introTextRef} className={styles.textAppearWrapper}>{phraseIntro}</div></div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.imageAnim}>
                    <Image
                    src={coworking}
                    alt="People working in a coworking space"
                    height={1239}
                    width={1920}
                    className={styles.image}
                    />
                </div>
            </div>
        </section>
    )
}

export default HeroText;