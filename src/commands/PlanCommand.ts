import yargs from "yargs"
import BaseCommand from "../lib/BaseCommand"
import File from "../models/File"
import ConfigStrategyProvider from "../strategies/config/ConfigStrategyProvider"
import messages from "../constants/messages"
import { argument, description, name } from "../decorators"
import {
  ClientArgument,
  ConfigurationArgument,
  StateArgument
} from "../arguments"
import { Client } from "discord.js"
import StateStrategyProvider from "../strategies/state/StateStrategyProvider"
import Role, { RoleDataKeys } from "../structures/Role"
import { Action } from "../types/Action"

@name("plan")
@description("Show changes required by the current configuration")
@argument("config", ConfigurationArgument)
@argument("state", StateArgument)
@argument("client", ClientArgument)
export default class PlanCommand extends BaseCommand {
  public override async handler(
    yargs: yargs.ArgumentsCamelCase<any>
  ): Promise<void> {
    const configFile = this.arg<File>("config", yargs)
    const configType = ConfigStrategyProvider.parseTypeFromFilePath(
      configFile.path
    )
    const configStrategy = ConfigStrategyProvider.getStrategy(configType)
    const config = configStrategy.parse(await configFile.read())

    const stateFile = this.arg<File>("state", yargs)
    const stateStrategy = StateStrategyProvider.getStrategy("local")
    const state = stateStrategy.parse(await stateFile.read())

    const client = await this.arg<Promise<Client>>("client", yargs)

    // TODO: Refactor everything below this line

    const guild = await client.guilds.fetch(config.parameters.guildId)

    // Plan roles
    const existingRoles = await guild.roles.fetch()
    const contentRoles = config.resources.filter(Role.isRole).map(Role.parse)
    const stateRoles = state.mappings.filter(mapping =>
      contentRoles.some(role => role.id == mapping.id)
    )

    console.log(messages.plan.listPlanned)

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

    console.log(messages.plan.toApply)

    client.destroy()
  }
}
