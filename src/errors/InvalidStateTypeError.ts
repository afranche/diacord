export default class InvalidStateTypeError extends Error {
  public constructor() {
    super("Invalid state type provided")
  }
}
