import IStateStrategy from "./IStateStrategy"
import fs from "fs/promises"
import defaultState from "../../assets/defaultState.json"
import Json from "../../helpers/Json"
import { State } from "../../types/State"

export default class LocalStateStrategy implements IStateStrategy {
  public async initialize(location: string) {
    await fs.mkdir(location.split("/").slice(0, -1).join("/"), {
      recursive: true
    })
    await fs.appendFile(location, Json.serialize(defaultState))
  }

  public parse(raw: string) {
    return Json.deserialize<State>(raw)
  }
}
