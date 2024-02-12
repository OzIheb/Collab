"use client"

import Image from "next/image";
import styles from "./page.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ElementRef, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from 'gsap/TextPlugin'
import coworking from '@/public/images/coworking.jpg';
import Hero from "./_components/hero-section/hero";
import HeroText from "./_components/hero-text/hero-text";
import IntroSection from "./_components/intro-section/intro-section";
import ServiceSection from "./_components/services-section/service-section";
import FormulesSection from "./_components/formules-section/formules-section";
import PartnersSection from "./_components/partners-section/partners-section";
import FooterSection from "./_components/footer-section/footer-section";

export default function Home() {

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(TextPlugin)

  const [phraseExplainer, setPhraseExplainer] = useState("chaleureux");

   
  const textAppearWrapperStyle = `.${styles.textAppearWrapper}`;
  const imageAnimStyle = `.${styles.imageAnim}`;
  const imageStyle = `.${styles.image}`;
  const highlightStyle = `.${styles.highlight}`;
  const container2Style = `.${styles.container2}`;
  const servicesDescriptionStyle = `.${styles.servicesDescription}`;
  // const heroTextStyle = `.${styles.heroText}`;
  const highlight__activeStyle = `.${styles.highlight__active}`;

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();

      }
    )()
  }, [])






  return (
    <main   className={`${styles.main}`}> 
      {/* <div className={styles.noise}/> */}
      <Hero />
      <HeroText />
      <IntroSection />
      <ServiceSection 
        title="S'installer"
        text="Seul ou en équipe, profitez de services  sur-mesure et de bureaux personnalisés à votre image."
        src={coworking}
        alt="people sitting around a table in collab"
      />
      <ServiceSection 
        title="S'installer"
        text="Seul ou en équipe, profitez de services  sur-mesure et de bureaux personnalisés à votre image."
        src={coworking}
        alt="people sitting around a table in collab"
      />
      <ServiceSection 
        title="S'installer"
        text="Seul ou en équipe, profitez de services  sur-mesure et de bureaux personnalisés à votre image."
        src={coworking}
        alt="people sitting around a table in collab"
      />
      <ServiceSection 
        title="S'installer"
        text="Seul ou en équipe, profitez de services  sur-mesure et de bureaux personnalisés à votre image."
        src={coworking}
        alt="people sitting around a table in collab"
      />
      <ServiceSection 
        title="S'installer"
        text="Seul ou en équipe, profitez de services  sur-mesure et de bureaux personnalisés à votre image."
        src={coworking}
        alt="people sitting around a table in collab"
      />
      <FormulesSection />
      <PartnersSection />
      <FooterSection />
      {/* <div className={styles.hero}>
        <div className={styles.container}>
          Container goes here
        </div>
      </div> */}

    </main>
  );

  }