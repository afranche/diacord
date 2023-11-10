import { Action } from "../types/Action"
import IStructure from "./IStructure"
import { TextChannel as DjsTextChannel } from "discord.js"

const type = "TextChannel"
export type TextChannelDataProperties = {
    name: string
    nsfw: boolean
    parentId: string
}

export type TextChannelDataKeys = keyof TextChannelDataProperties

export interface ITextChannelData extends IStructure {
  type: typeof type
  properties: TextChannelDataProperties
}

export default class TextChannel {
  public static type: string = type

  public readonly id: string
  public readonly type: string
  public readonly name: string
  public readonly nsfw: boolean
  public readonly parentId: string

  public constructor(data: ITextChannelData) {
    this.id = data.id
    this.type = data.type
    this.name = data.properties.name
    this.nsfw = data.properties.nsfw
    this.parentId = data.properties.parentId
  }

  /**
   * Get the differences between this channel and the existing channel.
   * @param channel The existing channel
   * @returns An array containing the keys of the values that have changed
   */
  public differences(channel: DjsTextChannel | null) {
    return {
      name: channel ? this.name === channel.name : true,
      nsfw: channel ? this.nsfw === channel.nsfw : true,
      parent: channel ? this.parentId === channel.parentId : true
    }
  }

  /**
   * Get the string representation of the channel dependent on the action taking place
   * @param action The action taking place
   * @param differences The keys that are changing if the action is "UPDATE"
   */
  public toString(action: Action, differences: TextChannelDataKeys[] = []): string {
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
      `TextChannel '${this.name}' {`
    )

    // Display properties
    const allProperties = this.differences(null)
    const allPropertyKeys = Object.keys(allProperties) as TextChannelDataKeys[]

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

  public static isTextChannel(structure: IStructure): structure is ITextChannelData {
    return structure.type === TextChannel.type
  }

  public static parse(data: ITextChannelData): TextChannel {
    return new TextChannel(data)
  }
}
