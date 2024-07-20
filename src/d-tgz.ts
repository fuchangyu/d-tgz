#!/usr/bin/env node
import { install } from "./commands/install";
import { program } from "commander";
import fs from "fs";
import path from "path";

const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'))

program.version(packageJson.version)

const commands = [
  {
    args: ['install', 'i', 'd', 'download'],
    description: 'To download the tgz package',
    action: install
  }
]
commands.forEach(cmd => {
  cmd.args.forEach(arg => {
    program.command(arg)
      .description(cmd.description)
      .action(cmd.action)
  })
})

program.parse(process.argv)
