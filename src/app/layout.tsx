import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

const title = "Kiril Klein, PhD — Machine Learning Engineer";
const description =
  "Machine Learning Engineer with a PhD in Computer Science. NLP and LLMs, transformers for health records, and causal inference from observational data.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kirilklein.github.io"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title,
    description,
    url: "/",
    images: ["/assets/kiril-klein.png"],
  },
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kiril Klein",
  honorificSuffix: "PhD",
  jobTitle: "Machine Learning Engineer",
  url: "https://kirilklein.github.io/",
  email: "mailto:kiril.vadimovic.klein@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Copenhagen",
    addressCountry: "DK",
  },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Copenhagen" },
  sameAs: [
    "https://github.com/kirilklein",
    "https://www.linkedin.com/in/kiril-klein-phd-574809211",
    "https://scholar.google.com/citations?user=8k9TwncAAAAJ&hl=en",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
