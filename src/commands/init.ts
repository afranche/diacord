import { DEFAULT_CONFIG_FILE } from "../constants/constants"
import { Command } from "../types/Command"
import file from "../lib/oldfile"
import ConfigStrategyProvider, {
  SupportedConfigType,
  supportedConfigTypes
} from "../strategies/config/ConfigStrategyProvider"
import AlreadyConfiguredError from "../errors/AlreadyConfiguredError"
import messages from "../constants/messages"

type InitArgs = {
  configuration: string
  type: SupportedConfigType
}

const f = file(
  ["configuration", "c"],
  "Path to the configuration file",
  DEFAULT_CONFIG_FILE
)

export default <Command<InitArgs>>{
  name: "init",
  description: "Prepare your working directory for other commands",
  builder: args => {
    f.apply(args)

    args.option("type", {
      alias: "t",
      type: "string",
      description: "Type of configuration file to create",
      default: "json",
      choices: supportedConfigTypes
    })
  },
  handler: async args => {
    const filePath = f.path(args)
    const type = args.type
    const configStrategy = ConfigStrategyProvider.getStrategy(type)

    // Prevent command running when already configured
    const isConfigured = await configStrategy.isConfigured(filePath)
    if (isConfigured) throw new AlreadyConfiguredError()

    await configStrategy.initialize(filePath)
    console.log(messages.init.success)
  }
}
