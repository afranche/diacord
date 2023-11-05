export default class InvalidBotTokenError extends Error {
  public constructor() {
    super("Invalid Discord bot token provided")
  }
}
