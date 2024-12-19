import fs from "fs-extra";
import { TEMP_PACKAGE_LOCK_PATH, TEMP_PACKAGE_PATH, TEMP_PATH } from "../../global";
import { downloadPackages, parseLock, readLock, spinner } from "../../utils/utils";
import cmd from "node-cmd";
import { LockData } from "../../types";
import { i18n } from '../../i18n';


const basePackageContent = {
  name: "d-tgz",
  dependencies: {},
}


export async function installPackageName (name: string) {
  if (fs.existsSync(TEMP_PATH)) {
    fs.removeSync(TEMP_PATH)
  }

  fs.mkdirSync(TEMP_PATH)

  fs.writeFileSync(TEMP_PACKAGE_PATH, JSON.stringify(basePackageContent))

  spinner.start(i18n.__('parsingPackage') + name)


  const run = cmd.runSync('cd ' + TEMP_PATH + '&&' + `npm install ${ name } --package-lock-only`)

  if (run.err) {
    fs.removeSync(TEMP_PATH)
    spinner.stop()
    spinner.fail(i18n.__('parsePackageFailed') + name)
    process.exit(0)
  }

  const context: LockData = await readLock(TEMP_PACKAGE_LOCK_PATH)

  fs.removeSync(TEMP_PATH)

  const packages = parseLock(context)

  await downloadPackages(packages)

  process.exit(0)
}
