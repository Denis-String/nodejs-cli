import * as fs from 'fs';
import * as path from 'path';

const FILE_NAME = '.editorconfig'

export default function editorConfig({ projectPath }: { projectPath: string }) {
  try {
    const eslintConfigPath = path.join(__dirname, FILE_NAME);
    const projectEslintConfigPath = path.join(projectPath, FILE_NAME);

    if (!fs.existsSync(projectEslintConfigPath)) {
      fs.copyFileSync(eslintConfigPath, projectEslintConfigPath);
      console.log(`Arquivo ${FILE_NAME} copiado com sucesso para o projeto.`);
    } else {
      console.log(`Arquivo ${FILE_NAME} já existe no projeto.`);
    }

    console.log(`${FILE_NAME} implementado com sucesso`);
  } catch (error) {
    console.error('Erro ao configurar ESLint no projeto:', error);
  }
}
