const fs = require('fs');
const path = require('path');

// Caminhos para os diretórios de origem e destino
const srcDirs = ['/src/templates', '/src/packages'];
const destDirBase = path.join(process.cwd(), 'dist');

// Função para copiar arquivos e diretórios recursivamente
const copyDir = (srcDir, destDir) => {
  fs.mkdirSync(destDir, { recursive: true });

  fs.readdirSync(srcDir).forEach(item => {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      // Recursivamente copiar arquivos e subdiretórios
      fs.readdirSync(srcPath).forEach(file => {
        const srcFile = path.join(srcPath, file);
        const destFile = path.join(destPath, file);

        if (fs.lstatSync(srcFile).isDirectory()) {
          fs.mkdirSync(destFile, { recursive: true });
        } else {
          fs.copyFileSync(srcFile, destFile);
          console.log(`Arquivo ${file} copiado com sucesso!`);
        }
      });
    } else {
      // Se for um arquivo, copia diretamente
      fs.copyFileSync(srcPath, destPath);
      console.log(`Arquivo ${item} copiado com sucesso!`);
    }
  });
};

// Copiar templates e package para seus respectivos destinos
srcDirs.forEach(srcDir => {
  const srcPath = path.join(process.cwd(), srcDir);
  const destPath = path.join(destDirBase, srcDir);

  copyDir(srcPath, destPath);
});

console.log('Arquivos copiados com sucesso!');
