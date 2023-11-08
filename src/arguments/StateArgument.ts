import { DEFAULT_STATE_FILE } from "../constants/constants"
import defaultValue from "../decorators/defaultValue"
import description from "../decorators/description"
import parameter from "../decorators/parameter"
import FileArgument from "../lib/FileArgument"

@parameter("state", "s")
@description("Path to the state file")
@defaultValue(DEFAULT_STATE_FILE)
export default class ConfigurationArgument extends FileArgument {}
