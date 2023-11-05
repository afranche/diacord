export default class ArgumentDecoratorError extends Error {
  public constructor(decorator: string, value?: string) {
    super(
      `Your argument must use the '@${decorator}' decorator to set a ${
        value ?? decorator
      }`
    )
  }
}
