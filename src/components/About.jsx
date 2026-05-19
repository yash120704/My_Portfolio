import { animate, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { about } from '../data/portfolioData'
import SectionWrapper from './SectionWrapper'
import profileImage from '../assets/Yash_K.jpg'

const childVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
}

function CounterStat({ stat }) {
  const [displayValue, setDisplayValue] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.45 })

  useEffect(() => {
    if (!inView) return undefined
    const controls = animate(0, stat.value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(latest),
    })

    return () => controls.stop()
  }, [inView, stat.value])

  const formatted = stat.decimals > 0 ? displayValue.toFixed(stat.decimals) : Math.round(displayValue)

  return (
    <div ref={ref} className="glass-card rounded-2xl p-4 text-center">
      <div className="font-display text-2xl font-bold text-pearl">
        {formatted}
        <span className="text-cyan">{stat.suffix}</span>
      </div>
      <p className="mt-2 text-xs uppercase text-muted">{stat.label}</p>
    </div>
  )
}

export default function About() {
  return (
    <SectionWrapper id="about" kicker={about.kicker} title={about.title}>
      <div className="grid items-start gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <motion.div variants={childVariants} className="relative mx-auto w-full max-w-md lg:sticky lg:top-28">
          <div className="absolute -right-2 top-6 z-20 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 font-mono text-xs text-cyan shadow-cyan backdrop-blur-xl">
            {about.badge}
          </div>

          <div className="glass-card relative overflow-hidden rounded-[2rem] p-8">
            <div className="relative mx-auto grid aspect-square max-w-[17rem] place-items-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo via-cyan to-white p-[2px] animate-pulseGlow" />
              <div className="absolute -inset-4 rounded-full border border-dashed border-cyan/35 animate-[spin_18s_linear_infinite]" />
              <img
                src={profileImage}
                alt={about.imageAlt}
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <div className="mt-8 grid gap-3">
              {about.stats.map((stat) => (
                <CounterStat key={stat.label} stat={stat} />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={childVariants}>
          <p className="max-w-3xl text-lg leading-8 text-muted md:text-xl md:leading-9">{about.body}</p>

          <div className="relative mt-10 grid gap-6 before:absolute before:left-5 before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-gradient-to-b before:from-indigo before:via-cyan before:to-transparent md:before:left-1/2">
            {about.education.map((item, index) => (
              <motion.article
                key={item.institution}
                className={`relative md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -36 : 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className={`absolute left-[1.05rem] top-7 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan shadow-cyan ${
                    index % 2 === 0 ? 'md:left-auto md:right-[-2.45rem]' : 'md:left-[-2rem]'
                  }`}
                />
                <div className="glass-card ml-10 rounded-2xl p-6 md:ml-0">
                  <div className="font-mono text-xs uppercase text-cyan">{item.period}</div>
                  <h3 className="mt-3 font-display text-2xl font-bold text-pearl">{item.institution}</h3>
                  <p className="mt-2 text-muted">{item.detail}</p>
                  <p className="mt-3 font-mono text-sm text-pearl">{item.score}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
