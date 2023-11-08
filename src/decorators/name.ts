export interface INameable {
  name: string
}

export default function name<T extends new (...args: any[]) => INameable>(
  name: string
) {
  return (constructor: T) =>
    class extends constructor {
      protected readonly _name: string = name
    }
}
