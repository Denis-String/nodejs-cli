import * as fs from 'fs';
import * as path from 'path';

export function addJsonDependencies({
  newDependenciesPath,
  oldDependenciesPath
}: {
  newDependenciesPath: string,
  oldDependenciesPath: string
}) {

  const projectPackageJsonPath = path.join(oldDependenciesPath, 'package.json');
  const projectPackageJson = JSON.parse(fs.readFileSync(projectPackageJsonPath, 'utf-8'));

  const scriptPackageJsonPath = path.join(newDependenciesPath, 'package.json');
  const scriptPackageJson = JSON.parse(fs.readFileSync(scriptPackageJsonPath, 'utf-8'));

  const mergedDependencies = {
    ...projectPackageJson.dependencies,
    ...scriptPackageJson.dependencies,
  };

  projectPackageJson.dependencies = mergedDependencies;

  fs.writeFileSync(projectPackageJsonPath, JSON.stringify(projectPackageJson, null, 2));
}
