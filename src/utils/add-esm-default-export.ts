import * as fs from 'fs';
import { parse, parseExpression } from '@babel/parser';
import generator from '@babel/generator';

export function addEsmDefaultExport({ filePath, toExport }: { filePath: string, toExport: string }) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const ast = parse(fileContent, { sourceType: 'module', plugins: ['typescript'] });

  const exportNode = ast.program.body.find(node => node.type === 'ExportDefaultDeclaration');

  if (exportNode?.declaration?.type !== 'ArrayExpression') throw new Error(`${filePath} has not default export`);

  exportNode.declaration.elements.push(parseExpression(toExport));

  const output = generator(ast, {}, fileContent);

  fs.writeFileSync(filePath, output.code);
}
