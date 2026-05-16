import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import { siteMeta } from './data/portfolioData'

const About = lazy(() => import('./components/About'))
const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const Skills = lazy(() => import('./components/Skills'))
const Certifications = lazy(() => import('./components/Certifications'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function IntroOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-void"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <motion.div
        className="font-display text-[clamp(2.8rem,11vw,8rem)] font-extrabold gradient-text"
        initial={{ y: 36, opacity: 0, filter: 'blur(12px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      >
        {siteMeta.introName}
      </motion.div>
    </motion.div>
  )
}

function LoadingSection() {
  return (
    <div className="grid min-h-40 place-items-center">
      <span className="sr-only">{siteMeta.loading}</span>
      <span className="h-8 w-8 animate-spin rounded-full border border-white/10 border-t-cyan" />
    </div>
  )
}

function PortfolioPage() {
  return (
    <div className="app-shell">
      <Navbar />
      <Hero />
      <Suspense fallback={<LoadingSection />}>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
        <Footer />
      </Suspense>
      <CustomCursor />
    </div>
  )
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 800)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.08,
      lerp: 0.095,
      smoothWheel: true,
      wheelMultiplier: 0.86,
    })
    let frameId

    const raf = (time) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }

    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  return (
    <BrowserRouter>
      <AnimatePresence>{showIntro && <IntroOverlay />}</AnimatePresence>
      <Routes>
        <Route path="*" element={<PortfolioPage />} />
      </Routes>
    </BrowserRouter>
  )
}
