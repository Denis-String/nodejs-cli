import * as fs from 'fs';
import inquirer from 'inquirer';
import * as path from 'path';

const FILE_NAME = '.editorconfig';

export default async function editorConfig({ projectPath }: { projectPath: string }) {
  try {
    const editorconfigConfigPath = path.join(`${__dirname}/src/packages/editorconfig/config`, FILE_NAME);
    const projectEditorconfigConfigPath = path.join(projectPath, FILE_NAME);

    if (fs.existsSync(projectEditorconfigConfigPath)) {
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

    fs.copyFileSync(editorconfigConfigPath, projectEditorconfigConfigPath);

  } catch (error) {
    console.error('Erro ao configurar editorconfig no projeto:', error);
    throw error;
  }
}
