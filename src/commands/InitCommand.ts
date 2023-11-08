import yargs from "yargs"
import BaseCommand from "../lib/BaseCommand"
import File from "../models/File"
import ConfigStrategyProvider, {
  SupportedConfigType
} from "../strategies/config/ConfigStrategyProvider"
import messages from "../constants/messages"
import { argument, description, name } from "../decorators"
import { AlreadyConfiguredError } from "../errors"
import { ConfigurationArgument, ConfigurationTypeArgument } from "../arguments"

@name("init")
@description("Prepare your working directory for other commands")
@argument("config", ConfigurationArgument)
@argument("type", ConfigurationTypeArgument)
export default class InitCommand extends BaseCommand {
  public override async handler(
    yargs: yargs.ArgumentsCamelCase<any>
  ): Promise<void> {
    // Determine the file type from the file path, or the type argument
    const config = this.arg<File>("config", yargs)

    let configType: SupportedConfigType
    if (config)
      configType = ConfigStrategyProvider.parseTypeFromFilePath(config.path)
    else configType = this.arg<SupportedConfigType>("type", yargs)

    const configStrategy = ConfigStrategyProvider.getStrategy(configType)

    // Prevent command running when already configured
    const isConfigured = await configStrategy.isConfigured(config.path)
    if (isConfigured) throw new AlreadyConfiguredError()

    await configStrategy.initialize(config.path)
    console.log(messages.init.success)
  }
}
