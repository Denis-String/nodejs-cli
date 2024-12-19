import * as fs from 'fs';
import * as path from 'path';
import inquirer from 'inquirer';
import { copyTemplate } from '../utils/file';
import implementEslint from '../packages/eslint';
import implementEditorConfig from '../packages/editorconfig';
import { getArchetypes } from '../utils/getArchetypes';

export const createCommand = async (archtype: string, projectName: string) => {
  try {
    if (!getArchetypes().includes(archtype)) return console.log(`${archtype} não disponível`)

    console.log('dirname', __dirname)
    console.log('process.cwd()', process.cwd())
    const templatePath = path.join(__dirname, `src/templates/${archtype}`);
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
    implementEslint({ projectPath })
    implementEditorConfig({ projectPath })
  } catch (error) {
    console.error('Erro ao criar o projeto:', error);
  }
};
