import db from './collections';
import app from './server';

// Setup the routes
app.post('/:key', (req, res) => {
  // Appending an S to the key to specify that its plural
  const keyPlusS = `${req.params.key}s`;
  // Save that in to dbCollection
  const dbCollection = db[keyPlusS];
  if (dbCollection) {
    if (!req.body.name) {
      console.log(req.body);
      return res.status(400).send({
        success: false,
        message: 'Name is required',
      });
    }
  }
  const newObject = req.body;
  const newId = dbCollection.push(newObject);
  return res.status(201).send({
    success: true,
    message: 'Added successfully',
    id: newId,
  });
});

// Purpose: Look for any type of creature by passing in the "key"-variable
app.get('/:key', (req, res) => {
  // Saving the request result, by checking the userinput(key)
  const dbCollection = db[req.params.key];

  if (dbCollection) {
    return res.status(200).send({
      success: true,
      data: dbCollection,
    });
  }
  return res.status(404).send({
    success: false,
    // Used to check that the key that is passed in doesnt exist.
    message: `${req.params.key} not found`,
  });
});

app.get('/:key/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Appending an S to the key to specify that its plural
  const keyPlusS = `${req.params.key}s`;
  // Save that in to dbCollection
  const dbCollection = db[keyPlusS];
  // Check if dbCollection exists and save the id into the dbObject.
  if (dbCollection) {
    const dbObject = dbCollection.find({ id });
    if (dbObject) {
      return res.status(200).send({
        success: true,
        data: dbObject,
      });
    }
  }
  return res.status(404).send({
    success: false,
    message: `${req.params.key} not found`,
  });
});

app.get('/search/:collection/:key/:value', (req, res) => {
  const { collection, key, value } = req.params;
  const dbCollection = db[collection];

  if (dbCollection) {
    const dbObject = dbCollection.find({ [key]: value });
    if (dbObject) {
      return res.status(200).send({
        success: true,
        data: dbObject,
      });
    }
    return res.status(404).send({
      success: false,
      message: `${req.params.key} not found`,
    });
  }
});
