import yargs from "yargs"
import { IArgumentable } from "../decorators/argument"
import { IDescriptable } from "../decorators/description"
import { INameable } from "../decorators/name"
import BaseArgument, { IArgument } from "./BaseArgument"

export interface ICommand extends INameable, IDescriptable, IArgumentable {
  handler(yargs: yargs.ArgumentsCamelCase<any>): Promise<void>
}

export default abstract class BaseCommand implements ICommand {
  public readonly arguments: Record<string, IArgument> = {}

  public get name(): string {
    throw new Error("Your command must use the '@name' decorator to set a name")
  }

  public get description(): string {
    throw new Error(
      "Your command must use the '@description' decorator to set a description"
    )
  }

  public builder(yargs: yargs.Argv) {
    for (const [_, argument] of Object.entries(this.arguments)) {
      argument.apply(yargs)
    }
  }

  public abstract handler(yargs: yargs.ArgumentsCamelCase<any>): Promise<void>

  public arg<T>(label: string, yargs: yargs.ArgumentsCamelCase<any>): T {
    return this.arguments[label].getValue(yargs) as T
  }
}
