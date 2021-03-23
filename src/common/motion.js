export const pageDefaultMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 3 },
};

export const listMotion = {
  listVariants: {
    initial: {
      opacity: 0,
      height: 0,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
    animate: {
      opacity: 1,
      height: "auto",
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  },
  
  listItemVariants: {
    initial: {
      opacity: 0,
      x: -50,
    },
    animate: {
      opacity: 1,
      x: 0,
      // transition:{duration: 2}
    },
  },
};
