export interface IChoosable {
  choices?: string[]
}

export default function choices<T extends new (...args: any[]) => IChoosable>(
  choices: readonly string[] | string[] | undefined
) {
  return (constructor: T) =>
    class extends constructor {
      public override readonly choices?: string[] = choices as
        | string[]
        | undefined
    }
}
