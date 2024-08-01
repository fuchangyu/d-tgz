import cmd from 'node-cmd'
import fs from "fs-extra";
import path from "path";


const file: string = path.resolve(process.cwd(), 'package.json');
const p: string = path.resolve(process.cwd(), '.temp/package.json');
const dir: string = path.resolve(process.cwd(), '.temp');

fs.removeSync(dir)


const packageFile = fs.readFileSync(file)

fs.mkdirSync(dir)
fs.writeFileSync(p, packageFile)



console.warn(cmd.runSync('cd ' + dir + '&&' +'npm install --package-lock-only'))