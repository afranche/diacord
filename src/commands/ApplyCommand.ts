import yargs from "yargs"
import BaseCommand from "../lib/BaseCommand"
import File from "../models/File"
import ConfigStrategyProvider from "../strategies/config/ConfigStrategyProvider"
import messages from "../constants/messages"
import { argument, description, name } from "../decorators"
import {
  ClientArgument,
  ConfigurationArgument,
  StateArgument
} from "../arguments"
import { Client } from "discord.js"
import StateStrategyProvider from "../strategies/state/StateStrategyProvider"

@name("apply")
@description("Create or update infrastructure")
@argument("config", ConfigurationArgument)
@argument("state", StateArgument)
@argument("client", ClientArgument)
export default class ApplyCommand extends BaseCommand {
  public override async handler(
    yargs: yargs.ArgumentsCamelCase<any>
  ): Promise<void> {
    const config = this.arg<File>("config", yargs)
    const configType = ConfigStrategyProvider.parseTypeFromFilePath(config.path)
    const configStrategy = ConfigStrategyProvider.getStrategy(configType)

    const state = this.arg<File>("state", yargs)
    const stateStrategy = StateStrategyProvider.getStrategy("local")

    const client = await this.arg<Promise<Client>>("client", yargs)

    // TODO: Implement

    client.destroy()
  }
}
