import { getPackagesByArchetype } from '../utils/getPackagesByArcheType';
import implementOpentelemetry from '../packages/mvc/opentelemetry';

export const implementCommand = async (packageToInstall: string) => {
  try {
    if (!getPackagesByArchetype({ archetype: 'mvc' }).includes(packageToInstall))
      return console.error(`${packageToInstall} não disponível`)

    implementOpentelemetry({ projectPath: process.cwd() })
  } catch (error) {
    console.error('Erro ao criar o projeto:', error);
  }
};
