# react-static-plugin-file-watch-reload 🗂

![License](https://img.shields.io/github/license/wappsify/react-static-plugin-file-watch-reload.svg)
![David dependencies](https://david-dm.org/wappsify/react-static-plugin-file-watch-reload.svg)

This plugin allows you to specify file(s), that, when changed, will trigger a route reload. This is very useful in an development environment.

For this functionality, the `rebuildRoutes` function of `react-static` is called whenever a file change is detected. Under the hood, this package uses [`chokidar`](https://github.com/paulmillr/chokidar) for file watching.

## Installation

In an existing react-static site run:

```bash
$ yarn add -D react-static-plugin-file-watch-reload
```

Then add the plugin to your `static.config.js`:

```javascript
export default {
  plugins: [
    [
      'react-static-plugin-file-watch-reload',
      {
        // example configuration
        paths: ['your/path/here.json', 'another/file/here.json'],
      },
    ],
  ],
};
```

## Options

In your `static.config.js`, you should pass configuration options to the plugin.

### `paths: string | string[]`

Pass files, directories, or glob patterns for watching. Takes an array of strings or just one string. By default, directories are watched recursively. You may take a look at [chokidar's documentation](https://github.com/paulmillr/chokidar#api) to find out exactly which formats are supported.

### `silent: boolean`

Default value: `false`

By default, the plugin will log whenever a watched file changes. You may disable the log messages by setting `silent: true` in the plugin options.

### `config: chokidar.WatchOptions`

The default configuration of this plugin should match most needs. However, optionally, you may pass a `chokidar` config object here to override the default config.

For reference, the default config this plugin uses is as follows:

```js
const defaultConfig = {
  awaitWriteFinish: {
    stabilityThreshold: 500,
  },
};
```

Please refer to the [full API docs of `chokidar`](https://github.com/paulmillr/chokidar#api) to find out which configuration options are available.

## FAQ

### I am importing a JSON file in my `static.config.js` and the dev server does not load the new data when I change the file! How do I fix this?

This is actually not a problem related to the plugin - the plugin simply watches files and then calls the `rebuildRoutes` function of `react-static` when appropriate.

Instead, your problem lies with webpack - on startup of the react-static dev server, it creates a module for the imported JSON file. This however does not update when the JSON file does, which results in the behaviour you're seeing.

To workaround this, use `fs.ReadFileSync` in your `static.config.js` to load the JSON file. With this approach you guarantee that the file is read "fresh" every time `rebuildRoutes` is called. See [this issue](https://github.com/wappsify/react-static-plugin-file-watch-reload/issues/7) for a code example.
