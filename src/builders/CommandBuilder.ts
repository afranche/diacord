import yargs from "yargs"
import { Command } from "../types/Command"
import { hideBin } from "yargs/helpers"
import CommandInvalidError from "../errors/CommandInvalidError"

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
  public addCommand<T>(command: Command<T>) {
    if (!command.name) throw new CommandInvalidError("name")
    if (!command.description) throw new CommandInvalidError("description")
    if (!command.handler) throw new CommandInvalidError("handler")

    this.yargs.command(
      command.name,
      command.description,
      command.builder ?? ((() => {}) as yargs.BuilderCallback<T, T>),
      command.handler
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
