import { DEFAULT_CONFIG_FILE } from "../constants/constants"
import file from "../lib/file"
import token from "../lib/token"
import { Command } from "../types/Command"

type PlanArgs = {
  file: string
  token: string
}

const f = file(
  ["configuration", "c"],
  "Path to the configuration file",
  DEFAULT_CONFIG_FILE
)

const t = token()

export default <Command<PlanArgs>>{
  name: "plan",
  description: "Show changes required by the current configuration",
  builder: args => {
    f.apply(args)
    t.apply(args)
  },
  handler: async args => {
    const json = await f.read(args)
    const client = await t.client(args)

    console.log("Client successfully created!") // temporary, to indicate working

    client.destroy()
  }
}
