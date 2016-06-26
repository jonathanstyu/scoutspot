# expressiso
A basic isomorphic JavaScript application with [React](http://facebook.github.io/react/), and [Express](expressjs.com).

### Installation
```bash
npm install
```

### Running the app
```bash
DEBUG=expressiso ./bin/www
```

### Building with webpack
```bash
npm install -g webpack
webpack --watch
```

<!-- browserify ./public/javascripts/sql/lib/index.js -o ./public/javascripts/sql-bundle.js -->

webpack ./public/javascripts/app.js ./public/javascripts/bundle.js

DEBUG=expressiso ./bin/www