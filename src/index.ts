#!/usr/bin/env node

import * as commander from 'commander';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';

const program = new commander.Command();

program
  .version('1.0.0')
  .description('CLI para gerenciar boilerplates');

program
  .command('init')
  .description('Inicia um novo projeto com o boilerplate especificado')
  .requiredOption('--arch <arch>', 'Arquitetura a ser usada')
  .requiredOption('--projectName <projectName>', 'Nome do projeto a ser criado')
  .action((options) => {
    const { arch, projectName } = options;
    initCommand(arch, projectName);
  });

program
  .command('add')
  .description('Adiciona um pacote no projeto existente')
  .requiredOption('--package <package>', 'Pacote a ser adicionado')
  .action((options) => {
    const { package: packageToInstall } = options;
    addCommand(packageToInstall);
  });

program.parse(process.argv);
