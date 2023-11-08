import yargs from "yargs"
import fs from "fs/promises"
import { FileNotFoundError } from "../errors"

/**
 * Helper function to create a file option.
 * @param names The names of the option which are used as parameter and alias
 * @param description The description of the file
 * @param defaultValue The default value for the path to the file
 * @returns An object containing a method to apply to option or attempt to read
 */
export default function file(
  [parameter, alias]: [string, string],
  description: string,
  defaultValue?: string
) {
  return {
    apply: (args: yargs.Argv<any>) => {
      args.option(parameter, {
        alias,
        type: "string",
        description,
        default: defaultValue
      })
    },
    read: async (args: yargs.ArgumentsCamelCase<any>) => {
      try {
        const buffer = await fs.readFile(args[parameter])
        return buffer.toString("utf-8")
      } catch (err) {
        throw new FileNotFoundError(args[parameter])
      }
    },
    path: (args: yargs.ArgumentsCamelCase<any>) => {
      return args[parameter] as string
    }
  }
}
