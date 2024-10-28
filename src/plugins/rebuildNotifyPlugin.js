var net = require('net');
/**
 * @category Webpack Plugin
 */
class RebuildNotifyPlugin {

  constructor(config) {
    this.config = config;
  }
  /**
   * Apply the plugin.
   *
   * @param compiler Webpack compiler instance.
   */
  apply(compiler) {
    compiler.hooks.done.tap('RebuildNotifyPlugin', (stats) => {
      if (stats.hasErrors()) {
        return;
      }

      console.log('Rebuild finished. Notifying the app...');
      // Notify the app that the rebuild has finished

      const client = new net.Socket();
      client.connect(9093, this.config.remoteIP, () => {
        const json = JSON.stringify({ _webpack: 'built' });
        client.write(json);
        client.destroy();
      });
      client.on('error', () => {
        client.destroy();
      });
    });
  }
}

exports.RebuildNotifyPlugin = RebuildNotifyPlugin;
