export default interface IStateStrategy {
  initialize: (location: string) => Promise<void>
}
