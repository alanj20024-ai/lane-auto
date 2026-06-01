import TopNav from '@/components/TopNav'
import Hero from '@/components/Hero'
import TrustStrip from '@/components/TrustStrip'
import TexasMap from '@/components/TexasMap'
import DeparturesBoard from '@/components/DeparturesBoard'
import HowItWorks from '@/components/HowItWorks'
import WhyLane from '@/components/WhyLane'
import FAQ from '@/components/FAQ'
import LeadCapture from '@/components/LeadCapture'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <TrustStrip />
        <TexasMap />
        <DeparturesBoard />
        <HowItWorks />
        <WhyLane />
        <FAQ />
        <LeadCapture />
      </main>
      <Footer />
    </>
  )
}
