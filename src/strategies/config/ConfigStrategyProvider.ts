import { InvalidConfigTypeError } from "../../errors"
import IConfigStrategy from "./IConfigStrategy"
import JsonConfigStrategy from "./JsonConfigStrategy"

export const supportedConfigTypes = ["json"] as const
export type SupportedConfigType = (typeof supportedConfigTypes)[number]

export default class ConfigStrategyProvider {
  public static parseType(raw: string): SupportedConfigType {
    const parsed = supportedConfigTypes.find(t => t === raw)
    if (parsed) return parsed
    else throw new InvalidConfigTypeError()
  }

  public static parseTypeFromFilePath(path: string): SupportedConfigType {
    const extension = path.split(".").pop()
    if (!extension || !supportedConfigTypes.some(type => type === extension))
      throw new InvalidConfigTypeError()

    return ConfigStrategyProvider.parseType(extension)
  }

  public static getStrategy(type: SupportedConfigType): IConfigStrategy {
    switch (type) {
      case "json":
        return new JsonConfigStrategy()
    }
  }
}
