import { Client } from "discord.js"
import description from "../decorators/description"
import parameter from "../decorators/parameter"
import BaseArgument from "../lib/BaseArgument"
import { configDotenv } from "dotenv"
import { EnvironmentVariableNotSetError } from "../errors"
import yargs from "yargs"
import DiscordClientFactory from "../factories/DiscordClientFactory"
import { required } from "../decorators"

@parameter("token", "t")
@description("Your Discord bot token")
@required()
export default class ClientArgument extends BaseArgument.as<Promise<Client>>(
  "string"
) {
  public static readonly BOT_FROM_DOTENV_PREFIX = "env:"

  public override getValue(yargs: yargs.ArgumentsCamelCase<any>) {
    const arg = yargs[this.parameter] as string
    let token: string

    if (arg.startsWith(ClientArgument.BOT_FROM_DOTENV_PREFIX)) {
      configDotenv()

      const envVariable = arg.replace(ClientArgument.BOT_FROM_DOTENV_PREFIX, "")
      const envToken = process.env[envVariable]

      if (!envToken) throw new EnvironmentVariableNotSetError(envVariable)

      token = envToken
    } else {
      token = arg
    }

    const factory = new DiscordClientFactory()
    return factory.createClient(token)
  }
}
