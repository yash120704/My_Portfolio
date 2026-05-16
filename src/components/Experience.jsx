import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BriefcaseBusiness } from 'lucide-react'
import { experience } from '../data/portfolioData'
import SectionWrapper from './SectionWrapper'

gsap.registerPlugin(ScrollTrigger)

const childVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
}

export default function Experience() {
  const cardRef = useRef(null)

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        '.experience-accent',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 72%',
            end: 'bottom 42%',
            scrub: 0.8,
          },
        },
      )
    }, cardRef)

    return () => context.revert()
  }, [])

  return (
    <SectionWrapper id="experience" kicker={experience.kicker} title={experience.title} headerClassName="text-center">
      <motion.div variants={childVariants} className="mx-auto max-w-5xl">
        <motion.article
          ref={cardRef}
          className="glass-card relative overflow-hidden rounded-[2rem] p-6 md:p-10"
          whileHover={{ y: -6, rotateX: 1.5, rotateY: -1.5 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        >
          <span className="experience-accent absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-indigo to-cyan" />
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-indigo/15 text-cyan shadow-glow">
                <BriefcaseBusiness size={24} />
              </div>
              <p className="font-mono text-sm uppercase text-cyan">{experience.company}</p>
              <h3 className="mt-3 font-display text-4xl font-bold text-pearl md:text-5xl">{experience.role}</h3>
              <p className="mt-2 italic text-muted">{experience.tags.join(' · ')}</p>
            </div>
            <span className="w-fit rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 font-mono text-xs uppercase text-cyan">
              {experience.period}
            </span>
          </div>

          <motion.ul
            className="mt-9 grid gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {experience.bullets.map((bullet) => (
              <motion.li
                key={bullet}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-muted"
                variants={{
                  hidden: { opacity: 0, x: -18 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.55 } },
                }}
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan shadow-cyan" />
                <span>{bullet}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.article>
      </motion.div>
    </SectionWrapper>
  )
}
