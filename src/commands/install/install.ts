import { Command } from "commander";
import { installPackageFile } from "./installPackageFile";
import { installLockFile } from "./installLockFile";
import { installPackageName } from "./installPackageName";

export function install (obj: any, command: Command) {
  console.warn(obj)
  if (obj.p || obj.package) {
    console.warn('package')
    installPackageFile()
  } else if ((command.args || [])[0]) {
    console.warn('package name')
    installPackageName(command.args[0])
  } else {
    console.warn('package-lock')
    installLockFile()
  }
}