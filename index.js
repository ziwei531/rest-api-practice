const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const path = require("path");
const moongose = require("mongoose");
const db = moongose.connection;

require("dotenv").config();

db.on("error", (error) => console.error(error));
db.once("error", () => console.log("Connected to Database"));

// Connect to Database
const con = async () => {
	try {
		//connecting to mongodb
		await moongose.connect(process.env.MONGO_URL);
		console.log(
			`Connected to Database on Port ${port}. \n 
            Database's Name: ${moongose.connection.name} \n 
            Collection's Name: ${moongose.connection.collection.name}`
		);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const subscribersRoutes = require("./routes/subscribers");

//meaning: localhost:3000/subscribers
app.use("/subscribers", subscribersRoutes);

con().then(() => {
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
});
