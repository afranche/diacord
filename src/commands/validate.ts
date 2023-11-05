import { DEFAULT_CONFIG_FILE } from "../constants/constants"
import file from "../lib/oldfile"
import { Command } from "../types/Command"

type ApplyArgs = {
  file: string
}

const f = file(
  ["configuration", "c"],
  "Path to the configuration file",
  DEFAULT_CONFIG_FILE
)

export default <Command<ApplyArgs>>{
  name: "validate",
  description: "Check whether the configuration is valid",
  builder: args => {
    f.apply(args)
  },
  handler: async args => {
    const json = await f.read(args)
    console.log(json)
  }
}
