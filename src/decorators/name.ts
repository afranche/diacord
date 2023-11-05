export interface INameable {
  name: string
}

export default function name<T extends new (...args: any[]) => INameable>(
  name: string
) {
  return (constructor: T) =>
    class extends constructor {
      public override get name() {
        return name
      }
    }
}
