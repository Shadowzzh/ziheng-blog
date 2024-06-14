import type { Config } from 'tailwindcss';
import tailwindTypography from '@tailwindcss/typography';
import svgToDataUri from 'mini-svg-data-uri';
// import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';
import { fontFamily } from 'tailwindcss/defaultTheme';

// function addVariablesForColors({ addBase, theme }: any) {
//   const allColors = flattenColorPalette(theme('colors'));
//   let newVars = Object.fromEntries(
//     Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
//   );

//   addBase({
//     ':root': newVars
//   });
// }

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px'
    }
  },
  extend: {
    fontFamily: {
      sans: ['var(--font-sans)', ...fontFamily.sans]
    },
    colors: {
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))'
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))'
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))'
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))'
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))'
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))'
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))'
      }
    },
    maxWidth: {
      '8xl': '90rem'
    },
    width: {
      '8xl': '90rem'
    },
    boxShadow: {
      island: `var(--island)`
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)'
    },
    keyframes: {
      float: {
        '0%': {
          // transform: 'translate(-10%, 10%) ',
          transform: 'translateY(0%)'
        },
        '33%': {
          transform: 'translateY(10%)'
        },
        '66%': {
          transform: 'translateY(0%)'
        },
        '100%': {
          transform: 'translateY(-10%)'
        }
      },
      spin: {
        '0%': {
          rotate: '0deg'
        },
        '15%, 35%': {
          rotate: '90deg'
        },
        '65%, 85%': {
          rotate: '270deg'
        },
        '100%': {
          rotate: '360deg'
        }
      },
      marquee: {
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(calc(-50% - var(--gap)/2))' }
      },
      slide: {
        to: {
          transform: 'translate(calc(100cqw - 100%), 0)'
        }
      },
      meteor: {
        '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
        '70%': { opacity: '1' },
        '100%': {
          transform: 'rotate(215deg) translateX(-500px)',
          opacity: '0'
        }
      },
      scroll: {
        to: {
          transform: 'translate(calc(-50% - 0.5rem))'
        }
      }
    },
    transitionTimingFunction: {
      'out-expo': 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
      'out-quart': 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
      'out-circ': 'cubic-bezier(0.075, 0.82, 0.165, 1)'
    },
    transitionDuration: {
      '1500': '1500ms',
      '2000': '2000ms',
      '3000': '3000ms',
      '5000': '5000ms'
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
      spinLinear: 'spin calc(var(--speed) * 2) infinite linear',
      slide: 'slide var(--speed) ease-in-out infinite alternate',
      marquee: 'marquee var(--duration) linear infinite',
      'meteor-effect': 'meteor 5s linear infinite',
      scroll:
        'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite'
    }
  },

  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: [
    tailwindTypography,
    require('tailwindcss-animate')
    // addVariablesForColors,
    // function ({ matchUtilities, theme }: any) {
    //   matchUtilities({ values: flattenColorPalette(theme('backgroundColor')), type: 'color' });
    // }
  ]
};
export default config;
