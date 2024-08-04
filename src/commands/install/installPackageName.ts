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

  try {
    cmd.runSync('cd ' + TEMP_PATH + '&&' + `npm install ${ name } --package-lock-only`)
  } catch {
    spinner.fail(`正在解析${ name }的依赖失败！`)
  }

  const context: LockData = await readLock(TEMP_PACKAGE_LOCK_PATH)

  const packages = parseLock(context)

  await downloadPackages(packages)

  fs.removeSync(TEMP_PATH)

  process.exit(0)
}
