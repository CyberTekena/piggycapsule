/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B', // Soft Pink / Coral
        primaryLight: '#FF8E8E',
        secondary: '#0A2647', // Deep Navy
        secondaryLight: '#144272',
        accent: '#FFC107', // Gold
        background: '#F9F9F9', // Soft Cream
        surface: '#FFFFFF', // White for cards
        textPrimary: '#1A1A1A', // Dark Grey
        textSecondary: '#666666',
        success: '#4ADE80',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['System'],
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.05)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
};
