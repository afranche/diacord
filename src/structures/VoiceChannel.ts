import { Action } from "../types/Action"
import IStructure from "./IStructure"
import { VoiceChannel as DjsVoiceChannel } from "discord.js"

const type = "VoiceChannel"
export type VoiceChannelDataProperties = {
    name: string;
    parentId: string;
    nsfw: boolean;
    userLimit: number;
    bitrate: number;
}

export type VoiceChannelDataKeys = keyof VoiceChannelDataProperties

export interface IVoiceChannelData extends IStructure {
  type: typeof type
  properties: VoiceChannelDataProperties
}

export default class VoiceChannel {
  public static type: string = type

  public readonly id: string
  public readonly type: string
  public readonly name: string
  public readonly nsfw: boolean
  public readonly parentId: string
  public readonly userLimit: number
  public readonly bitrate: number

  public constructor(data: IVoiceChannelData) {
    this.id = data.id
    this.type = data.type
    this.name = data.properties.name
    this.nsfw = data.properties.nsfw
    this.parentId = data.properties.parentId
    this.userLimit = data.properties.userLimit
    this.bitrate = data.properties.bitrate
  }

  /**
   * Get the differences between this channel and the existing voice channel.
   * @param channel The existing channel
   * @returns An array containing the keys of the values that have changed
   */
  public differences(channel: DjsVoiceChannel | null) {
    return {
      name: channel ? this.name === channel.name : true,
      nsfw: channel ? this.nsfw === channel.nsfw : true,
      parentId: channel ? this.parentId === channel.parentId : true,
      userLimit: channel ? this.userLimit === channel.userLimit : true,
      bitrate: channel ? this.bitrate === channel.bitrate : true
    }
  }

  /**
   * Get the string representation of the channel dependent on the action taking place
   * @param action The action taking place
   * @param differences The keys that are changing if the action is "UPDATE"
   */
  public toString(action: Action, differences: VoiceChannelDataKeys[] = []): string {
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
      `VoiceChannel '${this.name}' {`
    )

    // Display properties
    const allProperties = this.differences(null)
    const allPropertyKeys = Object.keys(allProperties) as VoiceChannelDataKeys[]

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

  public static isVoiceChannel(structure: IStructure): structure is IVoiceChannelData {
    return structure.type === VoiceChannel.type
  }

  public static parse(data: IVoiceChannelData): VoiceChannel {
    return new VoiceChannel(data)
  }
}
