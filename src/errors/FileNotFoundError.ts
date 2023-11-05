export default class FileNotFoundError extends Error {
  public constructor(path: string) {
    super(`Unable to find the specified file ${path}`)
  }
}
