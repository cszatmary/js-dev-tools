# js-dev-tools

A CLI to setup development tools. Will create configuration files, add npm scripts, and install dependencies.

Supported tools are:
* babel
* eslint
* lint-staged
* prettier
* typescript (with babel)

## Install
Install using `yarn`:

```bash
$ yarn global add @cszatma/js-dev-tools
```

Or use `npm` if you wish:

```bash
$ npm install -g @cszatma/js-dev-tools
```
## Usage

To use the program run the following in the directory of your choice.

```bash
$ js-dev-tools
```

Make sure there is a package.json file in the directory for it to work.  
Also make sure there is a `yarn.lock` file if you would like to use yarn to install the dependencies.

If exisiting configuration files are detected the program will abort. If you wish to continue anyway run:

```bash
$ js-dev-tools --force
```


## License
js-dev-tools is available under the [MIT License](https://github.com/cszatma/js-dev-tools/tree/master/LICENSE).

## Contributing
Contributions are welcome. Feel free to open an issue or submit a pull request.

