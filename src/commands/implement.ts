import { getPackagesByArchetype } from '../utils/get-archetype-packages';
import implementOpentelemetry from '../packages/mvc/observability';
import { isSicoobBoilerplateProject } from '../utils/validations';

export const implementCommand = async (packageToInstall: string) => {
  try {

    const archetype = isSicoobBoilerplateProject({ projectPath: process.cwd() })

    if (!archetype)
      return console.error('Comandos de implementação precisam ser executados na raiz do seu projeto.')

    if (!getPackagesByArchetype({ archetype }).includes(packageToInstall))
      return console.error(`${packageToInstall} não disponível para archetype ${archetype}`)

    implementOpentelemetry({ projectPath: process.cwd() })
  } catch (error) {
    console.error('Erro ao implementar o pacote:', error);
  }
};
