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

// Add global function for mini logging
global.log_mini = (...args: any[]) => { MiniLogger.log(...args); }

export default MiniLogger;
