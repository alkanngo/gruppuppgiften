import express from 'express';
import app from './server';
import bodyParser from 'body-parser';
import db from './lib/database/collections';
import CreatedResponse from './lib/api/createdresponse';
import DataResponse from './lib/api/dataresponse';
import FailedResponse from './lib/api/failedresponse';

// Setup the routes
app.post('/:key', (req, res) => {
  // Appending an S to the key to specify that its plural
  const appendS = `${req.params.key}s`;
  // Save that in to dbCollection
  const dbCollection = db[appendS]; // TODO change variable name
  if (dbCollection) {
    if (!req.body.name) {
      console.log(req.body);
      return res.status(400).send(new FailedResponse('Name is required'));
    }
  }
  const newObject = req.body;
  const newId = dbCollection.push(newObject);
  return res.status(201).send(new CreatedResponse(newId, 'Added successfully'));
});

// Purpose: Look for any type of creature by passing in the "key"-variable
app.get('/:key', (req, res) => {
  // Saving the request result, by checking the userinput(key)
  const dbCollection = db[req.params.key];

  if (dbCollection) {
    return res.status(200).send(new DataResponse(dbCollection));
  }
  return res.status(404).send(new FailedResponse(`${req.params.key} not found`));
});

app.get('/:key/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Appending an S to the key to specify that its plural
  const appendS = `${req.params.key}s`;
  // Save that in to dbCollection
  const dbCollection = db[appendS];
  // Check if dbCollection exists and save the id into the dbObject.
  if (dbCollection) {
    const dbObject = dbCollection.find({ id });
    if (dbObject) {
      return res.status(200).send(new DataResponse(dbObject));
    }
  }
  return res.status(404).send(new FailedResponse(`${req.params.key} not found`));
});

app.get('/search/:collection/:key/:value', (req, res) => {
  const { collection, key, value } = req.params;
  const dbCollection = db[collection];

  if (dbCollection) {
    const dbObject = dbCollection.find({ [key]: value });
    if (dbObject) {
      return res.status(200).send(new SuccessResponse(dbObject));
    }
    return res.status(404).send(new FailedResponse(`${req.params.key} not found`));
  }
});
