import * as path from 'path';
import inquirer from 'inquirer';

import implementEslint from '../packages/eslint';
import implementEditorConfig from '../packages/editorconfig';
import implementGitignore from '../packages/gitignore';

import { copyTemplate } from '../utils/file';
import { getArchetypes } from '../utils/archetype';
import { updateJsonFile } from '../utils/json';

export const initCommand = async (archetype: string, projectName: string) => {
  try {
    if (!getArchetypes().includes(archetype)) return console.log(`${archetype} não disponível`);

    const templatePath = path.join(__dirname, `src/templates/${archetype}`);
    const projectPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath)) {
      const answer = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `O diretório ${projectName} já existe. Deseja sobrescrevê-lo?`,
          default: false,
        },
      ]);

      if (!answer.overwrite) {
        console.log('Operação cancelada.');
        return;
      }
    }

    copyTemplate(templatePath, projectPath);
    updateJsonFile({
      filePath: path.join(projectPath, 'package.json'),
      key: 'name',
      newValue: projectName
    });

    implementEslint({ projectPath });
    implementEditorConfig({ projectPath });
    implementGitignore({ projectPath });
  } catch (error) {
    console.error('Erro ao criar o projeto:', error);
    throw error;
  }
};
