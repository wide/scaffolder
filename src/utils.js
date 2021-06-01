import { execSync } from 'child_process'
import fse from 'fs-extra'
import fs from 'fs'


/**
 * Create a folder
 * @param {String} name 
 */
export function mkdir(name) {
  return fs.mkdirSync(name)
}


/**
 * Copy a folder
 * @param {String} from 
 * @param {String} to 
 */
export function copy(from, to) {
  return fse.copySync(from, to)
}


/**
 * Replace content in file
 * @param {String} file 
 * @param {Object<string, String>} interpolate 
 */
export function rewrite(file, interpolate) {
  let content = fs.readFileSync(file).toString()
  for(let placeholder in interpolate) {
    content = content.replace(placeholder, interpolate[placeholder])
  }
  return fs.writeFileSync(file, content)
}


/**
 * Run CLI command
 * @param {String} command 
 */
export function exec(command) {
  return execSync(command, { stdio: 'inherit' })
}