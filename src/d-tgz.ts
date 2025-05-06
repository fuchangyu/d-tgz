#!/usr/bin/env node
import { program } from "commander";
import fs from "fs";
import path from "path";
import { install } from "./commands/install/install";
import { initI18n } from './i18n';

(async () => {
  await initI18n()

  const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'))

  program.name(packageJson.name).description(packageJson.description).version(packageJson.version)

  const commands = [
    {
      args: ['install', 'i', 'd', 'download'],
      description: 'To download the tgz package. Default use package-lock.json',
      options: [
        { flags: '-p, --package', description: 'd-tgz i -p;To download the tgz package. use package.json' },
        { flags: '<name>', description: 'd-tgz i <name>;To download the tgz package. use package name' },
      ],
      action: install
    }
  ]

  commands.forEach(cmd => {
    cmd.args.forEach(arg => {
      let c = program.command(arg).description(cmd.description).action(cmd.action)
      cmd.options.forEach(o => c = c.option(o.flags, o.description))
    })
  })


  program.parse(process.argv)

})()


