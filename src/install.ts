import download from 'download';
import jsonfile from 'jsonfile';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { Spinner } from "./Spinner";

const spinner: Spinner = new Spinner('download packages ')

const packagesPath: string = path.resolve(__dirname, 'packages');

const filePath: string = path.resolve(__dirname, 'package-lock.json');

export function install () {
  jsonfile.readFile(filePath, async function (err, jsonData: LockData) {
    if (!err) {

      const packages = parseLock(jsonData)

      spinner.info(`总共${ packages.length }个依赖`);

      let length = packages.length

      let now: DownloadInfo

      const interval = setInterval(() => {
        if (now) {
          spinner.start(`downloading 剩余${ length }：${ now.package } ${ Date.now() - now.time }ms`)
        }
      }, 100)

      for (let index in packages) {
        const p = packages[index]
        now = { package: p.path + '@' + p.v, time: Date.now() }
        try {

          await download(p.resolved, packagesPath + '/' + p.path);

          const res = await axios.get(p.resolved.split('/-/')[0])

          fs.writeFileSync(packagesPath + '/' + p.path + '/package.json', JSON.stringify(res.data))

          spinner.succeed(now.package)

        } catch (e) {
          console.warn(e)
          spinner.fail(now.package)
        } finally {
          length--
        }
      }

      clearInterval(interval)
      spinner.stop()
      spinner.succeed('done！')
      process.exit(0)
    } else {
      spinner.stop()
      spinner.fail('Failed to read file package-lock.json')
      process.exit(0)
    }
  })
}

function parseLock (lockData: LockData): PackageItem[] {
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

interface LockData {
  packages: Record<string, any>,
  dependencies: Record<string, any>
}

interface PackageItem {
  name: string,
  resolved: string,
  path: string,
  v: string
}

interface DownloadInfo {
  package: string,
  time: number
}
