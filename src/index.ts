#! /usr/bin/env node

import init from "./commands/init"
import validate from "./commands/validate"
import plan from "./commands/plan"
import apply from "./commands/apply"
import destroy from "./commands/destroy"
import CommandBuilder from "./builders/CommandBuilder"

CommandBuilder.init(process.argv)
  .addCommand(init)
  .addCommand(validate)
  .addCommand(plan)
  .addCommand(apply)
  .addCommand(destroy)
  .start()
