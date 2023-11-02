import IConfigStrategy from "./IConfigStrategy"
import JsonConfigStrategy from "./JsonConfigStrategy"

export const supportedConfigTypes = ["json"]
export type SupportedConfigType = (typeof supportedConfigTypes)[number]

export default class ConfigStrategyProvider {
  public static getStrategy(type: SupportedConfigType): IConfigStrategy {
    switch (type) {
      case "json":
        return new JsonConfigStrategy()
      default:
        throw new Error("Invalid configuration type provided")
    }
  }
}
