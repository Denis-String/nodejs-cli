import { isSicoobBoilerplateProject } from '../utils/validations';
import * as path from 'path';

import { getJsonProperty } from '../utils/get-json-property';
import implementPackages from '../packages'

export const implementCommand = async (packageToInstall: string) => {
  try {
    const PROJECT_PATH = process.cwd()
    const PROJECT_NAME = getJsonProperty({ filePath: path.join(PROJECT_PATH, 'package.json'), property: 'name' })
    const ARCHETYPE = isSicoobBoilerplateProject({ projectPath: PROJECT_PATH })

    if (!ARCHETYPE)
      return console.error('Comandos de implementação precisam ser executados na raiz do seu projeto.')

    if (!implementPackages[ARCHETYPE]?.[packageToInstall])
      return console.error(`${packageToInstall} não disponível para archetype ${ARCHETYPE}`)

    return await implementPackages[ARCHETYPE][packageToInstall]({
      projectPath: PROJECT_PATH,
      projectName: PROJECT_NAME
    })

  } catch (error) {
    console.error('Erro ao implementar o pacote:', error);
  }
};
