import path from 'path';
import webpack from 'webpack';
import { Service } from 'service';

const resolveModule = config => {
  if (typeof config === 'string') {
    return resolveModule({ name: config });
  }

  const mod = require(config.name);
  let factory = mod;

  if (config.method) {
    const namespaces = config.method.split('.');
    factory = namespaces.reduce((m, ns) => m[ns] || m, mod);
  }

  const args = config.arguments || [];

  if (typeof factory !== 'function') {
    factory = mod;

    if (typeof factory !== 'function') {
      throw new Error('Unable to locate middleware in ' + config.name);
    }
  }

  return new factory(...args);
};

export default class WebApplication extends Service {
  constructor() {
    super();
    this.addConfiguration(path.join(__dirname, '..'), __dirname);
  }

  getCompilerConfig(config = this.config) {
    const { plugins, module, ...webpackConfig } = config.get('webpack');

    return {
      ...webpackConfig,
      module: {
        rules: Object.values(module.rules)
      },
      plugins: Object.values(plugins).map(plugin => resolveModule(plugin.module))
    };
  }

  getCompiler(config) {
    return webpack(this.getCompilerConfig(config));
  }

  async configure() {
    const config = await Service.prototype.configure.call(this);

    if (config.get('env:development')) {
      const compiler = this.getCompiler(config);

      config.use({
        "middleware": {
          "webpack-dev": {
            "priority": 20,
            "module": {
              "name": "webpack-dev-middleware",
              "arguments": [
                compiler
              ]
            }
          },
          "webpack-hot": {
            "priority": 30,
            "module": {
              "name": "webpack-hot-middleware",
              "arguments": [
                compiler
              ]
            }
          }
        }
      });
    }

    return config;
  }

  async compile() {
    const config = await this.configure();
    const compiler = this.getCompiler(config);

    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          return reject(err);
        }
        resolve(stats);
      });
    });
  }
}
