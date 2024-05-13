import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import multiEntry from '@rollup/plugin-multi-entry';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { glob } from 'glob';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import scss from 'rollup-plugin-scss';

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
      external(),
      resolve(),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/env', '@babel/preset-react'],
        babelHelpers: 'bundled',
      }),
      commonjs(),
      typescript(),
      postcss(),
      json(),
      scss(),
      terser(),
      multiEntry({
        entryFileName: '[name].js',
      }),
    ],
  },
];
