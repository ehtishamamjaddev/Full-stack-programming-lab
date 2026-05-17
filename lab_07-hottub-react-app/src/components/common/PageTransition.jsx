import { motion, useReducedMotion } from 'framer-motion';

function PageTransition({ children }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.main
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: reducedMotion ? 0.12 : 0.28, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  );
}

export default PageTransition;
