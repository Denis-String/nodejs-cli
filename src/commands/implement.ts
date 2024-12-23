import { getPackagesByArchetype } from '../utils/get-archetype-packages';
import { isSicoobBoilerplateProject } from '../utils/validations';
import * as path from 'path';

import observability from '../packages/mvc/observability';
import cors from '../packages/mvc/cors';
import { getJsonProperty } from '../utils/get-json-property';

export const implementCommand = async (packageToInstall: string) => {
  try {

    const PROJECT_PATH = process.cwd()
    const PROJECT_NAME = getJsonProperty({ filePath: path.join(PROJECT_PATH, 'package.json'), property: 'name' })

    const archetype = isSicoobBoilerplateProject({ projectPath: PROJECT_PATH })

    if (!archetype)
      return console.error('Comandos de implementação precisam ser executados na raiz do seu projeto.')

    if (!getPackagesByArchetype({ archetype }).includes(packageToInstall))
      return console.error(`${packageToInstall} não disponível para archetype ${archetype}`)

    if (packageToInstall === 'observability') {
      observability({ projectPath: PROJECT_PATH, projectName: PROJECT_NAME })
    }

    if (packageToInstall === 'cors') cors({ projectPath: PROJECT_PATH })

  } catch (error) {
    console.error('Erro ao implementar o pacote:', error);
  }
};
