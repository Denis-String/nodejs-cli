import * as fs from 'fs';
import * as path from 'path';

import { addJsonDependencies } from '../../../utils/json';
import { addEsmImport, addEsmDefaultExport } from '../../../utils/esm';

const FILE_NAME = 'observability.ts';

export default async function observability({ projectPath, projectName }: { projectPath: string, projectName: string }) {
  try {
    const configPath = path.join(`${__dirname}/src/packages/mvc/observability/config`, FILE_NAME);
    const userProjectPath = path.join(`${projectPath}/src/plugins`, FILE_NAME);

    const fileContent = fs.readFileSync(configPath, 'utf8');
    const modifiedContent = fileContent.replace(/{{serviceName}}/g, projectName);
    fs.writeFileSync(userProjectPath, modifiedContent, 'utf8');

    addJsonDependencies({
      newDependenciesPath: `${__dirname}/src/packages/mvc/observability/config`,
      oldDependenciesPath: projectPath
    });

    addEsmImport({
      toImport: 'import { initializeMetrics } from \'./observability\';',
      filePath: path.join(projectPath, 'src/plugins', 'initialize.ts'),
    });

    addEsmDefaultExport({
      toExport: 'initializeMetrics',
      filePath: path.join(projectPath, 'src/plugins', 'initialize.ts'),
    });

    // spawnSync('npm', ['install'], {
    //   stdio: 'inherit',
    //   cwd: projectPath
    // });

  } catch (error) {
    console.error('Erro ao configurar observability no projeto:', error);
    throw error;
  }
}
