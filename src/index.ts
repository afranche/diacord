#! /usr/bin/env node

import CommandBuilder from "./builders/CommandBuilder"
import { InitCommand, apply, destroy, plan, validate } from "./commands"

CommandBuilder.init(process.argv)
  .add(InitCommand)
  .addCommand(validate)
  .addCommand(plan)
  .addCommand(apply)
  .addCommand(destroy)
  .start()
