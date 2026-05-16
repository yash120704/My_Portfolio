import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, GitBranch, Mail, Network } from 'lucide-react'
import { hero, socialLinks } from '../data/portfolioData'
import ParticleField from './ParticleField'

const socialIconMap = {
  github: GitBranch,
  linkedin: Network,
  mail: Mail,
}

function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [characterIndex, setCharacterIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const activeRole = hero.roles[roleIndex]
  const visibleText = activeRole.slice(0, characterIndex)

  useEffect(() => {
    const complete = characterIndex === activeRole.length
    const empty = characterIndex === 0
    const delay = complete && !isDeleting ? 1300 : isDeleting ? 44 : 72

    const timeout = window.setTimeout(() => {
      if (complete && !isDeleting) {
        setIsDeleting(true)
        return
      }

      if (empty && isDeleting) {
        setIsDeleting(false)
        setRoleIndex((current) => (current + 1) % hero.roles.length)
        return
      }

      setCharacterIndex((current) => current + (isDeleting ? -1 : 1))
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [activeRole, characterIndex, isDeleting])

  return (
    <span className="font-mono text-base text-cyan sm:text-lg" data-testid="typewriter" aria-live="polite">
      {visibleText}
      <span className="ml-1 inline-block h-5 w-px translate-y-1 bg-cyan" />
    </span>
  )
}

export default function Hero() {
  const words = useMemo(() => hero.name.split(' '), [])

  const scrollToProjects = () => {
    document.getElementById(hero.primaryCta.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-[var(--nav-height)]">
      <div className="absolute inset-0 bg-spatial-gradient opacity-90" />
      <div className="absolute left-1/2 top-16 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-indigo/10 blur-3xl" />

      <div className="section-container relative z-10 grid min-h-[calc(100vh-var(--nav-height))] items-center gap-12 py-16 lg:grid-cols-[1.04fr_0.96fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="max-w-3xl"
        >
          <motion.p
            className="mb-5 font-mono text-sm uppercase text-cyan"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
          >
            {hero.eyebrow}
          </motion.p>

          <h1 className="font-display text-[clamp(3.25rem,8.5vw,7.35rem)] font-extrabold leading-[0.88] text-pearl" aria-label={hero.name}>
            {words.map((word, wordIndex) => (
              <span key={word} className="mr-[0.18em] inline-block whitespace-nowrap" aria-hidden="true">
                {word.split('').map((letter, letterIndex) => (
                  <motion.span
                    key={`${letter}-${wordIndex}-${letterIndex}`}
                    className="inline-block gradient-text"
                    variants={{
                      hidden: { opacity: 0, y: 46, rotateX: -45 },
                      visible: { opacity: 1, y: 0, rotateX: 0 },
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.div
            className="mt-7 h-8"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
          >
            <Typewriter />
          </motion.div>

          <motion.p
            className="mt-5 max-w-xl text-lg text-muted sm:text-xl"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
          >
            {hero.bio}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-4 sm:flex-row"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
          >
            <button
              type="button"
              onClick={scrollToProjects}
              className="rounded-full bg-gradient-to-r from-indigo to-cyan px-7 py-3.5 font-bold text-void shadow-glow transition-transform hover:-translate-y-1"
            >
              {hero.primaryCta.label}
            </button>
            <a
              href={hero.secondaryCta.href}
              className="glass-card inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-bold text-pearl transition-transform hover:-translate-y-1 hover:border-cyan/50"
              download
            >
              <Download size={18} />
              {hero.secondaryCta.label}
            </a>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
          >
            {socialLinks.map((link) => {
              const Icon = socialIconMap[link.icon]
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group relative glass-card flex h-12 w-12 items-center justify-center rounded-full text-pearl transition-transform hover:-translate-y-1 hover:border-cyan/50 hover:shadow-cyan"
                  aria-label={link.label}
                >
                  <Icon size={19} />
                  <span className="pointer-events-none absolute -bottom-10 left-1/2 min-w-max -translate-x-1/2 rounded-lg border border-white/10 bg-void/90 px-3 py-1 text-xs text-pearl opacity-0 shadow-glass transition-opacity group-hover:opacity-100">
                    {link.label}
                  </span>
                </a>
              )
            })}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto aspect-square w-full max-w-[32rem]"
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-8 rounded-full border border-white/10 bg-white/[0.035] shadow-glass backdrop-blur-md" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo/18 via-transparent to-cyan/16 blur-2xl" />
          <ParticleField />
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase text-muted md:flex"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <span className="font-mono">{hero.scrollLabel}</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ArrowDown size={18} />
        </motion.span>
      </motion.button>
    </section>
  )
}
