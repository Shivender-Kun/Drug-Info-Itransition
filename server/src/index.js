const express = require("express");
const { PORT } = require("./config");
const { DB } = require("./db");
const { errorHandler } = require("./middlewares/errorHandler");
const { routes } = require("./routes");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/", routes);

app.use(errorHandler);

DB.connect();

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
