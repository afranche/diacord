import IConfigStrategy from "./IConfigStrategy"
import fs from "fs/promises"
import defaultConfig from "../../assets/defaultConfig.json"
import { Schema } from "../../types/Schema"
import Json from "../../helpers/Json"

export default class JsonConfigStrategy implements IConfigStrategy {
  public async isConfigured(filePath: string) {
    return await fs
      .readFile(filePath)
      .then(() => true)
      .catch(() => false)
  }

  public async initialize(filePath: string) {
    await fs.mkdir(filePath.split("/").slice(0, -1).join("/"), {
      recursive: true
    })
    await fs.appendFile(filePath, JSON.stringify(defaultConfig))
  }

  public parse(raw: string) {
    return Json.deserialize<Schema>(raw)
  }
}
