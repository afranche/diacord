export default interface IConfigStrategy {
  isConfigured: (filePath: string) => Promise<boolean>

  initialize: (filePath: string) => Promise<void>

  traverse: () => Promise<Record<string, any>>
}
