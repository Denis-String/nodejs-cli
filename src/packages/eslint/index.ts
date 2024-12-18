import * as fs from 'fs';
import * as path from 'path';

const FILE_NAME = 'eslint.config.js'

export default function eslint({ projectPath }: { projectPath: string }) {
  try {
    const eslintConfigPath = path.join(`${process.cwd()}/src/packages/eslint/config`, FILE_NAME);
    const projectEslintConfigPath = path.join(projectPath, FILE_NAME);

    if (!fs.existsSync(projectEslintConfigPath)) {
      fs.copyFileSync(eslintConfigPath, projectEslintConfigPath);
      console.log(`Arquivo ${FILE_NAME} copiado com sucesso para o projeto.`);
    } else {
      console.log(`Arquivo ${FILE_NAME} já existe no projeto.`);
    }

    const projectPackageJsonPath = path.join(projectPath, 'package.json');

    if (!fs.existsSync(projectPackageJsonPath)) {
      console.log('package.json não encontrado no projeto.');
      return;
    }

    const projectPackageJson = JSON.parse(fs.readFileSync(projectPackageJsonPath, 'utf-8'));

    const scriptPackageJsonPath = path.join(`${process.cwd()}/src/packages/eslint/config`, 'package.json');

    const scriptPackageJson = JSON.parse(fs.readFileSync(scriptPackageJsonPath, 'utf-8'));

    const mergedDevDependencies = {
      ...projectPackageJson.devDependencies,
      ...scriptPackageJson.devDependencies,
    };

    projectPackageJson.devDependencies = mergedDevDependencies;

    fs.writeFileSync(projectPackageJsonPath, JSON.stringify(projectPackageJson, null, 2));

    console.log('DevDependencies do projeto atualizadas com sucesso.');
  } catch (error) {
    console.error('Erro ao configurar ESLint no projeto:', error);
  }
}
