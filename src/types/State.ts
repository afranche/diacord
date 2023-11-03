export type State = {
  version: string
  mappings: Mapping[]
}

export type Mapping = {
  id: string
  snowflake: string
}
