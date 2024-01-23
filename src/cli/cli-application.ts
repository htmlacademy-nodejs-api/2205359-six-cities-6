import { Command } from './commands/command.interface.js';
import { CommandParser } from './command-parser.js';

// регистрировать список команд (ранее созданные классы),
// разбирать пользовательский ввод и запускать нужную команду.

type CommandCollection = Record<string, Command>;

export class CLIApplication {
  private commands: CommandCollection = {};

  constructor(
    private readonly defaultCommand: string = '--help'
  ) {}

  // Регистрация списка команд. На вход метод будет принимать массив с командами.
  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) { // Нельзя зарегистрировать две команды с одинаковым именем.
        throw new Error(`Command ${command.getName()} is already registered`);
      }
      this.commands[command.getName()] = command;
    });
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): Command | never {
    if (! this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }

  // метод `processCommand`. Аргументом он получает пользовательский ввод и задействует ранее созданные методы.
  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
