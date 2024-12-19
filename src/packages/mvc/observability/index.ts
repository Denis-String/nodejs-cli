import * as fs from 'fs';
import * as path from 'path';

import { addJsonDependencies } from '../../../utils/add-json-dependencies';
import { addEsmImport } from '../../../utils/add-esm-import';
import { addEsmDefaultExport } from '../../../utils/add-esm-default-export';

const FILE_NAME = 'observability.ts';

export default async function observability({ projectPath }: { projectPath: string }) {
  const corsConfigPath = path.join(`${__dirname}/src/packages/mvc/observability/config`, FILE_NAME);
  const projectConfigPath = path.join(`${projectPath}/src/plugins`, FILE_NAME);

  fs.copyFileSync(corsConfigPath, projectConfigPath);

  addJsonDependencies({
    newDependenciesPath: `${__dirname}/src/packages/mvc/observability/config`,
    oldDependenciesPath: projectPath
  })

  addEsmImport({
    toImport: `import { initializeMetrics } from './observability';`,
    filePath: path.join(projectPath, 'src/plugins', 'initialize.ts'),
  })

  addEsmDefaultExport({
    toExport: 'initializeMetrics',
    filePath: path.join(projectPath, 'src/plugins', 'initialize.ts'),
  })
}
