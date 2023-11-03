import IStructure from "../structures/IStructure"

export type Schema = {
  version: string
  parameters: SchemaParameters
  resources: IStructure[]
}

export type SchemaParameters = {
  guildId: string
}
