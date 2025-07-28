const mongoose = require("mongoose");
const { mongoURI } = require("../config");

const DB = {
  connect() {
    try {
      mongoose.connect(mongoURI);

      const db = mongoose.connection;

      db.once("open", () => {
        console.log("Database connected");
      });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = { DB };
