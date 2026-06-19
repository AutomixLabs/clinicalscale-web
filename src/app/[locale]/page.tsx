import { setRequestLocale } from "next-intl/server"
import { Navbar } from "@/components/blocks/Navbar"
import { Hero } from "@/components/blocks/Hero"
import { Problem } from "@/components/blocks/Problem"
import { KillerFeatures } from "@/components/blocks/KillerFeatures"
import { CapabilitiesGrid } from "@/components/blocks/CapabilitiesGrid"
import { CaseMG } from "@/components/blocks/CaseMG"
import { WhyClinicalScale } from "@/components/blocks/WhyClinicalScale"
import { Faq } from "@/components/blocks/Faq"
import { FinalCta } from "@/components/blocks/FinalCta"
import { Footer } from "@/components/blocks/Footer"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <KillerFeatures />
        <CapabilitiesGrid />
        <CaseMG />
        <WhyClinicalScale />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
