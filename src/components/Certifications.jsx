import { motion } from 'framer-motion'
import { Award, ExternalLink, Sparkles } from 'lucide-react'
import { certifications } from '../data/portfolioData'
import SectionWrapper from './SectionWrapper'

const childVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
}

export default function Certifications() {
  return (
    <SectionWrapper id="certifications" kicker={certifications.kicker} title={certifications.title}>
      <motion.div
        variants={childVariants}
        className="flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {certifications.items.map((cert, index) => (
          <motion.article
            key={cert.href}
            className="glass-card min-w-[18rem] snap-start rounded-[1.5rem] p-6 lg:min-w-0"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.58, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -7, borderColor: 'rgba(0, 212, 255, 0.45)' }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo to-cyan font-display text-lg font-bold text-void shadow-cyan">
                {cert.badge}
              </div>
              <Award className="text-cyan" size={22} />
            </div>
            <h3 className="mt-7 font-display text-2xl font-bold leading-tight text-pearl">{cert.name}</h3>
            <p className="mt-3 font-mono text-sm text-cyan">{cert.issuer}</p>
            <a
              href={cert.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2.5 text-sm font-bold text-pearl transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              {certifications.cta}
              <ExternalLink size={15} />
            </a>
          </motion.article>
        ))}

        <motion.article
          className="glass-card min-w-[18rem] snap-start rounded-[1.5rem] border-cyan/25 bg-cyan/10 p-6 lg:min-w-0"
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.58, delay: certifications.items.length * 0.07 }}
          whileHover={{ y: -7 }}
        >
          <div className="grid h-14 w-14 place-items-center rounded-2xl border border-cyan/30 bg-cyan/15 text-cyan shadow-cyan">
            <Sparkles size={24} />
          </div>
          <p className="mt-7 font-mono text-xs uppercase text-cyan">{certifications.activity.badge}</p>
          <h3 className="mt-3 font-display text-3xl font-bold text-pearl">{certifications.activity.title}</h3>
          <p className="mt-3 text-muted">{certifications.activity.detail}</p>
        </motion.article>
      </motion.div>
    </SectionWrapper>
  )
}
