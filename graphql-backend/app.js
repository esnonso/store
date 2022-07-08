const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");

const PORT = process.env.PORT || 8080;

const auth = require("./middleware/auth");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolver");

app.use(cors());
app.use(auth);

app.use(
  "/graphql",
  graphqlHTTP((req, res) => ({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || "An error occurred.";
      const code = err.originalError.code || 500;
      res.statusCode = code;
      return { message: message, status: code, data: data };
    },
  }))
);

mongoose
  .connect("mongodb://localhost/cloth-app")
  .then(() => {
    app.listen(PORT, () => {
      console.log("DATABASE CONNECTED, SERVER IS RUNNING...");
    });
  })
  .catch((error) => {
    console.log(error);
  });
