import * as fs from 'fs';
import inquirer from 'inquirer';
import * as path from 'path';
import { spawnSync } from 'child_process';

const FILE_NAME = 'eslint.config.mjs';

export default async function eslint({ projectPath }: { projectPath: string }) {
  try {
    const eslintConfigPath = path.join(`${__dirname}/src/packages/eslint/config`, FILE_NAME);
    const projectEslintConfigPath = path.join(projectPath, FILE_NAME);

    if (fs.existsSync(projectEslintConfigPath)) {
      const answer = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `O arquivo ${FILE_NAME} já existe. Deseja sobrescrevê-lo?`,
          default: false,
        },
      ]);

      if (!answer.overwrite) return;
    }

    fs.copyFileSync(eslintConfigPath, projectEslintConfigPath);

    const projectPackageJsonPath = path.join(projectPath, 'package.json');

    const projectPackageJson = JSON.parse(fs.readFileSync(projectPackageJsonPath, 'utf-8'));

    const scriptPackageJsonPath = path.join(`${__dirname}/src/packages/eslint/config`, 'package.json');

    const scriptPackageJson = JSON.parse(fs.readFileSync(scriptPackageJsonPath, 'utf-8'));

    const mergedDevDependencies = {
      ...projectPackageJson.devDependencies,
      ...scriptPackageJson.devDependencies,
    };

    projectPackageJson.devDependencies = mergedDevDependencies;

    fs.writeFileSync(projectPackageJsonPath, JSON.stringify(projectPackageJson, null, 2));

    spawnSync('npm', ['install'], {
      stdio: 'inherit',
      cwd: projectPath
    });

  } catch (error) {
    console.error('Erro ao configurar ESLint no projeto:', error);
  }
}
