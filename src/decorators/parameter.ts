export interface IParameterable {
  parameter: string
  alias: string
}

export default function parameter<
  T extends new (...args: any[]) => IParameterable
>(parameter: string, alias: string) {
  return (constructor: T) =>
    class extends constructor {
      public override get parameter() {
        return parameter
      }

      public override get alias() {
        return alias
      }
    }
}
