import { motion } from 'framer-motion'

const sectionVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 },
  },
}

const childVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
}

function FlowingWave() {
  return (
    <svg className="soft-divider" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M0,64 C180,120 346,8 526,54 C702,98 812,112 972,62 C1128,14 1278,28 1440,76 L1440,120 L0,120 Z"
      />
      <path
        fill="rgba(0, 212, 255, 0.055)"
        d="M0,82 C220,38 358,108 540,72 C720,36 842,12 1038,58 C1218,100 1326,92 1440,42 L1440,120 L0,120 Z"
      />
    </svg>
  )
}

export default function SectionWrapper({ id, kicker, title, children, className = '', headerClassName = '' }) {
  return (
    <motion.section
      id={id}
      className={`spatial-section ${className}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className="section-container relative z-10">
        {(kicker || title) && (
          <motion.header className={`mb-10 md:mb-14 ${headerClassName}`} variants={childVariants}>
            {kicker && <span className="section-kicker">{kicker}</span>}
            {title && <h2 className="section-heading">{title}</h2>}
          </motion.header>
        )}
        {children}
      </div>
      <FlowingWave />
    </motion.section>
  )
}
