const validator = require("validator");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/user");

exports.createUser = async ({ userInput }, req) => {
  if (userInput.over16 === false) {
    const error = new Error("Not Allowed");
    error.code = 422;
    throw error;
  }
  const errors = [];
  if (!validator.isEmail(userInput.email)) {
    errors.push({ message: "Invalid Email" });
  }

  if (
    validator.isEmpty(userInput.password) ||
    !validator.isLength(userInput.password, { min: 8 })
  ) {
    errors.push({ message: "Password should be up to 8 characters!" });
  }

  if (
    validator.isEmpty(userInput.firstname) ||
    !validator.isLength(userInput.firstname, { min: 3 })
  ) {
    errors.push({ message: "First name too short!" });
  }

  if (
    validator.isEmpty(userInput.lastname) ||
    !validator.isLength(userInput.lastname, { min: 3 })
  ) {
    errors.push({ message: "Last name too short!" });
  }

  if (errors.length > 0) {
    const error = new Error("Invalid input.");
    error.data = errors;
    error.code = 400;
    throw error;
  }

  const existingUser = await User.findOne({ email: userInput.email });
  if (existingUser) {
    const error = new Error("Email already Exists");
    error.code = 422;
    throw error;
  }

  const hashedPw = await bcrypt.hash(userInput.password, 12);
  const confirmationCode = crypto.randomBytes(20).toString("hex");

  const user = await new User({
    email: userInput.email,
    password: hashedPw,
    firstname: userInput.firstname,
    lastname: userInput.lastname,
    confirmationCode: confirmationCode,
  });

  const link = `https://www.fro-shop.com/confirm-email/${confirmationCode}`;

  const welcomeMsg = {
    to: userInput.email, // Change to your recipient
    from: "froshop@mail.com", // Change to your verified sender
    subject: "Welcome to Froshop",
    html: `<h3>Hello ${userInput.firstname}</h3>
        <div style="border-top: 1px #FE9900 solid; border-bottom: 1px #FE9900 solid; border-radius: 20px; text-align:left;font-family: Verdana, sans-serif;padding:10px; font-size:small">
        <p><img  alt="logo" src="https://res.cloudinary.com/fro-shop/image/upload/v1643797019/clothes/logo_j6hpre.png" /></p>
        <h4>Please confirm Your Email</h4>
        <p>Thank you for Registering on Froshop.</p>
        <p> Please confirm your email by clicking on this link: ${link} </p></div>`,
  };

  await sgMail.send(welcomeMsg);
  await user.save();

  return "Registration successful! Check your email for confirmation";
};

/***********************************CREATE USER ADDRESS***********************************/
exports.createUserAddress = async ({ address }, req) => {
  if (!req.isAuth) {
    const error = new Error("Not Authenticated");
    error.code = 401;
    throw error;
  }

  const user = await User.findById(req.userId);
  user.address = address.address;
  user.phone = address.phone;
  await user.save();
  return "Address added!";
};
/***********************************VERIFY EMAIL ***********************************/
exports.verifyUser = async ({ code }, req) => {
  const user = await User.findOne({ confirmationCode: code });
  if (!user) {
    const error = new Error("Email Address not found!");
    error.code = 404;
    throw error;
  }

  user.accountStatus = "Active";
  await user.save();
  return "Account confirmed, Proceed to login";
};

/***********************************LOGIN USER***********************************/
exports.loginUser = async ({ email, password }, req) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error("Email Address Doesn't exist");
    error.code = 401;
    throw error;
  }

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    const error = new Error("Password is Incorrect");
    error.code = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
      status: user.status,
    },
    "somesupersecret"
  );

  return {
    token: token,
    userId: user._id.toString(),
    status: user.status,
  };
};

/***********************************GET USER***********************************/
exports.getUser = async (args, req) => {
  if (!req.isAuth) {
    const error = new Error("Not Authenticated");
    error.code = 401;
    throw error;
  }

  const user = await User.findById(req.userId);

  return {
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    address: user.address,
    phone: user.phone,
  };
};
