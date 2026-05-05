/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 1. All Keyframes here
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'fade-up': {
  '0%': {
    opacity: '0',
    transform: 'translate3d(0, 60px, 0)', // smoother GPU animation
  },
  '100%': {
    opacity: '1',
    transform: 'translate3d(0, 0, 0)',
  },
}
      },
      // 2. All Animations here
     animation: {
  float: 'float 3s ease-in-out infinite',
  'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
},
      // 3. All Colors here
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        navy: "hsl(var(--navy))",
        "navy-foreground": "hsl(var(--navy-foreground))",
        leaf: "hsl(var(--leaf))",
        "leaf-foreground": "hsl(var(--leaf-foreground))",
        "leaf-soft": "hsl(var(--leaf-soft))",
        "site-bg": "hsl(var(--site-bg))",
        "site-warm": "hsl(var(--site-warm))",
        "site-panel": "hsl(var(--site-panel))",
        sunshine: "hsl(var(--sunshine))",
      },
    },
  },
  plugins: [],
};