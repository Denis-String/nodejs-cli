const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/index.ts'], // Caminho do seu arquivo principal
  bundle: true, // Habilita o bundling (empacotamento)
  minify: false, // Opcional: minifica o código
  platform: 'node', // Indica que é para um ambiente Node.js
  outfile: 'dist/index.js', // Arquivo de saída do bundle
}).catch(() => process.exit(1));
