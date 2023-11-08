import choices from "../decorators/choices"
import defaultValue from "../decorators/defaultValue"
import description from "../decorators/description"
import parameter from "../decorators/parameter"
import StringArgument from "../lib/StringArgument"
import { supportedConfigTypes } from "../strategies/config/ConfigStrategyProvider"

@parameter("preset", "p")
@description("Type of configuration file to create")
@defaultValue(supportedConfigTypes[0])
@choices(supportedConfigTypes)
export default class ConfigurationTypeArgument extends StringArgument {}
