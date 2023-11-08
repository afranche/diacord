import { State } from "../../types/State"

export default interface IStateStrategy {
  initialize: (location: string) => Promise<void>

  parse: (raw: string) => State
}
