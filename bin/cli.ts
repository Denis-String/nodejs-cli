import * as commander from 'commander';
import { createCommand } from '../commands/create';

const program = new commander.Command();

program
  .version('1.0.0')
  .description('CLI para gerenciar boilerplates');

program
  .command('create <archtype> <projectName>')
  .description('Cria um novo projeto com o boilerplate especificado')
  .action(createCommand);

program.parse(process.argv);
