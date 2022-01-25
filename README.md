oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g anchor2markdown
$ anchor2markdown COMMAND
running command...
$ anchor2markdown (--version)
anchor2markdown/0.0.0 darwin-x64 node-v16.11.0
$ anchor2markdown --help [COMMAND]
USAGE
  $ anchor2markdown COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`anchor2markdown hello PERSON`](#anchor2markdown-hello-person)
* [`anchor2markdown hello world`](#anchor2markdown-hello-world)
* [`anchor2markdown help [COMMAND]`](#anchor2markdown-help-command)
* [`anchor2markdown plugins`](#anchor2markdown-plugins)
* [`anchor2markdown plugins:inspect PLUGIN...`](#anchor2markdown-pluginsinspect-plugin)
* [`anchor2markdown plugins:install PLUGIN...`](#anchor2markdown-pluginsinstall-plugin)
* [`anchor2markdown plugins:link PLUGIN`](#anchor2markdown-pluginslink-plugin)
* [`anchor2markdown plugins:uninstall PLUGIN...`](#anchor2markdown-pluginsuninstall-plugin)
* [`anchor2markdown plugins update`](#anchor2markdown-plugins-update)

## `anchor2markdown hello PERSON`

Say hello

```
USAGE
  $ anchor2markdown hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/switchboard-xyz/anchor2markdown/blob/v0.0.0/dist/commands/hello/index.ts)_

## `anchor2markdown hello world`

Say hello world

```
USAGE
  $ anchor2markdown hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `anchor2markdown help [COMMAND]`

Display help for anchor2markdown.

```
USAGE
  $ anchor2markdown help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for anchor2markdown.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `anchor2markdown plugins`

List installed plugins.

```
USAGE
  $ anchor2markdown plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ anchor2markdown plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `anchor2markdown plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ anchor2markdown plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ anchor2markdown plugins:inspect myplugin
```

## `anchor2markdown plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ anchor2markdown plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ anchor2markdown plugins add

EXAMPLES
  $ anchor2markdown plugins:install myplugin 

  $ anchor2markdown plugins:install https://github.com/someuser/someplugin

  $ anchor2markdown plugins:install someuser/someplugin
```

## `anchor2markdown plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ anchor2markdown plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ anchor2markdown plugins:link myplugin
```

## `anchor2markdown plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ anchor2markdown plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ anchor2markdown plugins unlink
  $ anchor2markdown plugins remove
```

## `anchor2markdown plugins update`

Update installed plugins.

```
USAGE
  $ anchor2markdown plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
