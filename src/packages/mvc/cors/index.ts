import * as fs from 'fs';
import * as path from 'path';

import { addJsonDependencies } from '../../../utils/json';
import { addEsmImport, addEsmDefaultExport } from '../../../utils/esm';

const FILE_NAME = 'cors.ts';

export default async function observability({ projectPath }: { projectPath: string }) {
  try {

    const corsConfigPath = path.join(`${__dirname}/src/packages/mvc/cors/config`, FILE_NAME);
    const projectConfigPath = path.join(`${projectPath}/src/middlewares`, FILE_NAME);

    fs.copyFileSync(corsConfigPath, projectConfigPath);

    addJsonDependencies({
      newDependenciesPath: `${__dirname}/src/packages/mvc/cors/config`,
      oldDependenciesPath: projectPath
    });

    addEsmImport({
      toImport: 'import { cors } from \'./cors\';',
      filePath: path.join(projectPath, 'src/middlewares', 'register.ts'),
    });

    addEsmDefaultExport({
      toExport: 'cors',
      filePath: path.join(projectPath, 'src/middlewares', 'register.ts'),
    });

    // spawnSync('npm', ['install'], {
    //   stdio: 'inherit',
    //   cwd: projectPath
    // });
  } catch (error) {
    console.error('Erro ao configurar cors no projeto:', error);
    throw error;
  }
}
