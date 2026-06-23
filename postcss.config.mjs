const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    'postcss-flexbugs-fixes': {},
    'postcss-import': {}, // Helps resolve @import rules early
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 1, // Stage 1 polyfills CSS Layers and nesting which v4 uses heavily
      features: {
        'nesting-rules': true,
        'custom-properties': true, // Flattens variables for older browsers
        'cascade-layers': true, // THIS IS KEY FOR TAILWIND V4
      },
    },
    autoprefixer: {}, // This is vital for older Safari/Chrome versions to handle flexbox and other modern CSS features correctly
  },
};

export default config;
 