import yargs from "yargs"
import DiscordClientFactory from "../factories/DiscordClientFactory"
import { configDotenv } from "dotenv"

export const BOT_FROM_DOTENV_PREFIX = "env:"

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
      const arg = args["token"] as string
      let token: string

      if (arg.startsWith(BOT_FROM_DOTENV_PREFIX)) {
        configDotenv()

        const envVariable = arg.replace(BOT_FROM_DOTENV_PREFIX, "")
        const envToken = process.env[envVariable]

        if (!envToken)
          throw new Error(
            `Cannot find Discord bot token stored in environment variable '${envVariable}'`
          )

        token = envToken
      } else {
        token = arg
      }

      const factory = new DiscordClientFactory()
      return await factory.createClient(token)
    }
  }
}
