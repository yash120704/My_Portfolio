import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, GitBranch, Mail, Network } from 'lucide-react'
import { useEffect, useState } from 'react'
import { footer, siteMeta, socialLinks } from '../data/portfolioData'

const iconMap = {
  github: GitBranch,
  linkedin: Network,
  mail: Mail,
}

export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const backToTop = () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="section-container flex flex-col items-center justify-between gap-7 text-center md:flex-row md:text-left">
        <div>
          <button type="button" onClick={backToTop} className="group inline-flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.06] font-display text-lg font-bold text-pearl shadow-glow">
              {siteMeta.monogram}
            </span>
            <span>
              <span className="block font-display text-xl font-bold text-pearl">{siteMeta.name}</span>
              <span className="mt-1 block text-sm text-muted">{footer.built}</span>
            </span>
          </button>
        </div>

        <div className="flex gap-3">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon]
            return (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="glass-card grid h-11 w-11 place-items-center rounded-full text-pearl transition-transform hover:-translate-y-1 hover:border-cyan/40 hover:shadow-cyan"
                aria-label={link.label}
              >
                <Icon size={18} />
              </a>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={backToTop}
            className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-cyan/30 bg-cyan/15 text-cyan shadow-cyan backdrop-blur-xl"
            aria-label={footer.backToTop}
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.9 }}
            whileHover={{ y: -4 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
