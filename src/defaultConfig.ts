import { WatchOptions } from 'chokidar';

export const defaultConfig: WatchOptions = {
  awaitWriteFinish: {
    stabilityThreshold: 500,
  },
};
