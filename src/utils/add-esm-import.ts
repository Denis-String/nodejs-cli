import * as fs from 'fs';
import { parse } from '@babel/parser';
import generator from '@babel/generator';

export function addEsmImport({ filePath, toImport }: { filePath: string, toImport: string }) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const ast = parse(fileContent, { sourceType: 'module', plugins: ['typescript'] });

  const importNode = parse(toImport, { sourceType: 'module' }).program.body[0];
  ast.program.body.unshift(importNode);

  const output = generator(ast, {}, fileContent);

  fs.writeFileSync(filePath, output.code);
}
