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

  spinner.start('正在解析package.json')

  const run = cmd.runSync('cd ' + TEMP_PATH + '&&' +'npm install --package-lock-only')

  if (run.err) {
    fs.removeSync(TEMP_PATH)
    spinner.stop()
    spinner.fail(`解析package.json失败！`)
    process.exit(0)
  }

  const context: LockData = await readLock(TEMP_PACKAGE_LOCK_PATH)

  fs.removeSync(TEMP_PATH)

  const packages = parseLock(context)

  await downloadPackages(packages)

  process.exit(0)
}

