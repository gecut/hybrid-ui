import type {Config} from 'tailwindcss';

export const animationTheme: Config['theme'] = {
  keyframes: {
    // In Animations
    appear: {
      from: {
        transform: 'translate3d(0, 100%, 0)',
        opacity: '0',
      },
      to: {
        transform: 'translate3d(0, 0, 0)',
        opacity: '1',
      },
    },
    fadeInSlide: {
      from: {
        transform: 'translate3d(0, 1rem, 0)',
        opacity: '0',
      },
      to: {
        transform: 'translate3d(0, 0, 0)',
        opacity: '1',
      },
    },
    zoomSlideIn: {
      from: {
        transform: 'translate3d(0, -25%, 0) scaleY(0.5)',
      },
      to: {
        transform: 'translate3d(0, 0, 0) scaleY(1)',
      },
    },
    zoomFadeIn: {
      '0%': {
        transform: 'translate3d(0, -10%, 0) scaleY(0.8)',
        opacity: '0',
      },
      '60%': {
        opacity: '1',
      },
      '100%': {
        transform: 'translate3d(0, 0, 0) scaleY(1)',
        opacity: '1',
      },
    },
    fadeIn: {
      from: {
        opacity: '0',
      },
      to: {
        opacity: '1',
      },
    },
    // Out Animations
    fadeOutSlide: {
      from: {
        transform: 'translate3d(0, 0, 0)',
        opacity: '1',
      },
      to: {
        transform: 'translate3d(0, 1rem, 0)',
        opacity: '0',
      },
    },
    zoomSlideOut: {
      from: {
        transform: 'translate3d(0, 0, 0) scaleY(1)',
      },
      to: {
        transform: 'translate3d(0, 25%, 0) scaleY(0.5)',
      },
    },
    zoomFadeOut: {
      '0%': {
        transform: 'translate3d(0, 0, 0) scaleY(1)',
        opacity: '1',
      },
      '60%': {
        opacity: '0',
      },
      '100%': {
        transform: 'translate3d(0, 10%, 0) scaleY(0.8)',
        opacity: '0',
      },
    },
    fadeOut: {
      from: {
        opacity: '1',
      },
      to: {
        opacity: '0',
      },
    },

    // # Components
    snackBarIn: {
      from: {
        opacity: '0',
      },
      to: {
        opacity: '1',
      },
    },
    snackBarOut: {
      from: {
        opacity: '1',
      },
      to: {
        opacity: '0',
      },
    },
  },
  animation: {
    appear: 'appear 500ms ease-out both',
    fadeInSlide: 'fadeInSlide 500ms ease-out both',
    zoomSlideIn: 'zoomSlideIn 500ms ease both',
    zoomFadeIn: 'zoomFadeIn 500ms ease both',
    fadeIn: 'fadeIn 500ms linear both',
    fadeOutSlide: 'fadeOutSlide 500ms ease-in both',
    zoomSlideOut: 'zoomSlideOut 500ms ease both',
    zoomFadeOut: 'zoomFadeOut 500ms ease both',
    fadeOut: 'fadeOut 500ms linear both',

    snackBarIn: 'snackBarIn 150ms ease-in both',
    snackBarOut: 'snackBarOut 300ms ease-out both',
  },
};
