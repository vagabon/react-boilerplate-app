import tsconfigPaths from 'vite-tsconfig-paths';

import { mergeConfig } from 'vite';

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-jest',
    '@storybook/addon-mdx-gfm',
  ],

  core: {
    builder: '@storybook/builder-vite',
  },

  // https://vitejs.dev/config/build-options.html
  async viteFinal(config) {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        path: require.resolve('path-browserify'),
      },
    };
    config.build = {
      ...config.build,
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        ...config.build?.rollupOptions,
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
          warn(warning);
        },
      },
    };
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
    });
  },

  docs: {
    autodocs: 'tag',
  },

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => (prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true),
    },
  },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};
export default config;
