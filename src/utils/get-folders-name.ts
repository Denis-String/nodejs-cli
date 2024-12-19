
import * as fs from 'fs';
import * as path from 'path';

export function getFoldersName({ exactlyPath }: { exactlyPath: string }) {
  try {
    const files = fs.readdirSync(exactlyPath);

    const archetypes = files.filter(file => fs.statSync(path.join(exactlyPath, file)).isDirectory());

    return archetypes;
  } catch (err) {
    console.error('Erro ao ler a pasta templates:', err);
    return [];
  }
}
