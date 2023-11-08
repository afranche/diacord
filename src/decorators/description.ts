export interface IDescriptable {
  description: string
}

export default function description<
  T extends new (...args: any[]) => IDescriptable
>(description: string) {
  return (constructor: T) =>
    class extends constructor {
      protected readonly _description: string = description
    }
}
