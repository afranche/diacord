export interface IRequireable {
  required: boolean
}

export default function required<
  T1 extends new (...args: any[]) => IRequireable
>() {
  return (constructor: T1) =>
    class extends constructor {
      public override readonly required: boolean = true
    }
}
