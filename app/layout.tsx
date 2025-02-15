import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { useRef } from "react";

const work = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ELCollab - Youth-Driven Community Space in Tunisia",
  description: "ELCollab is a vibrant youth-led community hub offering podcast, training, conference, and editing rooms. Join us to collaborate, learn, and grow in an inclusive space designed for connection and creativity.",
  keywords: ["coworking space", "youth community", "podcast room", "training room", "conference room", "editing room", "Tunisia", "community hub", "creative space", "professional workspace"],
  authors: [{ name: "ELCollab" }],
  creator: "ELCollab",
  publisher: "WE Youth Organization",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    title: "ELCollab - Where Ideas Thrive & Community Grows",
    description: "Discover our youth-led community space featuring podcast studios, training rooms, and creative workspaces. Join the ELCollab community today!",
    url: "https://col-lab.tn",
    siteName: "ELCollab",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ELCollab Community Space",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ELCollab - Youth-Driven Community Space",
    description: "Join our vibrant community space for podcasting, training, conferences, and creative work. Connect, learn, and grow with ELCollab.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://elcollab.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 



  return (
    <html lang="en">
      <body data-theme="dark" className={work.className}>{children}</body>
    </html>
  );
}
