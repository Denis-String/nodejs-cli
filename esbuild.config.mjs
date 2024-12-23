import * as esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  minify: false,
  platform: 'node',
  outfile: 'dist/index.js',
});
