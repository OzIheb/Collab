'use client'

import Image, { StaticImageData } from 'next/image';
import styles from './service-section.module.css';
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

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 1024px)",
            isTablet: "(min-width: 768px) and (max-width: 1023px)",
            isMobile: "(max-width: 767px)",
        }, (context) => {
            const { isDesktop, isTablet, isMobile } = context.conditions as { 
                isDesktop: boolean; 
                isTablet: boolean; 
                isMobile: boolean; 
            };

            gsap.to(imageRef.current, {
                scale: 1,
                scrollTrigger: {
                    trigger: servicesSectionRef.current,
                    endTrigger: imageAnimRef.current,
                    start: () => isMobile ? "top-=100% top" : isTablet ? "top-=80% top" : "top-=50% top",
                    end: () => isMobile ? "bottom bottom-=30%" : isTablet ? "bottom bottom-=40%" : "bottom bottom-=30%",
                    id: "image-scale",
                    scrub: 1,
                },
                ease: "power1.out",
                startAt: { scale: 0.75 },
            });

            gsap.fromTo(servicesDescriptionRef.current, 
                { 
                    yPercent: 100,
                    clearProps: "margin,padding" 
                },
                {
                    yPercent: 0,
                    duration: 0.5,
                    clearProps: "margin,padding", 
                    scrollTrigger: {
                        trigger: servicesSectionRef.current,
                        start: () => isMobile ? "center-=30% top" : isTablet ? "center-=25% top" : "center top",
                        end: () => isMobile ? "bottom+=50% center" : isTablet ? "bottom+=60% center" : "bottom+=30% center",
                        id: "text-appear",
                        onLeave: (self) => self.disable(),
                        onEnterBack: (self) => self.enable(),
                    },
                    ease: "power2.out",
                }
            );
        });
    });

    return (
        <div className={styles.servicesSection} ref={servicesSectionRef}>
            <div className={styles.container2}>
                <div className={styles.imageAnim} ref={imageAnimRef}>
                    <Image
                        src={src || "/placeholder.svg"}
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
                    <h2 className={styles.servicesDescription__title}>{title}</h2>
                    <p className={styles.servicesDescription__text}>{text}</p>
                </div>
            </div>
        </div>
    );
};

export default ServiceSection;

