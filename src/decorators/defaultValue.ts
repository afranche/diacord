export interface IDefaultable {
  defaultValue?: string
}

export default function defaultValue<
  T extends new (...args: any[]) => IDefaultable
>(defaultValue: string) {
  return (constructor: T) =>
    class extends constructor {
      public override readonly defaultValue?: string = defaultValue
    }
}
