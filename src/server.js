const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const cssHandler = require('./cssResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': cssHandler.getCSS,
    '/getFigures': jsonHandler.getFigures,
    '/getFigure': jsonHandler.getFigure,
    '/getFiguresFavorites': jsonHandler.getFavoriteFigures,
    notFound: jsonHandler.getNotFound,
  },
  HEAD: {
    '/getFigures': jsonHandler.getFiguresMeta,
    '/getFigure': jsonHandler.getFigureMeta,
    notFound: jsonHandler.getNotFoundMeta,
  },
  POST: {
    '/favoriteFigure': jsonHandler.favoriteFigure,
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);


  const params = query.parse(parsedUrl.query);

  console.log(request.method,parsedUrl.pathname)

  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response, params);
  } else {
    urlStruct[request.method].notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
