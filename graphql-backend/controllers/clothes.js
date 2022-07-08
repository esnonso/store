const User = require("../models/user");
const Cloth = require("../models/clothes");
const clothes = require("../models/clothes");

exports.createCloth = async ({ clothInput }, req) => {
  if (!req.isAuth && !req.isAdmin) {
    const error = new Error("Not Authenticated");
    error.code = 401;
    throw error;
  }

  const user = await User.findById(req.userId);
  const existingCloth = await Cloth.findOne({
    title: clothInput.title,
    brand: clothInput.brand,
    price: clothInput.price,
    category: clothInput.category,
    gender: clothInput.gender,
  });

  if (existingCloth) {
    const error = new Error("Cloth already exists");
    error.code = 422;
    throw error;
  }

  const cloth = await new Cloth({
    brand: clothInput.brand,
    title: clothInput.title,
    category: clothInput.category,
    sizes: clothInput.sizes,
    amountInStock: clothInput.quantity,
    price: clothInput.price,
    creator: user._id,
    gender: clothInput.gender,
    desc: clothInput.desc,
    colors: clothInput.colors,
  });

  const createdCloth = await cloth.save();
  user.clothesCreated.push(createdCloth);
  await user.save();
  return "Cloth added Succesfully!";
};
/****************************GET ALL CLOTHES ********************************************************/
exports.getClothes = async ({ category, gender }, req) => {
  let clothes;
  if (category === "All") {
    clothes = await Cloth.find({ gender: gender });
  } else {
    clothes = await Cloth.find({ category: category, gender: gender });
  }

  if (category === "Foreign brands") {
    clothes = await Cloth.find({
      $and: [
        { gender: gender },

        { $or: [{ brand: "Nike" }, { brand: "Addidas" }] },
      ],
    });
    console.log(clothes);
  }

  return {
    clothes: clothes.map((c) => {
      return {
        _id: c._id.toString(),
        title: c.title,
        sizes: c.sizes,
        desc: c.desc,
        price: c.price,
        amountInStock: c.amountInStock,
        brand: c.brand,
      };
    }),
  };
};

/****************************GET SINGLE CLOTH ********************************************************/
exports.getSingleCloth = async ({ id }, req) => {
  const cloth = await Cloth.findById(id);

  return {
    _id: cloth._id.toString(),
    title: cloth.title,
    sizes: cloth.sizes,
    desc: cloth.desc,
    price: cloth.price,
    amountInStock: cloth.amountInStock,
    brand: cloth.brand,
    colors: cloth.colors,
    gender: cloth.gender,
    category: cloth.category,
  };
};

/****************************EDIT CLOTH ********************************************************/
exports.editCloth = async ({ id, clothInput }, req) => {
  if (!req.isAuth && !req.isAdmin) {
    const error = new Error("Not Authenticated");
    error.code = 401;
    throw error;
  }

  const user = await User.findById(req.userId);
  const cloth = await Cloth.findById(id);

  if (cloth.creator._id.toString() !== req.userId.toString()) {
    const error = new Error("Not Authorized");
    error.code = 403;
    throw error;
  }

  cloth.title = clothInput.title;
  cloth.sizes = clothInput.sizes;
  cloth.price = clothInput.price;
  cloth.brand = clothInput.brand;
  cloth.colors = clothInput.colors;
  cloth.desc = clothInput.desc;
  cloth.gender = clothInput.gender;
  cloth.category = clothInput.category;
  cloth.amountInStock = clothInput.quantity;

  await cloth.save();
  return `${cloth._id} edit succesful!`;
};
