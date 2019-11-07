import { WatchOptions } from 'chokidar';

export interface ReloadPluginOptions {
  paths: string | readonly string[];
  silent?: boolean;
  config?: WatchOptions;
}

/**
 * Unfortunately react-static does not provide typings for the plugin hooks.
 * So this returns `any` for now…
 */
export type ReloadPlugin = (options: ReloadPluginOptions) => any;
