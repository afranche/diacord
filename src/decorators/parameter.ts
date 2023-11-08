export interface IParameterable {
  parameter: string
  alias: string
}

export default function parameter<
  T extends new (...args: any[]) => IParameterable
>(parameter: string, alias: string) {
  return (constructor: T) =>
    class extends constructor {
      protected readonly _parameter: string = parameter
      protected readonly _alias: string = alias
    }
}
