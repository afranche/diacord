import { Schema } from "../../types/Schema"

export default interface IConfigStrategy {
  isConfigured: (filePath: string) => Promise<boolean>

  initialize: (filePath: string) => Promise<void>

  parse: (raw: string) => Schema
}
