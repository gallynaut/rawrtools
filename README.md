# rawrtools

CLI to help generate docusaurus files

<!-- toc -->
* [rawrtools](#rawrtools)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @gallynaut/rawrtools
$ rawrtools COMMAND
running command...
$ rawrtools (--version)
@gallynaut/rawrtools/0.0.0 darwin-x64 node-v16.11.0
$ rawrtools --help [COMMAND]
USAGE
  $ rawrtools COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`rawrtools gen anchor PROGRAMID`](#rawrtools-gen-anchor-programid)
* [`rawrtools help [COMMAND]`](#rawrtools-help-command)
* [`rawrtools plugins`](#rawrtools-plugins)
* [`rawrtools plugins:inspect PLUGIN...`](#rawrtools-pluginsinspect-plugin)
* [`rawrtools plugins:install PLUGIN...`](#rawrtools-pluginsinstall-plugin)
* [`rawrtools plugins:link PLUGIN`](#rawrtools-pluginslink-plugin)
* [`rawrtools plugins:uninstall PLUGIN...`](#rawrtools-pluginsuninstall-plugin)
* [`rawrtools plugins update`](#rawrtools-plugins-update)

## `rawrtools gen anchor PROGRAMID`

Convert an anchor IDL to a markdown page

```
USAGE
  $ rawrtools gen anchor [PROGRAMID] [-o <value>] [-d <value>] [-p <value>]

ARGUMENTS
  PROGRAMID  Program ID to fetch Anchor IDL for

FLAGS
  -d, --descriptions=<value>  [default: descriptions.json] description file to persist changes
  -o, --output=<value>        [default: ./] where to output the file to
  -p, --docsPath=<value>      [default: /program] docusaurus docs path where the files will reside. used for
                              hyperlinking

DESCRIPTION
  Convert an anchor IDL to a markdown page

EXAMPLES
  $ rawrtools gen:anchor SW1TCH7qEPTdLsDHRgPuMQjbQxKdH2aBStViMFnt64f -o docs/program
```

## `rawrtools help [COMMAND]`

Display help for rawrtools.

```
USAGE
  $ rawrtools help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for rawrtools.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `rawrtools plugins`

List installed plugins.

```
USAGE
  $ rawrtools plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ rawrtools plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `rawrtools plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ rawrtools plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ rawrtools plugins:inspect myplugin
```

## `rawrtools plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ rawrtools plugins:install PLUGIN...

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
  $ rawrtools plugins add

EXAMPLES
  $ rawrtools plugins:install myplugin 

  $ rawrtools plugins:install https://github.com/someuser/someplugin

  $ rawrtools plugins:install someuser/someplugin
```

## `rawrtools plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ rawrtools plugins:link PLUGIN

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
  $ rawrtools plugins:link myplugin
```

## `rawrtools plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ rawrtools plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ rawrtools plugins unlink
  $ rawrtools plugins remove
```

## `rawrtools plugins update`

Update installed plugins.

```
USAGE
  $ rawrtools plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
