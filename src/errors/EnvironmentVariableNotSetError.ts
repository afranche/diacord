export default class EnvironmentVariableNotSetError extends Error {
  public constructor(variable: string) {
    super(`Cannot find the required environment variable '${variable}'`)
  }
}
