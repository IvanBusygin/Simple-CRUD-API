import path from 'path';

const srcDirname = path.resolve(import.meta.dirname, 'src', 'index.ts');
const distDirname = path.resolve(import.meta.dirname, 'dist');

const config = {
  entry: srcDirname,
  mode: 'production',
  target: 'node',
  output: {
    filename: 'bundle.cjs',
    path: distDirname,
    clean: true,
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

export default config;
