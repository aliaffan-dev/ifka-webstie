import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "IFKA — Iron Fist Karate Academy | Kerala",
    template: "%s | IFKA — Iron Fist Karate Academy",
  },
  description:
    "IFKA — Iron Fist Karate Academy is Kerala's premier full-contact karate institution in Malappuram and Palakkad. Join us for professional karate training, self-defense, and competition programs.",
  keywords: [
    "karate academy Kerala",
    "IFKA",
    "Iron Fist Karate Academy",
    "karate Malappuram",
    "karate Palakkad",
    "full contact karate",
    "self defense Kerala",
    "kids karate Kerala",
  ],
  authors: [{ name: "Iron Fist Karate Academy" }],
  creator: "IFKA",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ifka.in",
    siteName: "IFKA — Iron Fist Karate Academy",
    title: "IFKA — Iron Fist Karate Academy | Kerala",
    description:
      "Kerala's premier full-contact karate institution. Train under certified black belt instructors in Malappuram and Palakkad.",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "IFKA Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IFKA — Iron Fist Karate Academy | Kerala",
    description: "Kerala's premier full-contact karate institution in Malappuram and Palakkad.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
