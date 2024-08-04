import { Download } from "./Download";
import { Spinner } from "./Spinner";
import { LockData, PackageItem } from "../types";
import fs from "fs-extra";

export const spinner: Spinner = new Spinner()

export const download = new Download(10)


export function parseLock (lockData: LockData): PackageItem[] {
  const packages: PackageItem[] = []

  if (lockData.packages) {
    for (let key in lockData.packages) {
      const path: string = key.replace('node_modules/', '')
      if (path) {
        const item = lockData.packages[key]
        packages.push({
          name: item.resolved.split('/').pop(),
          resolved: item.resolved,
          path: path,
          v: item.version
        })
      }
    }
  } else if (lockData.dependencies) {
    const loopDependencies = (dependenciesData) => {
      const dependencies = dependenciesData.dependencies || {};
      Object.keys(dependencies).forEach(function (key) {
        if (key) {
          packages.push({
            name: dependencies[key].resolved.split('/').pop(),
            resolved: dependencies[key].resolved,
            path: key,
            v: dependencies[key].version
          })
          loopDependencies(dependencies[key])
        }
      })
    }
    loopDependencies(lockData)
  }

  return packages
}

export function readLock (path: string): Promise<LockData> {
  return new Promise((resolve) => {
    try {
      const context = fs.readJSONSync(path)
      resolve(context)
    } catch {
      spinner.fail('读取package-lock文件失败！')
      process.exit(0)
    }
  })
}

export function downloadPackages (packages: PackageItem[]) {
  return new Promise(resolve => {


    let length = packages.length

    const date = Date.now()

    const failures = []

    packages.forEach((p) => {
      download.downPackage(p).then(() => {
        length --
      }).catch(() => {
        failures.push(p)
        length --
      })
    })

    const points: string[] = ['', '.', '.', '.', '..', '..', '..', '...', '...', '...']

    let i = 0

    setInterval(() => {
      if (length) {
        spinner.start(`下载中${ points[i] }
  总数：${ packages.length }
  剩余: ${ length }  
  失败: ${ failures.length }  
  耗时: ${ (Date.now() - date) / 1000 }s`)
        if (i >= points.length - 1) {
          i = 0
        } else {
          i ++
        }
      } else {
        spinner.stop()
        if (failures.length) {
          failures.forEach((f) => spinner.fail(f.path + '@' + f.v))
        } else {
          spinner.succeed('完成')
        }
        resolve(true)
      }
    }, 200)
  })

}