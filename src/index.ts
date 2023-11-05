#! /usr/bin/env node

import validate from "./commands/validate"
import plan from "./commands/plan"
import apply from "./commands/apply"
import destroy from "./commands/destroy"
import CommandBuilder from "./builders/CommandBuilder"
import InitCommand from "./commands/InitCommand"

CommandBuilder.init(process.argv)
  .add(InitCommand)
  .addCommand(validate)
  .addCommand(plan)
  .addCommand(apply)
  .addCommand(destroy)
  .start()
