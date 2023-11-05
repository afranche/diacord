import { DEFAULT_CONFIG_FILE } from "../constants/constants"
import choices from "../decorators/choices"
import defaultValue from "../decorators/defaultValue"
import description from "../decorators/description"
import parameter from "../decorators/parameter"
import FileArgument from "../lib/FileArgument"
import StringArgument from "../lib/StringArgument"
import { supportedConfigTypes } from "../strategies/config/ConfigStrategyProvider"

@parameter("configuration", "c")
@description("Path to the configuration file")
@defaultValue(DEFAULT_CONFIG_FILE)
export default class ConfigurationArgument extends FileArgument {}

@parameter("type", "t")
@description("Type of configuration file to create")
@defaultValue(supportedConfigTypes[0])
@choices(supportedConfigTypes)
export class ConfigurationTypeArgument extends StringArgument {}
