import { DEFAULT_CONFIG_FILE } from "../constants/constants"
import file from "../lib/file"
import token from "../lib/token"
import { Command } from "../types/Command"

type ApplyArgs = {
  file: string
}

const f = file(
  ["configuration", "c"],
  "Path to the configuration file",
  DEFAULT_CONFIG_FILE
)

const t = token()

export default <Command<ApplyArgs>>{
  name: "apply",
  description: "Create or update infrastructure",
  builder: args => {
    f.apply(args)
    t.apply(args)
  },
  handler: async args => {
    const json = await f.read(args)
    const token = await t.read(args)
    console.log(json, token)
  }
}
