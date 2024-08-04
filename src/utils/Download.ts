import { FOLDER_PATH } from "../global";
import axios from "axios";
import fs from "fs";
import download from 'download'
import { PackageItem } from "../types";

export class Download {
  private concurrencyNum: number
  private downloadPool: Array<() => any> = []
  private downloadingNum: number = 0

  constructor (concurrencyNum: number) {
    this.concurrencyNum = concurrencyNum
  }

  public downPackage (info: PackageItem) {
    return new Promise((resolve, reject) => {

      const action = async () => {
        try {
          await download(info.resolved, FOLDER_PATH + '/' + info.path);

          const res = await axios.get(info.resolved.split('/-/')[0])

          fs.writeFileSync(FOLDER_PATH + '/' + info.path + '/package.json', JSON.stringify(res.data))

          resolve(info)
        } catch {
          reject(info)
        } finally {
          this.downloadingNum -= 1

          if (this.downloadPool.length) {
            this.downloadingNum += 1

            this.downloadPool.shift()()
          }
        }
      }

      if (this.downloadingNum < this.concurrencyNum) {
        this.downloadingNum += 1

        action()
      } else {
        this.downloadPool.push(action)
      }
    })
  }
}

