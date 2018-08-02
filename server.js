const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const isDeveloping = process.env.NODE_ENV !== 'production';
const config = isDeveloping ? require('./webpack.development.config.js') : require('./webpack.config.js');

const port = isDeveloping || !isDeveloping && !process.env.PORT ? 3000 : process.env.PORT;
const app = express();

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

console.log(`isDeveloping: ${isDeveloping} - ENV: ${process.env.NODE_ENV}`);
if (isDeveloping) {
  const cors = require('cors');
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    noInfo: false,
    stats: {
      colors: true,
      hash: true,
      timings: true,
      chunks: true,
      chunkModules: true,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(cors({
    origin: `http://localhost:${port}`,
    optionsSuccessStatus: 200
  }));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res, next) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }

  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});