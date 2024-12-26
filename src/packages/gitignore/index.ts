import * as fs from 'fs';
import inquirer from 'inquirer';
import * as path from 'path';

const FILE_NAME = 'gitignore';

export default async function implement({ projectPath }: { projectPath: string }) {
  try {
    const configPath = path.join(`${__dirname}/src/packages/gitignore/config`, FILE_NAME);
    const projectFile = path.join(projectPath, `.${FILE_NAME}`);

    if (fs.existsSync(projectFile)) {
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

    fs.copyFileSync(configPath, projectFile);
  } catch (error) {
    console.error('Erro ao configurar gitignore no projeto:', error);
  }
}
