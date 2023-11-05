export default class AlreadyConfiguredError extends Error {
  public constructor() {
    super("Diacord has already been configured for this project")
  }
}
