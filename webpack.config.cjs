const path = require('path')

const common = {
  devtool: false,
  entry: {
    app: './src/index.js',
  },
  resolve: {
    modules: [__dirname, 'node_modules', 'src'],
    extensions: ['*', '.js', '.json'],
  },
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')],
  },
  target: 'node',
}

module.exports = [
  {
    ...common,
    output: {
      libraryTarget: 'commonjs2',
      filename: 'index.cjs',
      hashFunction: 'xxhash64',
      chunkFormat: 'commonjs',
    },
  }, {
    ...common,
    experiments: {
      outputModule: true,
    },
    target: ['es5', 'node'],
    output: {
      libraryTarget: 'module',
      filename: 'index.mjs',
      hashFunction: 'xxhash64',
      chunkFormat: 'module',
    },
  }
]
