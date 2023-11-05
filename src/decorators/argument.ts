import { IArgument } from "../lib/BaseArgument"

export interface IArgumentable {
  args: Record<string, IArgument>
}

export default function argument<
  T1 extends new (...args: any[]) => IArgumentable,
  T2 extends new (...args: any[]) => IArgument
>(label: string, argument: T2) {
  return (constructor: T1) =>
    class extends constructor {
      public constructor(...args: any[]) {
        super(...args)
        this.args[label] = new argument()
      }
    }
}
