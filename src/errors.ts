export class NoDiaDefinitionsError extends Error {
  constructor(strategy: "json" | "hcl2", searchPath: string) {
    super(`No Dia definitions could be found under ${searchPath} (${strategy}).`)

    Object.setPrototypeOf(this, NoDiaDefinitionsError.prototype)
  }
}
