const {
  createUser,
  createUserAddress,
  verifyUser,
  loginUser,
  getUser,
} = require("../controllers/auth");
const {
  createCloth,
  editCloth,
  getClothes,
  getSingleCloth,
} = require("../controllers/clothes");

module.exports = {
  /**USER */
  createUser: createUser,
  createUserAddress: createUserAddress,
  getUser: getUser,
  login: loginUser,
  verifyUser: verifyUser,
  /** CLOTHES*/
  createCloth: createCloth,
  editCloth: editCloth,
  getClothes: getClothes,
  getSingleCloth: getSingleCloth,
};
