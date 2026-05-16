import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { skills } from '../data/portfolioData'
import SectionWrapper from './SectionWrapper'

const childVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
}

function RadialSkill({ skill, index }) {
  return (
    <motion.div
      className="glass-card grid place-items-center rounded-2xl p-5 text-center"
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.94 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { delay: index * 0.06, type: 'spring', stiffness: 220, damping: 18 },
        },
      }}
    >
      <p className="font-mono text-sm text-cyan">{skill.label}</p>
    </motion.div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skills.tabs[0].id)
  const currentTab = skills.tabs.find((tab) => tab.id === activeTab) ?? skills.tabs[0]

  return (
    <SectionWrapper id="skills" kicker={skills.kicker} title={skills.title}>
      <motion.div variants={childVariants} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.24 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {skills.core.map((skill, index) => (
            <RadialSkill key={skill.label} skill={skill} index={index} />
          ))}
        </motion.div>

        <div className="glass-card rounded-[2rem] p-5 md:p-7">
          <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.035] p-2">
            {skills.tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                  activeTab === tab.id ? 'bg-gradient-to-r from-indigo to-cyan text-void' : 'text-muted hover:text-pearl'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              className="mt-8 flex flex-wrap gap-3"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -12 }}
              variants={{ visible: { transition: { staggerChildren: 0.075 } } }}
            >
              {currentTab.items.map((item) => (
                <motion.span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 font-mono text-sm text-pearl shadow-glass"
                  variants={{
                    hidden: { opacity: 0, y: 18, scale: 0.82 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { type: 'spring', stiffness: 330, damping: 18 },
                    },
                  }}
                  whileHover={{ y: -4, scale: 1.04 }}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
