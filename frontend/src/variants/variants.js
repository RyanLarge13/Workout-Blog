export const form = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    y: 100,
    transition: {
      when: "afterChildren",
    },
  },
};

export const formItem = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 100,
  },
};

export const heading = {
  hidden: {
    x: -500,
  },
  show: {
    x: 0,
    transition: {
      duration: 0.75,
      type: "spring",
      stiffness: 200,
    },
  },
};

export const navAni = {
  hidden: {
    y: "-97%",
  },
  show: {
    y: 0,
  },
};
