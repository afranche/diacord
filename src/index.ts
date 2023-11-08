#! /usr/bin/env node

import CommandBuilder from "./builders/CommandBuilder"
import {
  ApplyCommand,
  DestroyCommand,
  InitCommand,
  PlanCommand,
  ValidateCommand
} from "./commands"

CommandBuilder.init(process.argv)
  .add(InitCommand)
  .add(ValidateCommand)
  .add(PlanCommand)
  .add(ApplyCommand)
  .add(DestroyCommand)
  .start()
