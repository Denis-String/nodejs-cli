import * as fs from 'fs';

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
