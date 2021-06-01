import { argv } from 'yargs'
import chalk from 'chalk'
import path from 'path'
import DEFAULT_TASKS from './tasks'

const DEFAULT_CONFIG = {
  template: 'template',
  plop: 'plop',
  pkg: {}
}

export default function(root, cfg) {
  
  // resolve config
  const config = Object.assign({}, DEFAULT_CONFIG, cfg)
  console.log(chalk`{blue.bold ${config.pkg.name}} v${config.pkg.version}`)

  // resolve base date
  const data = {
    cwd: process.cwd(),
    name: argv._[0]
  }

  // check name
  if(!data.name) {
    console.log(chalk`{red.bold error, you must specify a project name}`)
    process.exit()
  }

  // resolve folders and files
  data.template = path.resolve(root, config.template),
  data.dest = path.resolve(data.cwd, data.name)
  data.packageJson = path.resolve(data.dest, 'package.json')
  data.readme = path.resolve(data.dest, 'readme.md')

  // resolve custom data
  if(cfg.resolve) {
    const resolved = cfg.resolved(data, argv)
    Object.assign(data, resolved)
  }

  // generate factory out of tasks
  const tasks = {}
  const taskDefs = Object.assign({}, DEFAULT_TASKS, cfg.tasks)
  for(let name in taskDefs) {
    tasks[name] = function() {
      const label = taskDefs[name].label(data).replace(/\*(.+)\*/g, (a, b) => chalk.cyan.bold(b))
      console.log(chalk`{gray #}`, label)
      taskDefs[name].run(data)
      console.log(chalk`  {green.bold ✓} ok`)
    }
  }

  // run tasks
  cfg.run = cfg.run || function(tasks, data, argv) {
    tasks.createFolder()
    tasks.copyTemplate()
    tasks.writePackageJson()
    tasks.writeReadme()
    tasks.npmInstall()
    tasks.npmStart()
  }
  cfg.run(tasks, data, argv)
}