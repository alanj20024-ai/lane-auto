import TopNav from '@/components/TopNav'
import Hero from '@/components/Hero'
import LanesGrid from '@/components/LanesGrid'
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
        <LanesGrid />
        <HowItWorks />
        <WhyLane />
        <FAQ />
        <LeadCapture />
      </main>
      <Footer />
    </>
  )
}
