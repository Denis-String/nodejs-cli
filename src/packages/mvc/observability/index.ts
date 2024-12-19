import * as fs from 'fs';
import * as path from 'path';
import { parse, parseExpression } from '@babel/parser';
//@ts-ignore
import generator from '@babel/generator';

const FILE_NAME = 'opentelemetry.ts';

export default async function observability({ projectPath }: { projectPath: string }) {
  const eslintConfigPath = path.join(`${__dirname}/src/packages/mvc/observability/config`, FILE_NAME);
  const projectConfigPath = path.join(`${projectPath}/src/plugins`, FILE_NAME);

  fs.copyFileSync(eslintConfigPath, projectConfigPath);

  const projectPackageJsonPath = path.join(projectPath, 'package.json');

  const projectPackageJson = JSON.parse(fs.readFileSync(projectPackageJsonPath, 'utf-8'));

  const scriptPackageJsonPath = path.join(`${__dirname}/src/packages/mvc/observability/config`, 'package.json');

  const scriptPackageJson = JSON.parse(fs.readFileSync(scriptPackageJsonPath, 'utf-8'));

  // Fazer o merge das dependências
  const mergedDependencies = {
    ...projectPackageJson.dependencies,
    ...scriptPackageJson.dependencies,
  };

  projectPackageJson.dependencies = mergedDependencies;

  fs.writeFileSync(projectPackageJsonPath, JSON.stringify(projectPackageJson, null, 2));

  console.log('Dependências do projeto atualizadas com sucesso.');

  const initializeFilePath = path.join(projectPath, 'src/plugins', 'initialize.ts');

  const fileContent = fs.readFileSync(initializeFilePath, 'utf8');

  const ast = parse(fileContent, { sourceType: 'module', plugins: ['typescript'] });

  const importNode = parse(`import { initializeMetrics } from './opentelemetry';`, { sourceType: 'module' }).program.body[0];
  ast.program.body.unshift(importNode);

  const exportNode = ast.program.body.find(node => node.type === 'ExportDefaultDeclaration');

  if (exportNode) {
    const exportValue = exportNode.declaration;
    if (exportValue.type === 'ArrayExpression') {
      exportValue.elements.push(parseExpression('initializeMetrics'));
    }
    const output = generator(ast, {}, fileContent);
    fs.writeFileSync(path.join(projectPath, 'src/plugins', 'initialize.ts'), output.code);
  }
  console.log('ast', ast)
}
