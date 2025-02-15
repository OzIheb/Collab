"use client"

import Image from "next/image";
import styles from "./page.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ElementRef, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from 'gsap/TextPlugin'
import coworking from '@/public/images/coworking.jpg';
import PodcastImage from '@/public/images/Podcast-image.jpg';
import TrainingImage from '@/public/images/TrainingRoom.jpg';
import ConferenceImage from '@/public/images/ConferenceRoom.jpg';
import Hero from "./_components/hero-section/hero";
import HeroText from "./_components/hero-text/hero-text";
import IntroSection from "./_components/intro-section/intro-section";
import ServiceSection from "./_components/services-section/service-section";
import FormulesSection from "./_components/formules-section/formules-section";
import PartnersSection from "./_components/partners-section/partners-section";
import FooterSection from "./_components/footer-section/footer-section";
import LocationSection from "./_components/location-section/location-section";
import CalButton from "./_components/CalButton";

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
  const highlight__activeStyle = `.${styles.highlight__active}`;

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default
      const locomotiveScroll = new LocomotiveScroll();
    })()
  }, [])

  return (
    <main className={`${styles.main}`}> 
      <Hero />
      <HeroText />
      <IntroSection />
      <ServiceSection 
        title="Podcast Room"
        text="Got a great podcast idea? Need a professional space to record high-quality audio? The Podcast Room at ELCollab is fully equipped with everything you need to produce your episodes with clarity and precision. Perfect for podcasters, storytellers, and content creators!"
        src={PodcastImage}
        alt="people sitting around a table in collab"
      />
      <ServiceSection 
        title="Training Room"
        text="Whether you're a trainer hosting a workshop or a participant eager to develop new skills, the Training Room provides a dynamic space with all necessary tools for an interactive and productive learning experience."
        src={TrainingImage}
        alt="people sitting around a table in collab"
      />
      <ServiceSection 
        title="Conference Room"
        text="Need a spacious setting for lectures, group discussions, or professional meetings? The Conference Room at ELCollab is designed for impactful conversations, brainstorming, and knowledge exchange in a comfortable and professional environment.  ."
        src={ConferenceImage}
        alt="people sitting around a table in collab"
      />
      <ServiceSection 
        title="Main Courtyard"
        text="A lively, open space where ideas flow, connections are made, and events come to life. The Main Courtyard is the perfect spot to relax, engage in discussions, and be part of the ELCollab community.."
        src={ConferenceImage}
        alt="people sitting around a table in collab"
      />
      <FormulesSection />
      <LocationSection />
      <PartnersSection />
      <FooterSection />
      <CalButton />
    </main>
  );
}

