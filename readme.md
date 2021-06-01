# Scaffolder

Automatised project generator.


## Install

```
npm install @wide/scaffolder --save
```


## Usage

Create a CLI script:

```js
#!/usr/bin/env node
import scaffold from '@wide/scaffolder'
import pkg from './package.json'

scaffold(__dirname, {
    template: 'template',
    pkg
})
```

Then call your script:
```
node ./script.js my-app
```

When calling your script using CLI or NPX, it will:
- create a folder named `my-app`
- copy the `template` folder inside
- replace `project-name` with `my-app` in `package.json`
- replace `project-name` with `my-app` in `readme.md`
- install all dependencies
- start your project


## Authors

- **Aymeric Assier** - [github.com/myeti](https://github.com/myeti)
- **Julien Martins Da Costa** - [github.com/jdacosta](https://github.com/jdacosta)


## License

This project is licensed under the MIT License - see the [licence](licence) file for details