import yargs from "yargs"

export type Command<T = {}> = {
  name: string
  description: string
  builder?: yargs.BuilderCallback<T, T>
  handler: (args: yargs.ArgumentsCamelCase<T>) => void | Promise<void>
}
