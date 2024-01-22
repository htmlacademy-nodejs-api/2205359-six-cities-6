import { Command } from './command.interface.js';
import { readFileSync } from 'node:fs'; // чтение файлов
import { resolve } from 'node:path'; // преобразует относительный путь в абсолютный
import chalk from 'chalk';

// --version выводит информации о версии приложения

type PackageJSONConfig = {
  version: string;
}

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements Command {
  constructor (
    private readonly filePath = './package.json',
    private readonly name = '--version'
  ) {}

  private readVersion(): string {//                   можно вынести в отдельный класс
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content.');
    }

    return importedContent.version;
  }

  public getName() {
    return this.name;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(`Project version is ${chalk.green(version)}`);
    } catch (error: unknown) {
      console.error(chalk.red(`Failed to read version from ${this.filePath}`));

      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }
}
