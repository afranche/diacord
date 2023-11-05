import IStateStrategy from "./IStateStrategy"
import LocalStateStrategy from "./LocalStateStrategy"

export const supportedStateTypes = ["local"] as const
export type SupportedStateType = (typeof supportedStateTypes)[number]

export default class StateStrategyProvider {
  public static parseType(raw: string): SupportedStateType {
    const parsed = supportedStateTypes.find(t => t === raw)
    if (parsed) return parsed
    else throw new Error("Invalid state type provided")
  }

  public static getStrategy(type: SupportedStateType): IStateStrategy {
    switch (type) {
      case "local":
        return new LocalStateStrategy()
    }
  }
}
