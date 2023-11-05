export default class CommandDecoratorError extends Error {
  public constructor(decorator: string, value?: string) {
    super(
      `Your command must use the '@${decorator}' decorator to set a ${
        value ?? decorator
      }`
    )
  }
}
