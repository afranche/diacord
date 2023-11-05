import yargs from "yargs"
import ConfigurationArgument, {
  ConfigurationTypeArgument
} from "../arguments/ConfigurationArgument"
import argument from "../decorators/argument"
import description from "../decorators/description"
import name from "../decorators/name"
import BaseCommand from "../lib/BaseCommand"
import File from "../lib/File"
import ConfigStrategyProvider, {
  SupportedConfigType
} from "../strategies/config/ConfigStrategyProvider"
import AlreadyConfiguredError from "../errors/AlreadyConfiguredError"
import messages from "../constants/messages"

@name("init")
@description("Prepare your working directory for other commands")
@argument("config", ConfigurationArgument)
@argument("type", ConfigurationTypeArgument)
export default class InitCommand extends BaseCommand {
  public override async handler(
    yargs: yargs.ArgumentsCamelCase<any>
  ): Promise<void> {
    const file = this.arg<File>("config", yargs)
    const type = this.arg<SupportedConfigType>("type", yargs)
    const strategy = ConfigStrategyProvider.getStrategy(type)

    // Prevent command running when already configured
    const isConfigured = await strategy.isConfigured(file.path)
    if (isConfigured) throw new AlreadyConfiguredError()

    await strategy.initialize(file.path)
    console.log(messages.init.success)
  }
}
