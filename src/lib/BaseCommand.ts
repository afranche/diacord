import yargs from "yargs"
import { IArgumentable } from "../decorators/argument"
import { IDescriptable } from "../decorators/description"
import { INameable } from "../decorators/name"
import { IArgument } from "./BaseArgument"
import CommandDecoratorError from "../errors/CommandDecoratorError"

export interface ICommand extends INameable, IDescriptable, IArgumentable {
  args: Record<string, IArgument>
  builder: yargs.BuilderCallback<any, any>
  handler: (args: yargs.ArgumentsCamelCase<any>) => void | Promise<void>
  arg<T>(label: string, yargs: yargs.ArgumentsCamelCase<any>): T
}

export default abstract class BaseCommand implements ICommand {
  protected readonly _name?: string
  protected readonly _description?: string

  public readonly args: Record<string, IArgument> = {}
  public readonly required: boolean = false
  public readonly defaultValue?: string
  public readonly choices?: string[]

  public get name(): string {
    if (!this._name) throw new CommandDecoratorError("name")
    return this._name
  }

  public get description(): string {
    if (!this._description) throw new CommandDecoratorError("description")
    return this._description
  }

  public builder(yargs: yargs.Argv) {
    for (const [_, argument] of Object.entries(this.args)) {
      argument.apply(yargs)
    }
  }

  public abstract handler(yargs: yargs.ArgumentsCamelCase<any>): Promise<void>

  public arg<T>(label: string, yargs: yargs.ArgumentsCamelCase<any>): T {
    return this.args[label].getValue(yargs) as T
  }
}
