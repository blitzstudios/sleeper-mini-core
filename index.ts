import * as Sleeper from './src/components';
import DevServer from './src/dev_server';
import * as Types from './src/types';
import { Fonts, Theme } from './src/styles';
import Rx from 'rx';

class MiniLogger {
  public static messages = new Rx.Subject;

  static log(...args: any[]) {
    this.messages.onNext({
      type: 'mini_dev_server',
      action: 'onConsoleLog',
      message: Array.from(args).join(' '),
    });
  }
}

export { Sleeper, DevServer, Types, Fonts, Theme, MiniLogger };
