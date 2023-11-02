import IConfigStrategy from "./IConfigStrategy"
import fs from "fs/promises"
import defaultConfig from "../../assets/defaultConfig.json"
import { join } from "path"

import { NoDiaDefinitionsError } from "../../errors"

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

  private async getDiaDefinitions(): Promise<string[]> {
    const configuration = (await fs.readdir(process.cwd())).filter(file =>
      file.endsWith(".dia.json")
    )

    if (configuration.length === 0) {
      throw new NoDiaDefinitionsError("json", process.cwd())
    }
    return configuration
  }

  public async traverse(): Promise<Record<string, any>>  {
    try {
      const configuration = (await this.getDiaDefinitions())
        .map(file => JSON.parse(fs.readFile(file).toString()))
        .reduce((a, b) => ({ ...a, ...b }))

      return configuration
    } catch (e) {
      if (e instanceof NoDiaDefinitionsError) throw e
      throw new Error(`Couldn't parse the payload: ${e}`)
    }
  }
}
