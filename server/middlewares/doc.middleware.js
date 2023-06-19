const DocsModel = require('../models/document.model');

const docValidator = async (req, res, next) => {
     const docId = req.params.id;
     const userId = req.headers.userId;

     try {
          const matchedDoc = await DocsModel.findById(docId);

          if (!matchedDoc) return res.status(404).send({ message: "Document doesn't exist" });
          if (matchedDoc.author.toString() !== userId) return res.status(400).send({ message: "You're unauthorized for this operation!" });

          next();


     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: error.message,
               error
          });
     }
}

module.exports = docValidator;