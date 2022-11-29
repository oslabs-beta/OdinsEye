module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  overrides: [
    {
      test: './vendor/something.umd.js',
      sourceType: 'script',
    },
  ],
};
