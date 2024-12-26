import * as fs from 'fs';
import * as path from 'path';

import { getJsonProperty } from '../utils/json';

export const isSicoobBoilerplateProject = ({ projectPath }: { projectPath: string }) => {
  const packageJsonPath = path.join(projectPath, 'package.json');

  if (fs.existsSync(packageJsonPath)) {
    const property = getJsonProperty({ filePath: path.join(projectPath, 'package.json'), property: 'sicoob-archetype' });
    return property ?? false;
  }

  return false;
};
