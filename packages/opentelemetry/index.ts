import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';

const FILE_NAME = 'opentelemetry.ts';

export default async function eslint({ projectPath }: { projectPath: string }) {
  try {
    const eslintConfigPath = path.join(__dirname, FILE_NAME);
    const projectEslintConfigPath = path.join(`${projectPath}/src/plugins`, FILE_NAME);

    // Verificar se o arquivo já existe no projeto e copiar
    if (!fs.existsSync(projectEslintConfigPath)) {
      fs.copyFileSync(eslintConfigPath, projectEslintConfigPath);
      console.log(`Arquivo ${FILE_NAME} copiado com sucesso para o projeto.`);
    } else {
      console.log(`Arquivo ${FILE_NAME} já existe no projeto.`);
    }

    const projectPackageJsonPath = path.join(projectPath, 'package.json');

    // Verificar se o package.json existe
    if (!fs.existsSync(projectPackageJsonPath)) {
      console.log('package.json não encontrado no projeto.');
      return;
    }

    const projectPackageJson = JSON.parse(fs.readFileSync(projectPackageJsonPath, 'utf-8'));

    const scriptPackageJsonPath = path.join(__dirname, 'package.json');

    const scriptPackageJson = JSON.parse(fs.readFileSync(scriptPackageJsonPath, 'utf-8'));

    // Fazer o merge das dependências
    const mergedDependencies = {
      ...projectPackageJson.dependencies,
      ...scriptPackageJson.dependencies,
    };

    projectPackageJson.dependencies = mergedDependencies;

    fs.writeFileSync(projectPackageJsonPath, JSON.stringify(projectPackageJson, null, 2));

    console.log('Dependências do projeto atualizadas com sucesso.');

    // Passo 1: Verificar se o arquivo opentelemetry.ts existe no projeto
    const opentelemetryFilePath = path.join(projectPath, 'src/plugins', FILE_NAME);

    if (fs.existsSync(opentelemetryFilePath)) {
      // Passo 2: Importar a função `initializeMetrics` de opentelemetry.ts
      const initializeFilePath = path.join(projectPath, 'src/plugins', 'initialize.ts');

      if (fs.existsSync(initializeFilePath)) {
        const fileUrl = pathToFileURL(initializeFilePath).href;
        const { default: modules } = await import(fileUrl)

        modules.push('initializeMetrics')

        let fileContent = fs.readFileSync(initializeFilePath, 'utf-8');
        fileContent = `import { initializeMetrics } from './opentelemetry';\n` + fileContent;

        fileContent = fileContent.replace(
          /\[\s*([^\]]*?)\s*\]/s,
          `[${modules.join(', ')}]`
        );

        fs.writeFileSync(initializeFilePath, fileContent);
      } else {
        console.log('initialize.ts não encontrado no projeto.');
      }
    } else {
      console.log('opentelemetry.ts não encontrado no projeto.');
    }

  } catch (error) {
    console.error('Erro:', error);
  }
}
