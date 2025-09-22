// PlayButton component styles
// This file will contain any additional styled-components or CSS-in-JS styles
// Currently using Tailwind classes in the component, but keeping this file
// for future custom styling needs

export const PlayButtonStyles = {
  container: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  button: {
    position: 'relative' as const,
    backgroundColor: 'var(--color-green)',
    color: 'var(--color-text-primary)',
    fontSize: 'clamp(3rem, 8vw, 6rem)',
    fontWeight: '900',
    fontFamily: 'var(--font-jakarta)',
    padding: '1.5rem 2rem',
    borderRadius: '9999px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: 'none',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease',
  },
  
  ripple: {
    position: 'absolute' as const,
    inset: 0,
    backgroundColor: 'var(--color-green)',
    borderRadius: '9999px',
  },
  
  // Animation keyframes for scribble effect
  scribbleAnimation: {
    '0%': {
      transform: 'scale(0.8) rotate(0deg)',
      opacity: 0,
    },
    '20%': {
      transform: 'scale(1.1) rotate(-2deg)',
      opacity: 0.8,
    },
    '40%': {
      transform: 'scale(0.95) rotate(2deg)',
      opacity: 1,
    },
    '60%': {
      transform: 'scale(1.02) rotate(-1deg)',
      opacity: 1,
    },
    '80%': {
      transform: 'scale(0.98) rotate(1deg)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(1) rotate(0deg)',
      opacity: 1,
    },
  },
  
  // Ripple animation keyframes
  rippleAnimation: {
    '0%': {
      transform: 'scale(0)',
      opacity: 0.6,
    },
    '50%': {
      opacity: 0.3,
    },
    '100%': {
      transform: 'scale(2)',
      opacity: 0,
    },
  },
};
