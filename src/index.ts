#!/usr/bin/env node

import * as commander from 'commander';
import { createCommand } from './commands/create';
import { implementCommand } from './commands/implement';

const program = new commander.Command();

program
  .version('1.0.0')
  .description('CLI para gerenciar boilerplates');

program
  .command('create')
  .description('Cria um novo projeto com o boilerplate especificado')
  .requiredOption('--arch <arch>', 'Arquitetura a ser usada')
  .requiredOption('--projectName <projectName>', 'Nome do projeto a ser criado')
  .action((options) => {
    const { arch, projectName } = options;
    createCommand(arch, projectName);
  });

program
  .command('implement')
  .description('Implementa um pacote no projeto existente')
  .requiredOption('--package <package>', 'Pacote a ser implementado')
  .action((options) => {
    const { package: packageToInstall } = options;
    implementCommand(packageToInstall);
  });

program.parse(process.argv);
