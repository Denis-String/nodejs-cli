const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'templates');
const destDir = path.join(process.cwd(), 'dist', 'templates');

console.log('srcDir',)

if (fs.existsSync(srcDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  fs.readdirSync(srcDir).forEach(file => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    fs.copyFileSync(srcFile, destFile);
  });
  console.log('Arquivos de templates copiados com sucesso!');
} else {
  console.log('Nenhum arquivo de templates encontrado.');
}
