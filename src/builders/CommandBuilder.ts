import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { ICommand } from "../lib/BaseCommand"

export default class CommandBuilder {
  private readonly yargs: yargs.Argv<any>

  private constructor(args: string[]) {
    this.yargs = yargs(hideBin(args)).demandCommand(1)
  }

  /**
   * Create a new command builder
   * @param args The process args to parse
   * @returns The command builder
   */
  public static init(args: string[]) {
    return new CommandBuilder(args)
  }

  /**
   * Add a command to the CLI.
   * @param command The command to add
   * @returns The command builder
   */
  public add(command: new () => ICommand) {
    const cmd = new command()
    this.yargs.command(
      cmd.name,
      cmd.description,
      args => cmd.builder(args),
      args => cmd.handler(args)
    )
    return this
  }

  /**
   * Start the CLI.
   * @returns The parsed args
   */
  public start() {
    return this.yargs.parse()
  }
}
