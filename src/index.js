require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT;
const handlebars = require("express-handlebars");
const path = require("path");
const route = require("./routes");
const db = require("./config/db");
const cors = require("cors");

app.use(cors());
db.connect();
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("combined"));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "resources/views"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

route(app);

app.listen(port, () => {
  console.log(`Server đang chạy trên port ${port}`);
});
