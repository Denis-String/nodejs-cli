const fs = require('fs');
const path = require('path');

// Caminhos para os diretórios de origem
const srcDirs = ['/src/templates', '/src/packages'];
// Diretório de destino base
const destDirBase = path.join(process.cwd(), 'dist/src');

// Função para copiar arquivos e diretórios de forma recursiva
const copyDir = (srcDir, destDir) => {
  // Garantir que o diretório de destino existe
  fs.mkdirSync(destDir, { recursive: true });

  // Ler todos os itens dentro do diretório de origem
  fs.readdirSync(srcDir).forEach(item => {
    const srcPath = path.join(srcDir, item);  // Caminho completo para o item de origem
    const destPath = path.join(destDir, item);  // Caminho completo para o item de destino

    if (fs.lstatSync(srcPath).isDirectory()) {
      // Se for um diretório, copiamos os arquivos e subdiretórios de forma recursiva
      copyDir(srcPath, destPath);
    } else {
      // Se for um arquivo, copia diretamente para o destino
      fs.copyFileSync(srcPath, destPath);
      console.log(`Arquivo ${item} copiado com sucesso!`);
    }
  });
};

// Copiar os conteúdos de 'templates' e 'packages' para 'dist', mantendo a estrutura de pastas
srcDirs.forEach(srcDir => {
  const srcPath = path.join(process.cwd(), srcDir);  // Caminho absoluto para o diretório de origem
  const destPath = path.join(destDirBase, path.basename(srcDir));  // Destino final para cada diretório (templates ou packages)

  // Copiar todo o conteúdo dentro de 'templates' ou 'packages' para dentro de 'dist', mantendo a estrutura
  copyDir(srcPath, destPath);
});

console.log('Arquivos copiados com sucesso!');
