import { Command } from './command.interface.js';
import chalk from 'chalk';

// --help - выводит информацию о списке поддерживаемых команд.

export class HelpCommand implements Command {
  constructor (
    private readonly name = '--help',
  ) {}

  public getName(): string {
    return this.name;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${chalk.bold.blue('Программа для подготовки данных для REST API сервера.')}

        ${chalk.bold.green('Пример:')} ${chalk.bgRgb(240, 255, 230)('cli.js --<command> [--arguments]')}

        ${chalk.bold.green('Команды:')}
            ${chalk.bold.blueBright('--version: ')}                  ${chalk.gray('# выводит номер версии')}
            ${chalk.bold.blueBright('--help: ')}                     ${chalk.gray('# помощь')}
            ${chalk.bold.blueBright('--import <path>: ')}            ${chalk.gray('# импортирует данные из TSV')}
    `);
  }
}
