import yargs from "yargs"
import BaseArgument from "./BaseArgument"
import File from "./File"

export default class FileArgument extends BaseArgument.as<File>("string") {
  public override getValue(yargs: yargs.ArgumentsCamelCase<any>) {
    return new File(yargs[this.parameter])
  }
}
