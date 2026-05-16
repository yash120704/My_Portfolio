import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(cursorX, { stiffness: 220, damping: 26, mass: 0.5 })
  const ringY = useSpring(cursorY, { stiffness: 220, damping: 26, mass: 0.5 })

  useEffect(() => {
    const handleMove = (event) => {
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
      setIsHovering(Boolean(event.target.closest('a, button, input, textarea, [data-cursor="hover"]')))
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div className="cursor-dot" style={{ x: cursorX, y: cursorY }} />
      <motion.div className={`cursor-ring ${isHovering ? 'is-hovering' : ''}`} style={{ x: ringX, y: ringY }} />
    </>
  )
}
