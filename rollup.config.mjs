import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import multiEntry from '@rollup/plugin-multi-entry';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { glob } from 'glob';
import copy from 'rollup-plugin-copy';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import scss from 'rollup-plugin-scss';
const fs = require('fs-extra');

const isDev = process.argv[4] === '--watch';

export function removeDistDirectory(isDev) {
  !isDev && fs.removeSync('dist');
}

const inputFiles = glob.sync('src/**/*.ts*', { ignore: 'src/**/*.stories.tsx' });

export default [
  {
    input: inputFiles,
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
      {
        dir: 'dist',
        format: 'es',
        exports: 'named',
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    onwarn(warning, warn) {
      if (warning.message.includes('preferring built-in module')) return;
      if (warning.code === 'EVAL') return;
      warn(warning);
    },
    plugins: [
      {
        name: 'remove-dist-plugin',
        buildStart() {
          removeDistDirectory(isDev);
        },
      },
      external(),
      resolve(),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/env', '@babel/preset-react'],
        babelHelpers: 'bundled',
      }),
      commonjs(),
      typescript({
        compilerOptions: {
          module: 'esnext',
          declaration: true,
          declarationDir: 'dist',
        },
      }),
      postcss(),
      json(),
      scss(),
      !isDev && terser(),
      multiEntry({
        entryFileName: '[name].js',
      }),
      copy({
        targets: [
          { src: 'src/assets/*', dest: 'dist/assets' },
          { src: 'src/setupTests-*.js', dest: 'dist' },
        ],
      }),
    ],
  },
];
