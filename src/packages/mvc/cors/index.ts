import * as fs from 'fs';
import * as path from 'path';

import { addJsonDependencies } from '../../../utils/add-json-dependencies';
import { addEsmImport } from '../../../utils/add-esm-import';
import { addEsmDefaultExport } from '../../../utils/add-esm-default-export';

const FILE_NAME = 'cors.ts';

export default async function observability({ projectPath }: { projectPath: string }) {
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
}
