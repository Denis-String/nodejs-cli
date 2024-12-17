import * as fs from 'fs';
import * as path from 'path';

export function copyTemplate(src: string, dest: string): void {
  // Cria o diretório de destino, se não existir
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);

  // Itera sobre os arquivos do template
  files.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    // Se for diretório, recursivamente copia o conteúdo
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyTemplate(srcPath, destPath);
    } else {
      // Se for arquivo, copia o arquivo para o destino
      fs.copyFileSync(srcPath, destPath);
    }
  });
}
