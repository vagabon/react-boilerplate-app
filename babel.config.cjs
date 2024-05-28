const ReactCompilerConfig = {};

module.exports = {
  presets: [
    ['@babel/preset-env', { loose: true }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
};
