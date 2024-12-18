import * as fs from 'fs';
import * as path from 'path';

export function copyTemplate(src: string, dest: string): void {

  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const files = fs.readdirSync(src);

  files.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyTemplate(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}
