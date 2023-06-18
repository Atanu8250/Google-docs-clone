const { UserModel } = require("../models/user.model");


// update profile for the logged-in user only
const udpateProfile = async (req, res) => {
     const userId = req.headers.userId;
     const update = req.body;

     try {
          const updatedProfile = await UserModel.findByIdAndUpdate(userId, update, { new: true, runValidators: true });
          /*
          In the second object:
          - The `new` key will help to get the updated document reference returned, not the old one.
          - The `runValidators` key strictly forces following the schema validation.
          */

          res.status(202).send({ message: `${updatedProfile.username}'s profile successfully updated`, data: updatedProfile });
     } catch (error) {
          console.log('error:', error)

     }
}


module.exports = { udpateProfile };