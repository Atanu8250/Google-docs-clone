const express = require('express');
const docValidator = require('../middlewares/doc.middleware');
const { getAllDocs, getUserSpecificDoc, postDoc, updateDoc, deleteDoc } = require('../controllers/document.controller');
const docsRouter = express.Router();

// Route for retrieving documents specific to a user
docsRouter.get('/user', getUserSpecificDoc);

// Routes for handling general document operations
docsRouter.route('/')
     .get(getAllDocs) // Route for retrieving all documents
     .post(postDoc); // Route for creating a new document

// Routes for handling document operations with a specific ID
docsRouter.route('/:id')
     .patch(docValidator, updateDoc) // Route for updating a document
     .delete(docValidator, deleteDoc); // Route for deleting a document

module.exports = docsRouter;