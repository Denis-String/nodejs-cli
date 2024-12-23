import * as fs from 'fs';
import * as path from 'path';

import { addJsonDependencies } from '../../../utils/add-json-dependencies';
import { addEsmImport } from '../../../utils/add-esm-import';
import { addEsmDefaultExport } from '../../../utils/add-esm-default-export';

const FILE_NAME = 'observability.ts';

export default async function observability({ projectPath, projectName }: { projectPath: string, projectName: string }) {
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
}
