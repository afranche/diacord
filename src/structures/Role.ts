import { Action } from "../types/Action"
import IStructure from "./IStructure"
import { Role as DjsRole } from "discord.js"

const type = "role"

export type RoleDataProperties = {
  name: string
  color?: string
  hoist?: boolean
  mentionable?: boolean
}

export type RoleDataKeys = keyof RoleDataProperties

export interface IRoleData extends IStructure {
  type: typeof type
  properties: RoleDataProperties
}

export default class Role {
  public static type: string = type

  public readonly id: string
  public readonly type: string
  public readonly name: string
  public readonly color?: string
  public readonly hoist: boolean
  public readonly mentionable: boolean

  public constructor(data: IRoleData) {
    this.id = data.id
    this.type = data.type
    this.name = data.properties.name
    this.color = data.properties.color
    this.hoist = data.properties.hoist ?? false
    this.mentionable = data.properties.mentionable ?? false
  }

  /**
   * Get the differences between this role and the existing role.
   * @param role The existing role
   * @returns An array containing the keys of the values that have changed
   */
  public differences(role: DjsRole | null) {
    return {
      name: role ? this.name === role.name : true,
      color: role ? this.color === role.hexColor : true,
      hoist: role ? this.hoist === role.hoist : true,
      mentionable: role ? this.mentionable === role.mentionable : true
    }
  }

  /**
   * Get the string representation of the role dependent on the action taking place
   * @param action The action taking place
   * @param differences The keys that are changing if the action is "UPDATE"
   */
  public toString(action: Action, differences: RoleDataKeys[] = []): string {
    let string = ""

    function addLine(action: Action, line: string) {
      let str = ""

      // Add marker to string
      switch (action) {
        case "CREATE":
          str += "+"
          break
        case "UPDATE":
          str += "~"
          break
        case "NONE":
          str += " "
      }

      str += " "

      // Concatenate and return string
      return str + line + "\n"
    }

    // Add item title
    string += addLine(
      action === "CREATE" ? "CREATE" : "NONE",
      `Role '${this.name}' {`
    )

    // Display properties
    const allProperties = this.differences(null)
    const allPropertyKeys = Object.keys(allProperties) as RoleDataKeys[]

    for (const property of allPropertyKeys) {
      let value = this[property]

      const act = differences.includes(property)
        ? "UPDATE"
        : action === "CREATE"
        ? "CREATE"
        : "NONE"

      if (typeof value === "string") value = `'${value}'`
      string += addLine(act, `   ${property} = ${value}`)
    }

    // Add closing bracket
    string += addLine(action === "CREATE" ? "CREATE" : "NONE", "}")
    return string
  }

  public static isRole(structure: IStructure): structure is IRoleData {
    return structure.type === Role.type
  }

  public static parse(data: IRoleData): Role {
    return new Role(data)
  }
}
