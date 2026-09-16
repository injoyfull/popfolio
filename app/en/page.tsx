import type { Metadata } from "next";
import Landing from "@/components/landing/Landing";
import { landingEn } from "@/lib/i18n/landing";

// English landing — same structure as the Korean one, English copy.
const title = "Popfolio — your own pop-up exhibition";
const description =
  "Don’t let your works get buried in a camera roll. With a few photos and a few words, Popfolio hangs them as a pop-up exhibition you can share with one link.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/en",
    languages: { ko: "/", en: "/en" },
  },
  openGraph: { title, description, siteName: "Popfolio", locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function HomeEn() {
  return <Landing t={landingEn} />;
}
