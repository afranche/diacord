import { DEFAULT_CONFIG_FILE } from "../constants/constants"
import defaultValue from "../decorators/defaultValue"
import description from "../decorators/description"
import parameter from "../decorators/parameter"
import FileArgument from "../lib/FileArgument"

@parameter("configuration", "c")
@description("Path to the configuration file")
@defaultValue(DEFAULT_CONFIG_FILE)
export default class ConfigurationArgument extends FileArgument {}
