const figures = require('./../client/figures.json');


// general JSON response function
const respondJSON = (request, response, status, obj) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(obj));
  response.end();
};

// general response for head requests
const respondMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const getFigures = (request, response) => {
  const obj = {
    figures
  };

  return respondJSON(request, response, 200, obj);
};

// only returns a 200 code
const getFiguresMeta = (request, response) => respondMeta(request, response, 200);

// sends a single figure
const getFigure = (request, response, params) => {
  let status = 400;

  // starts building the oject
  const obj = {};

  if (!params.id && params.id === 0) {
    obj.message = "The parameter 'id' is required.";
    obj.id = 'missingParams';
  } else if (!figures[params.id]) {
    status = 400;
    obj.message = `There is no figure with an id of ${params.id}.`;
    obj.id = 'badParams';
  } else {
    status = 200;
    obj.figures = figures[params.id];
  }
  return respondJSON(request, response, status, obj);
};

const getFigureMeta = (request, response, params) => {
  // sets default status
  let status = 200;

  if ((!params.id && params.id === 0) || !figures[params.id]) {
    status = 400;
  }

  return respondMeta(request, response, status);
};

const getNotFound = (request, response) => {
  const obj = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, obj);
};

// response without the obj
const getNotFoundMeta = (request, response) => respondMeta(request, response, 404);


module.exports = {
  getFigures,
  getFiguresMeta,
  getFigure,
  getFigureMeta,
  getNotFound,
  getNotFoundMeta
};
