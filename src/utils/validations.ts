import * as fs from 'fs';
import * as path from 'path';

export const isSicoobBoilerplateProject = ({ projectPath }: { projectPath: string }) => {
  const packageJsonPath = path.join(projectPath, 'package.json');

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(path.join(projectPath, 'package.json'), 'utf8'));

    return packageJson['sicoob-archetype'] ?? false;
  }

  return false;
};
