import { Command } from "commander";
import { installPackageFile } from "./installPackageFile";
import { installLockFile } from "./installLockFile";
import { installPackageName } from "./installPackageName";

export function install (obj: any, command: Command) {
  if (obj.p || obj.package) {
    installPackageFile()
  } else if ((command.args || [])[0]) {
    installPackageName(command.args[0])
  } else {
    installLockFile()
  }
}