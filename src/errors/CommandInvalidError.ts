export default class CommandInvalidError extends Error {
  public constructor(property: string) {
    super(`Command '${property}' is required`)
  }
}
