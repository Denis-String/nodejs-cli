import * as fs from 'fs';

interface UpdateJsonParams {
  filePath: string;
  key: string;
  newValue: string;
}

export async function updateJsonFile({ filePath, key, newValue }: UpdateJsonParams): Promise<void> {
  const fileContent = await fs.promises.readFile(filePath, 'utf8');

  const jsonData = JSON.parse(fileContent);

  if (Object.prototype.hasOwnProperty.call(jsonData, key)) {
    jsonData[key] = newValue;
  } else {
    throw new Error(`Key "${key}" não encontrada no arquivo`);
  }

  await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');

}
