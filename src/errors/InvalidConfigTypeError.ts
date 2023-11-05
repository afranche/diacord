export default class InvalidConfigTypeError extends Error {
  public constructor() {
    super("Invalid configuration type provided")
  }
}
