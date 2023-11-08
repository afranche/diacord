import fs from "fs/promises"
import { FileNotFoundError } from "../errors"

export default class File {
  public constructor(public readonly path: string) {}

  /**
   * Attempt to read the file.
   * @returns The file's contents.
   */
  public async read(): Promise<string> {
    const buffer = await fs.readFile(this.path).catch(() => {
      throw new FileNotFoundError(this.path)
    })

    return buffer.toString()
  }
}
