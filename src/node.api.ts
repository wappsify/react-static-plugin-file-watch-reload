import { watch } from 'chokidar';
import { ReloadPlugin } from './types';
import { rebuildRoutes } from 'react-static/node';
import { defaultConfig } from './defaultConfig';

const reloadPlugin: ReloadPlugin = ({
  paths,
  silent = false,
  config = defaultConfig,
}) => ({
  afterDevServerStart: state => {
    if (state.stage !== 'dev') {
      console.info(
        'Info: react-static-plugin-file-watch-reload - will not watch files, because we are not in dev environment'
      );
      return state;
    }

    if (!paths || !paths.length) {
      console.warn(
        'Warning: react-static-plugin-file-watch-reload - no file or directory paths were supplied in the plugin config'
      );
      return state;
    }

    console.info(
      'Info: react-static-plugin-file-watch-reload - initializing file watcher, will reload route data whenever changes are detected'
    );

    watch(paths, config).on('change', path => {
      if (!silent) {
        console.info(
          `Info: react-static-plugin-file-watch-reload - ${path} changed, rebuilding routes`
        );
      }

      rebuildRoutes();
    });

    return state;
  },
});

export default reloadPlugin;
