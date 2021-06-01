import { mkdir, copy, rewrite, exec } from './utils'

export default {
  createFolder: {
    label: data => `create folder *${data.name}*`,
    run:   data => mkdir(data.dest)
  },
  copyTemplate: {
    label: data => 'copy working files',
    run:   data => copy(data.template, data.dest)
  },
  writePackageJson: {
    label: data => 'update *package.json*',
    run:   data => rewrite(data.packageJson, { 'project-name': data.name })
  },
  writeReadme: {
    label: data => 'update *readme*',
    run:   data => rewrite(data.readme, { 'project-name': data.name })
  },
  npmInstall: {
    label: data =>'install dependencies',
    run:   data => exec(`cd ${data.name} && npm install`)
  },
  npmStart: {
    label: data => 'your project is now starting:',
    run:   data => exec(`cd ${data.name} && npm start`)
  }
}