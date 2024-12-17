import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['bin/cli.ts'],
  bundle: true,
  minify: true,
  platform: 'node',
  outfile: 'dist/bin/cli.js',
  tsconfig: './tsconfig.json'
});
