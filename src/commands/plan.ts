import { DEFAULT_CONFIG_FILE, DEFAULT_STATE_FILE } from "../constants/constants"
import Json from "../helpers/Json"
import file from "../lib/file"
import token from "../lib/token"
import ConfigStrategyProvider from "../strategies/config/ConfigStrategyProvider"
import Role, { RoleDataKeys } from "../structures/Role"
import { Action } from "../types/Action"
import { Command } from "../types/Command"
import { State } from "../types/State"

type PlanArgs = {
  file: string
  token: string
}

const f = file(
  ["configuration", "c"],
  "Path to the configuration file",
  DEFAULT_CONFIG_FILE
)

const s = file(
  ["state", "s"],
  "Path to the current state file",
  DEFAULT_STATE_FILE
)

const t = token()

export default <Command<PlanArgs>>{
  name: "plan",
  description: "Show changes required by the current configuration",
  builder: args => {
    f.apply(args)
    s.apply(args)
    t.apply(args)
  },
  handler: async args => {
    const rawConfigType = f.path(args).split(".").pop() ?? ""
    const configType = ConfigStrategyProvider.parseType(rawConfigType)
    const configStrategy = ConfigStrategyProvider.getStrategy(configType)

    // Fetch configuration and state
    const rawContent = await f.read(args)
    const content = configStrategy.parse(rawContent)

    const rawState = await s.read(args)
    const state = Json.deserialize<State>(rawState)

    // Setup bot client
    const client = await t.client(args)

    const guild = await client.guilds.fetch(content.parameters.guildId)

    // Plan roles
    const existingRoles = await guild.roles.fetch()
    const contentRoles = content.resources.filter(Role.isRole).map(Role.parse)
    const stateRoles = state.mappings.filter(mapping =>
      contentRoles.some(role => role.id == mapping.id)
    )

    console.log("\nThe following modifications have been planned:\n")

    for (const contentRole of contentRoles) {
      // Search state for matching role
      let action: Action = "CREATE"
      let differences: RoleDataKeys[] = []

      for (const stateRole of stateRoles) {
        // Find the correct state for the content role
        if (stateRole.id != contentRole.id) continue

        // Check if the role exists yet
        const existingRole = existingRoles.find(
          existingRole => existingRole.id == stateRole.snowflake
        )

        if (!existingRole) break

        // Check if the content role and the existing role are identical
        const values: Record<string, boolean> =
          contentRole.differences(existingRole)

        differences = Object.keys(values).filter(
          key => !values[key]
        ) as RoleDataKeys[]

        if (differences.length > 0) action = "UPDATE"
      }

      // Log action to take
      console.log(contentRole.toString(action, differences))
    }

    console.log("To apply these changes, run 'diacord apply'\n")

    client.destroy()
  }
}
