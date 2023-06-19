const express = require('express');
const docValidator = require('../middlewares/doc.middleware');
const { getAllDocs, getUserSpecificDocs, postDoc, updateDoc, deleteDoc } = require('../controllers/document.controller');
const authCheck = require('../middlewares/auth.middleware');
const docsRouter = express.Router();



// Routes for handling general document operations
docsRouter.route('/')
     .get(getAllDocs) // Route for retrieving all documents
     .post(authCheck, postDoc); // Route for creating a new document


docsRouter.use(authCheck) // authentication validator

// Routes for handling document operations with a specific ID
docsRouter.route('/:id')
     .patch(docValidator, updateDoc) // Route for updating a document
     .delete(docValidator, deleteDoc); // Route for deleting a document

// Route for retrieving documents specific to a user
docsRouter.get('/user', getUserSpecificDocs);


module.exports = docsRouter;
