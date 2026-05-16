import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Brain, ExternalLink, FileText, GitBranch, Map, Users } from 'lucide-react'
import { projects } from '../data/portfolioData'
import SectionWrapper from './SectionWrapper'

const childVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
}

const iconMap = {
  brain: Brain,
  map: Map,
  text: FileText,
  team: Users,
}

const cardVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { type: 'spring', stiffness: 260, damping: 20 } },
}

const overlayVariants = {
  rest: { y: '104%', opacity: 0 },
  hover: { y: 0, opacity: 1, transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] } },
}

function ProjectCard({ project, index }) {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const Icon = iconMap[project.icon]

  const handleMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    rotateX.set(y * -8)
    rotateY.set(x * 8)
  }

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.article
      className={`glass-card group relative min-h-[25rem] overflow-hidden rounded-[1.75rem] p-6 md:p-8 ${
        project.featured ? 'lg:col-span-2' : ''
      }`}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      viewport={{ once: true, amount: 0.28 }}
    >
      <motion.div
        className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-indigo/20 blur-3xl"
        animate={{ scale: [1, 1.16, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.055] text-cyan shadow-cyan">
            <Icon size={25} />
          </div>
          <span className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1.5 font-mono text-xs text-cyan">
            {project.tag}
          </span>
        </div>

        <div className="mt-8">
          <h3 className="font-display text-3xl font-bold text-pearl md:text-4xl">{project.title}</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 font-mono text-xs text-muted">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-3xl leading-7 text-muted">{project.description}</p>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 z-20 flex flex-col justify-end bg-void/82 p-6 backdrop-blur-md md:p-8"
        variants={overlayVariants}
      >
        <p className="font-display text-2xl font-bold text-pearl">{projects.overlayLabels.viewMore}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-pearl px-4 py-2.5 text-sm font-bold text-void"
          >
            <GitBranch size={16} />
            {projects.overlayLabels.github}
          </a>
          <a
            href={project.demo}
            className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-4 py-2.5 text-sm font-bold text-cyan"
          >
            <ExternalLink size={16} />
            {projects.overlayLabels.demo}
          </a>
        </div>
      </motion.div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <SectionWrapper id="projects" kicker={projects.kicker} title={projects.title}>
      <motion.div variants={childVariants} className="grid gap-5 lg:grid-cols-3">
        {projects.items.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
