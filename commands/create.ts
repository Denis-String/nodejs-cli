import * as fs from 'fs';
import * as path from 'path';
import inquirer from 'inquirer';
import { copyTemplate } from '../utils/file';
import implementEslint from '../packages/eslint';
import implementEditorConfig from '../packages/editoconfig';
import implementOpentelemetry from '../packages/opentelemetry';

interface CreateCommandOptions {
  archtype: string;
  projectName: string;
}

// Função principal para criar o projeto
export const createCommand = async (archtype: string, projectName: string) => {
  try {
    let templatePath: string;

    if (archtype === 'mvc') {
      templatePath = path.join(__dirname, '../templates/mvc');
    } else {
      console.log(`Arquétipo ${archtype} não encontrado.`);
      return;
    }

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

    console.log(`Projeto ${projectName} criado com o template ${archtype}`);

    implementEslint({ projectPath })
    implementEditorConfig({ projectPath })
    implementOpentelemetry({ projectPath })

  } catch (error) {
    console.error('Erro ao criar o projeto:', error);
  }
};
