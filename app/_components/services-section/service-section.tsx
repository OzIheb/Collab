import Image, { StaticImageData } from 'next/image';
import styles from './service-section.module.css';
import coworking from '@/public/images/coworking.jpg';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef, ElementRef } from 'react';

interface ServiceSectionProps {
    title: string
    text: string
    src: StaticImageData
    alt: string
}

const ServiceSection = ({
    title,
    text,
    src,
    alt
}: ServiceSectionProps) => {

    const imageRef = useRef<HTMLImageElement>(null);
    const servicesSectionRef = useRef<ElementRef<"div">>(null);
    const imageAnimRef = useRef<ElementRef<"div">>(null);
    const servicesDescriptionRef = useRef<ElementRef<"div">>(null);
    const textRef = useRef<ElementRef<"p">>(null);
    const titleRef = useRef<ElementRef<"div">>(null);


    useGSAP(() => {

        const mm = gsap.matchMedia();

        mm.add({
            isMD: "(min-width: 1024px)",
            isMobile: "(max-width: 500px)",
        },
        (context) => {
            if (context.conditions) {
                var { isMD, isMobile } = context.conditions;
            }
            gsap.to(imageRef.current, {
                scale: 1,
                scrollTrigger: {
                    trigger: servicesSectionRef.current,
                    endTrigger: imageAnimRef.current,
                    start: () => isMobile ? "top-=130% top" : "top-=50% top",
                    end: () => isMobile ? "bottom bottom-=50%" :  "bottom bottom-=30%",
                    id: "image-scale",
                    scrub: 1,
                    onEnter: () => {
                        // document.querySelector('main')?.setAttribute('data-theme', 'light');
                    },
                    // markers: true,
                },
                ease: "power1.out",
                startAt: {scale: 0.75},
            });
            // (gsap.utils.toArray([titleRef.current, textRef.current]) as HTMLElement[]).forEach((element: HTMLElement) => {
            //    let textAppearAnim = gsap.fromTo(element, {
            //         yPercent: 100,
                        
            //         },
            //         {
            //             yPercent: 0,
            //             duration: 0.5,
            //             scrollTrigger: {
            //                 trigger: servicesDescriptionRef.current,
            //                 start: "top-=250% top",
            //                 end: "bottom+=100% bottom-=30%",
            //                 id: "text-appear",
            //                 markers: true,
            //                 onLeave: () => {
            //                     textAppearAnim.reverse();
            //                 },
            //                 onEnterBack: () => {
            //                     textAppearAnim.restart();
            //                 }
            //             },
            //             ease: "ease-in-out",
            //         })
            //     })
            let textAppearAnim = gsap.fromTo(servicesDescriptionRef.current, {
                    yPercent: 100,
                        
                    },
                    {
                        yPercent: 0,
                        duration: 0.5,
                        scrollTrigger: {
                            trigger: servicesSectionRef.current,
                            start: () => isMobile ? "center-=20% top" :"center top",
                            end: () => isMobile ? "bottom+=70% center" : "bottom+=30% center",
                            id: "text-appear",
                            // markers: true,
                            onLeave: () => {
                                textAppearAnim.reverse();
                            },
                            onEnterBack: () => {
                                textAppearAnim.restart();
                            }
                        },
                        ease: "ease-in-out",
                    })



        })

        

        
    })


    return (
        <div className={styles.servicesSection} ref={servicesSectionRef}>
            <div className={styles.container2}>
                <div className={styles.imageAnim} ref={imageAnimRef}>
                    <Image
                        src={src}
                        alt={alt}
                        height={1239}
                        width={1920}
                        className={styles.image}
                        ref={imageRef}
                    />
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.servicesDescription} ref={servicesDescriptionRef}>
                    <div className={`${styles.servicesDescription__title} ${styles.textAppearWrapper}`} ref={titleRef}>{title}</div>
                    <p className={`${styles.servicesDescription__text} ${styles.textAppearWrapper}`} ref={textRef}>{text}</p>
                </div>
            </div>
            
        </div>

    )
}

export default ServiceSection;