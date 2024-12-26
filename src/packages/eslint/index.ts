import * as fs from 'fs';
import inquirer from 'inquirer';
import * as path from 'path';
import { addJsonDependencies } from '../../utils/add-json-dependencies';

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

    addJsonDependencies({
      newDependenciesPath: `${__dirname}/src/packages/eslint/config`,
      oldDependenciesPath: projectEslintConfigPath
    });

    // spawnSync('npm', ['install'], {
    //   stdio: 'inherit',
    //   cwd: projectPath
    // });

  } catch (error) {
    console.error('Erro ao configurar ESLint no projeto:', error);
    throw error;
  }
}
