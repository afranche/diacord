export interface IDescriptable {
  description: string
}

export default function description<
  T extends new (...args: any[]) => IDescriptable
>(description: string) {
  return (constructor: T) =>
    class extends constructor {
      public override get description() {
        return description
      }
    }
}
