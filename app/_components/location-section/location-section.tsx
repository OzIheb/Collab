import { ParkingSquare } from 'lucide-react';
import styles from './location-section.module.css'
import Image from 'next/image';
import location from '@/public/images/collab_location.png'
 
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, ElementRef } from 'react';
 
const LocationSection = () => {
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<ElementRef<"section">>(null);
    const titleStyle = `.${styles.title}`;

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Desktop animation
        mm.add("(min-width: 992px)", () => {
            gsap.fromTo(imageRef.current,
                {
                    yPercent: 10,
                },
                {
                    yPercent: -30,
                    scrollTrigger: {
                        trigger: titleStyle,
                        endTrigger: containerRef.current,
                        start: "top-=130% top",
                        end: "center top",
                        scrub: 1,
                        id: "location-up",
                    },
                    ease: "ease-in-out",
                }
            );
        });

        // Mobile animation
        mm.add("(max-width: 991.98px)", () => {
            gsap.fromTo(imageRef.current,
                {
                    scale: 0.95,
                    opacity: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top bottom",
                        end: "center center",
                        scrub: 1,
                        id: "location-mobile",
                    },
                    ease: "ease-in-out",
                }
            );
        });
    })
 
    return (
        <section className={styles.container} ref={containerRef}>
            <div className={styles.title}>
                Rue principal de beb bhar Sfax
            </div>
 
            <div className={styles.location}>
                <div className={styles.location__info}>
                    <div className={styles.location__info_col1}>
                        <div className={styles.info__unit}>
                            <span>Near 100 metres sfax</span>
                            <ParkingSquare className={styles.info__unit_icon} />
                        </div>
                        <div className={styles.info__unit}>
                            <span>Beb Bhar</span>
                            <ParkingSquare className={styles.info__unit_icon} />
                        </div>
                    </div>
                    {/* <div className={styles.location__info_col2}>
                        <div className={styles.info__unit}>
                            <span>Parking Proche</span>
                            <ParkingSquare className={styles.info__unit_icon} />
                        </div>
                        <div className={styles.info__unit}>
                            <span>Parking Proche</span>
                            <ParkingSquare className={styles.info__unit_icon} />
                        </div>
                        <div className={styles.info__unit}>
                            <span>Parking Proche</span>
                            <ParkingSquare className={styles.info__unit_icon} />
                        </div>
                        <div className={styles.info__unit}>
                            <span>Parking Proche</span>
                            <ParkingSquare className={styles.info__unit_icon} />
                        </div>
                    </div> */}
                </div>
                <div className={styles.location__info_image}>
                    <Image
                        src={location}
                        alt={"location de collab"}
                        width={636}
                        height={636}
                        ref={imageRef}
                    />
                </div>
            </div>
        </section>
    )
}
 
export default LocationSection;