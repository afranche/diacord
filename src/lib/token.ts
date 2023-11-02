import yargs from "yargs"

/**
 * Helper function to create require a Discord bot token.
 * @returns An object containing a method to apply to option or read the value
 */
export default function token() {
  return {
    apply: (args: yargs.Argv<any>) => {
      args.option("token", {
        alias: "t",
        type: "string",
        description: "Your Discord bot token",
        requiresArg: true
      })
    },
    read: async (args: yargs.ArgumentsCamelCase<any>) => {
      return args["token"]
    }
  }
}
