import path from "path";

export const FOLDER_PATH: string = path.resolve(process.cwd(), 'packages');

export const PACKAGE_LOCK_PATH: string = path.resolve(process.cwd(), 'package-lock.json');

export const PACKAGE_PATH: string = path.resolve(process.cwd(), 'package.json');

export const TEMP_PATH =  path.resolve(process.cwd(), '.temp');

export const TEMP_PACKAGE_LOCK_PATH: string = path.resolve(process.cwd(), '.temp/package-lock.json');

export const TEMP_PACKAGE_PATH: string = path.resolve(process.cwd(), '.temp/package.json');
