import fs from "fs-extra";
import { TEMP_PACKAGE_LOCK_PATH, TEMP_PACKAGE_PATH, TEMP_PATH } from "../../global";
import { downloadPackages, parseLock, readLock, spinner } from "../../utils/utils";
import cmd from "node-cmd";
import { LockData } from "../../types";


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

  spinner.start(`正在解析${ name }的依赖`)


  const run = cmd.runSync('cd ' + TEMP_PATH + '&&' + `npm install ${ name } --package-lock-only`)

  if (run.err) {
    fs.removeSync(TEMP_PATH)
    spinner.stop()
    spinner.fail(`解析${ name }的依赖失败！`)
    process.exit(0)
  }

  const context: LockData = await readLock(TEMP_PACKAGE_LOCK_PATH)

  fs.removeSync(TEMP_PATH)

  const packages = parseLock(context)

  await downloadPackages(packages)

  process.exit(0)
}
