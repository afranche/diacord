/**
 * A helper class to manage JSON.
 */
export default class Json {
  /**
   * Deserialize an object from a JSON string.
   * @param raw The raw JSON string to parse
   * @returns The deserialized object
   */
  public static deserialize<T>(raw: string): T {
    // TODO: Handle validation here (and throw error if invalid)

    return JSON.parse(raw) as T
  }

  /**
   * Serialize an object into a JSON string.
   * @param object The object to serialize
   * @param compact Whether or not the JSON should be compact or readable
   * @returns The stringified version of the object
   */
  public static serialize<T>(object: T, compact: boolean = false): string {
    return compact ? JSON.stringify(object) : JSON.stringify(object, null, 2)
  }
}
