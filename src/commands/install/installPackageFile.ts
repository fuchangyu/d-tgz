import cmd from 'node-cmd'
import fs from "fs-extra";
import { PACKAGE_PATH, TEMP_PACKAGE_LOCK_PATH, TEMP_PACKAGE_PATH, TEMP_PATH } from "../../global";
import { LockData } from "../../types";
import { downloadPackages, parseLock, readLock, spinner } from "../../utils/utils";

export async function installPackageFile () {
  if (fs.existsSync(TEMP_PATH)) {
    fs.removeSync(TEMP_PATH)
  }

  let packageFile: Buffer

  try {
    packageFile  = fs.readFileSync(PACKAGE_PATH)
  } catch {
    spinner.fail('读取package.json文件失败')
    process.exit(0)
  }

  fs.mkdirSync(TEMP_PATH)

  fs.writeFileSync(TEMP_PACKAGE_PATH, packageFile)

  spinner.start('正在解析package依赖')

  cmd.runSync('cd ' + TEMP_PATH + '&&' +'npm install --package-lock-only')

  const context: LockData = await readLock(TEMP_PACKAGE_LOCK_PATH)

  const packages = parseLock(context)

  await downloadPackages(packages)

  fs.removeSync(TEMP_PATH)

  process.exit(0)
}

