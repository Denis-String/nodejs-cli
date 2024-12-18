import * as fs from 'fs';
import * as path from 'path';
import { parse, parseExpression } from '@babel/parser';
//@ts-ignore
import generator from '@babel/generator';

const FILE_NAME = 'opentelemetry.ts';

export default async function eslint({ projectPath }: { projectPath: string }) {
  const eslintConfigPath = path.join(`${__dirname}/src/packages/mvc/opentelemetry/config`, FILE_NAME);
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

  const scriptPackageJsonPath = path.join(`${__dirname}/src/packages/mvc/opentelemetry/config`, 'package.json');

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
      const fileContent = fs.readFileSync(initializeFilePath, 'utf8');

      const ast = parse(fileContent, {
        sourceType: 'module',
        plugins: ['typescript'],
      });

      const importNode = parse(`import { initializeMetrics } from './opentelemetry';`, { sourceType: 'module' }).program.body[0];
      ast.program.body.unshift(importNode);

      const exportNode = ast.program.body.find(node =>
        node.type === 'ExportDefaultDeclaration'
      );

      if (exportNode) {
        const exportValue = exportNode.declaration;
        if (exportValue.type === 'ArrayExpression') {
          exportValue.elements.push(parseExpression('initializeMetrics'));
        }
      }

      const output = generator(ast, {}, fileContent);
      fs.writeFileSync(path.join(projectPath, 'src/plugins', 'initialize.ts'), output.code);


      console.log('ast', ast)
    } else {
      console.log('opentelemetry.ts não encontrado no projeto.');
    }
  }
}
