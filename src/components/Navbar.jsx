import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navigation, siteMeta } from '../data/portfolioData'
import { useScrollProgress } from '../hooks/useScrollProgress'

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const progress = useScrollProgress()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navigation.map((item) => document.getElementById(item.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { root: null, rootMargin: '-28% 0px -58% 0px', threshold: [0.12, 0.32, 0.6] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleNavigate = (id) => {
    setIsOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-indigo to-cyan shadow-cyan"
        style={{ width: `${progress * 100}%` }}
      />
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'border-b border-white/10 bg-void/70 shadow-glass backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-[var(--nav-height)] w-[min(1180px,calc(100%_-_1.5rem))] items-center justify-between">
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="group flex items-center gap-3"
            data-cursor="hover"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] font-display text-lg font-bold text-pearl shadow-glow animate-pulseGlow">
              {siteMeta.monogram}
            </span>
            <span className="hidden font-display text-sm font-bold text-pearl sm:block">{siteMeta.name}</span>
          </button>

          <div className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`group relative py-2 text-sm font-medium transition-colors ${
                  active === item.id ? 'text-pearl' : 'text-muted hover:text-pearl'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-indigo to-cyan transition-all duration-300 ${
                    active === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavigate('contact')}
              className="pill-gradient hidden rounded-full px-5 py-2.5 text-sm font-bold text-pearl shadow-glow transition-transform hover:-translate-y-0.5 hover:shadow-cyan sm:inline-flex"
            >
              {siteMeta.hireMe}
            </button>
            <button
              type="button"
              className="glass-card flex h-11 w-11 items-center justify-center rounded-xl text-pearl lg:hidden"
              aria-label={isOpen ? siteMeta.menuClose : siteMeta.menuOpen}
              onClick={() => setIsOpen((value) => !value)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-void/94 px-8 backdrop-blur-2xl lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-5">
              {navigation.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className="border-b border-white/10 py-4 text-left font-display text-4xl font-bold text-pearl"
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
