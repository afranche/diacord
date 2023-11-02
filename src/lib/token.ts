import yargs from "yargs"
import DiscordClientFactory from "../factories/DiscordClientFactory"
import { Client } from "discord.js"

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

      args.demandOption("token")
    },
    read: async (args: yargs.ArgumentsCamelCase<any>) => {
      return args["token"]
    },
    client: async (args: yargs.ArgumentsCamelCase<any>) => {
      const factory = new DiscordClientFactory()
      return await factory.createClient(args["token"])
    }
  }
}
