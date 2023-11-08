import yargs from "yargs"
import BaseCommand from "../lib/BaseCommand"
import File from "../models/File"
import ConfigStrategyProvider from "../strategies/config/ConfigStrategyProvider"
import messages from "../constants/messages"
import { argument, description, name } from "../decorators"
import { ConfigurationArgument } from "../arguments"

@name("validate")
@description("Check whether the configuration is valid")
@argument("config", ConfigurationArgument)
export default class ValidateCommand extends BaseCommand {
  public override async handler(
    yargs: yargs.ArgumentsCamelCase<any>
  ): Promise<void> {
    const config = this.arg<File>("config", yargs)
    const configType = ConfigStrategyProvider.parseTypeFromFilePath(config.path)
    const configStrategy = ConfigStrategyProvider.getStrategy(configType)

    // TODO: Implement
  }
}
