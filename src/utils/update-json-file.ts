import * as fs from 'fs';

interface UpdateJsonParams {
  filePath: string;
  key: string;
  newValue: any;
}

export async function updateJsonFile({ filePath, key, newValue }: UpdateJsonParams): Promise<void> {
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8');

    const jsonData = JSON.parse(fileContent);

    if (jsonData.hasOwnProperty(key)) {
      jsonData[key] = newValue;
    } else {
      throw new Error(`Key "${key}" não encontrada no arquivo`);
    }

    await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');

  } catch (error) {
    throw error
  }
}
