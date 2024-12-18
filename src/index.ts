#!/usr/bin/env node

import * as commander from 'commander';
import { createCommand } from './commands/create';
import { implementCommand } from './commands/implement';

const program = new commander.Command();

program
  .version('1.0.0')
  .description('CLI para gerenciar boilerplates');

program
  .command('create <archtype> <projectName>')
  .description('Cria um novo projeto com o boilerplate especificado')
  .action(createCommand);

program
  .command('implement <package>')
  .description('Implementa um pacote no projeto existente')
  .action(implementCommand);

program.parse(process.argv);
