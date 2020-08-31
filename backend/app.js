const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan"); //for development purpose to get the routes requested in console
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//app
const app = express();

//db
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB connected"));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
