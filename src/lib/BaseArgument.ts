import { IParameterable } from "../decorators/parameter"
import { IDescriptable } from "../decorators/description"
import { IDefaultable } from "../decorators/defaultValue"
import { IRequireable } from "../decorators/required"
import yargs from "yargs"
import { IChoosable } from "../decorators/choices"
import { Arg } from "../types/Arg"
import ArgumentDecoratorError from "../errors/ArgumentDecoratorError"

export interface IArgument<T = unknown>
  extends IParameterable,
    IDescriptable,
    IDefaultable,
    IRequireable,
    IChoosable {
  apply: (yargs: yargs.Argv) => void
  getValue: (yargs: yargs.ArgumentsCamelCase<any>) => T
  as: <T extends BaseArgument<unknown>>() => T
}

export default abstract class BaseArgument<T> implements IArgument<T> {
  protected readonly _parameter?: string
  protected readonly _alias?: string
  protected readonly _description?: string

  public readonly type: Arg

  public readonly required: boolean = false
  public readonly defaultValue?: string
  public readonly choices?: string[]

  public constructor(type: Arg) {
    this.type = type
  }

  public as<T extends BaseArgument<unknown>>(): T {
    return this as unknown as T
  }

  public apply(yargs: yargs.Argv) {
    yargs.option(this.parameter, {
      alias: this.alias,
      description: this.description,
      default: this.defaultValue,
      choices: this.choices,
      requiresArg: this.required,
      type: this.type
    })
  }

  public abstract getValue(yargs: yargs.ArgumentsCamelCase<any>): T

  public get parameter(): string {
    if (!this._parameter) throw new ArgumentDecoratorError("parameter")
    return this._parameter
  }

  public get alias(): string {
    if (!this._alias) throw new ArgumentDecoratorError("alias")
    return this._alias
  }

  public get description(): string {
    if (!this._description) throw new ArgumentDecoratorError("description")
    return this._description
  }

  public static as<T>(type: Arg) {
    const base = BaseArgument as unknown as new (type: Arg) => BaseArgument<T>
    base.bind(null, type)
    return base
  }
}
