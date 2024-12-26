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

export function getJsonProperty({
  filePath,
  property
}: {
  filePath: string,
  property: string
}) {

  const packageJson = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return packageJson[property];
}

export async function updateJsonFile({
  filePath,
  key,
  newValue
}: { filePath: string, key: string, newValue: string }): Promise<void> {
  const fileContent = await fs.promises.readFile(filePath, 'utf8');

  const jsonData = JSON.parse(fileContent);

  if (Object.prototype.hasOwnProperty.call(jsonData, key)) {
    jsonData[key] = newValue;
  } else {
    throw new Error(`Key "${key}" não encontrada no arquivo`);
  }

  await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
}
