import { AnimatePresence, motion } from 'framer-motion'
import emailjs from 'emailjs-com'
import { Check, GitBranch, Loader2, Mail, Network, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { contact } from '../data/portfolioData'
import SectionWrapper from './SectionWrapper'

const childVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
}

const iconMap = {
  mail: Mail,
  phone: Phone,
  linkedin: Network,
  github: GitBranch,
}

const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = contact.form.name.error
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = contact.form.email.error
  if (!values.subject.trim()) errors.subject = contact.form.subject.error
  if (values.message.trim().length < 8) errors.message = contact.form.message.error
  return errors
}

export default function Contact() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [toast, setToast] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('loading')
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, values, publicKey)
        setToast(contact.form.success)
        setStatus('success')
        setValues(initialValues)
      } else {
        const body = encodeURIComponent(`${values.message}\n\nFrom: ${values.name} <${values.email}>`)
        window.location.href = `mailto:yashkashyap1204@gmail.com?subject=${encodeURIComponent(values.subject)}&body=${body}`
        setToast(contact.form.failure)
        setStatus('idle')
      }
    } catch {
      setToast(contact.form.failure)
      setStatus('idle')
    }

    window.setTimeout(() => {
      setToast('')
      if (status !== 'loading') setStatus('idle')
    }, 3600)
  }

  return (
    <SectionWrapper id="contact" kicker={contact.kicker} title={contact.title}>
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div variants={childVariants} className="flex flex-col justify-between gap-8">
          <p className="max-w-xl text-xl leading-8 text-muted">{contact.subtext}</p>
          <div className="grid gap-4">
            {contact.details.map((detail) => {
              const Icon = iconMap[detail.icon]
              return (
                <a
                  key={detail.href}
                  href={detail.href}
                  target={detail.href.startsWith('http') ? '_blank' : undefined}
                  rel={detail.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="glass-card group flex items-center gap-4 rounded-2xl p-4 transition-transform hover:-translate-y-1 hover:border-cyan/40"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.055] text-cyan group-hover:shadow-cyan">
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="block font-mono text-xs uppercase text-cyan">{detail.label}</span>
                    <span className="mt-1 block text-pearl">{detail.value}</span>
                  </span>
                </a>
              )
            })}
          </div>
        </motion.div>

        <motion.form
          variants={childVariants}
          onSubmit={handleSubmit}
          className="glass-card relative rounded-[2rem] p-5 md:p-8"
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {['name', 'email'].map((field) => (
              <label key={field} className="block">
                <span className="font-mono text-xs uppercase text-cyan">{contact.form[field].label}</span>
                <input
                  name={field}
                  value={values[field]}
                  onChange={handleChange}
                  placeholder={contact.form[field].placeholder}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-pearl placeholder:text-muted/60 focus:border-cyan"
                />
                {errors[field] && <span className="mt-2 block text-sm text-cyan">{errors[field]}</span>}
              </label>
            ))}
          </div>

          <label className="mt-5 block">
            <span className="font-mono text-xs uppercase text-cyan">{contact.form.subject.label}</span>
            <input
              name="subject"
              value={values.subject}
              onChange={handleChange}
              placeholder={contact.form.subject.placeholder}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-pearl placeholder:text-muted/60 focus:border-cyan"
            />
            {errors.subject && <span className="mt-2 block text-sm text-cyan">{errors.subject}</span>}
          </label>

          <label className="mt-5 block">
            <span className="font-mono text-xs uppercase text-cyan">{contact.form.message.label}</span>
            <textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              placeholder={contact.form.message.placeholder}
              rows="6"
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-pearl placeholder:text-muted/60 focus:border-cyan"
            />
            {errors.message && <span className="mt-2 block text-sm text-cyan">{errors.message}</span>}
          </label>

          <button
            type="submit"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo to-cyan px-6 py-3 font-bold text-void shadow-cyan transition-transform hover:-translate-y-1 sm:w-auto"
            disabled={status === 'loading'}
          >
            {status === 'loading' && <Loader2 size={18} className="animate-spin" />}
            {status === 'success' && <Check size={18} />}
            {status === 'idle' && <Send size={18} />}
            {status === 'loading' ? contact.form.sending : contact.form.submit}
          </button>

          <AnimatePresence>
            {toast && (
              <motion.div
                className="absolute bottom-5 left-5 right-5 rounded-2xl border border-cyan/30 bg-cyan/15 px-4 py-3 text-sm text-pearl shadow-cyan backdrop-blur-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
              >
                {toast}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </SectionWrapper>
  )
}
