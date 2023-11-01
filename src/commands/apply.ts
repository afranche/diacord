import { DEFAULT_CONFIG_FILE } from "../constants/constants"
import file from "../lib/file"
import { Command } from "../types/Command"

type ApplyArgs = {
  file: string
}

const f = file(
  ["file", "f"],
  "Path to the configuration file",
  DEFAULT_CONFIG_FILE
)

export default <Command<ApplyArgs>>{
  name: "apply",
  description: "Create or update infrastructure",
  builder: args => {
    f.apply(args)
  },
  handler: async args => {
    const json = await f.read(args)
    console.log(json)
  }
}