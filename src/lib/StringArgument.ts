import yargs from "yargs"
import BaseArgument from "./BaseArgument"

export default class StringArgument extends BaseArgument.as<string>("string") {
  public override getValue(yargs: yargs.ArgumentsCamelCase<any>) {
    return yargs[this.parameter]
  }
}
