import json from 'rollup-plugin-json';

export default {
  input: './src/index.js',
  output: [
    {
      file: './bin/index.js',
      format: 'cjs',
      banner: '#!/usr/bin/env node',
    },
  ],
  plugins: [json()],
};
