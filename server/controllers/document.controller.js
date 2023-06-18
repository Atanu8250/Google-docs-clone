const DocsModel = require('../models/document.model');


// GET all documents which are publically available
const getAllDocs = async (req, res) => {
     try {
          const publicDocs = await DocsModel.find({ isPublic: true }).select('-doc').populate('author', '-password');
          res.status(200).send({ message: "Success", data: publicDocs });
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: error.message,
               error
          });
     }
}


// GET all documents created by a logged in user
const getUserSpecificDocs = async (req, res) => {
     const userId = req.headers.userId;
     try {
          const docs = await DocsModel.find({ author: userId }).populate('author', '-password');
          res.status(200).send({ message: "Success", data: docs });
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: error.message,
               error
          });
     }
}


// GET Single document 
const getSingleDoc = async (docId) => {

     try {
          const matchedDoc = await DocsModel.findById(docId);

          if (!matchedDoc) return { message: "Document doesn't exist!" };

          return { message: "success", doc: matchedDoc };
     } catch (error) {
          console.log('error:', error)
          return { message: error.message };
     }
}


// POST a document
const postDoc = async (req, res) => {
     const userId = req.headers.userId;
     const { title, doc } = req.body;

     if (!title) return res.sendStatus(400);

     try {
          const newDoc = new DocsModel({ ...req.body, author: userId })
          await newDoc.save();

          res.status(201).send({ message: 'Document created successfully', data: newDoc });
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: error.message,
               error
          });
     }
}


// UPDATE a document created by that logged-in user only
const updateDoc = async (req, res) => {
     const docId = req.params.id;
     const update = req.body;

     try {

          const updatedDoc = await DocsModel.findByIdAndUpdate(docId, update, { new: true, runValidators: true });
          /*
          In the second object:
          - The `new` key will help to get the updated document reference returned, not the old one.
          - The `runValidators` key strictly forces following the schema validation.
          */

          res.status(202).send({ message: `${updatedDoc.title} is successfully updated`, data: updatedDoc });


     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: error.message,
               error
          });
     }
}


// DELETE a document created by that logged-in  user only
const deleteDoc = async (req, res) => {
     const docId = req.params.id;
     const userId = req.headers.userId;

     try {

          const deletedDoc = await DocsModel.findByIdAndDelete(docId);

          res.status(202).send({ message: `${deletedDoc.title} is successfully deleted` });

     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: error.message,
               error
          });
     }
}


module.exports = { getAllDocs, getUserSpecificDocs, getSingleDoc, postDoc, updateDoc, deleteDoc };