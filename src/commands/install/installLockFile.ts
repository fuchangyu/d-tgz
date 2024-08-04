import { PACKAGE_LOCK_PATH } from "../../global";
import { LockData } from "../../types";
import { downloadPackages, parseLock, readLock, spinner } from "../../utils/utils";


export async function installLockFile () {
  const context: LockData = await readLock(PACKAGE_LOCK_PATH)

  spinner.start('')

  const packages = parseLock(context)

  await downloadPackages(packages)

  process.exit(0)
}


