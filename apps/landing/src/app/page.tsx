import Hero from '@/sections/Hero'
import Problem from '@/sections/Problem'
import Solution from '@/sections/Solution'
import Demo from '@/sections/Demo'
import Features from '@/sections/Features'
import Pricing from '@/sections/Pricing'
import Testimonials from '@/sections/Testimonials'
import FAQ from '@/sections/FAQ'
import CTA from '@/sections/CTA'
import Footer from '@/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Problem />
      <Solution />
      <Demo />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
