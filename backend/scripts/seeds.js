const mongoose = require("mongoose");

require("../models/User");
require("../models/Item");
require("../models/Comment");

const User = mongoose.model("User");
const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");

if (!process.env.MONGODB_URI) {
	console.warn("Missing MONGODB_URI in env, please add it to your .env file");
}

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("\n\nConnection Open\n\n");
	})
	.catch((err) => {
		console.log("\n\n" + err + "\n\n");
		process.exit();
	});

const seedDB = async () => {
	//Creating 100 records
	for (let itr = 0; itr < 100; itr++) {
		const seedUser = {
			username: `user${itr}`,
			email: `user${itr}@gmail.com`,
			bio: `SDE ${itr}`,
			image:
				"https://i1.wp.com/media.globalnews.ca/videostatic/353/499/oldestmanthumb.jpg?w=1040&quality=70&strip=all",
		};

		const user = new User(seedUser);
		const userSaved = await user.save();

		const seedItem = {
			slug: `Product${itr}-${userSaved._id}`,
			title: `Product${itr}`,
			description: `User Specialist Product`,
			image: `https://random.imagecdn.app/360/360`,
			comments: [],
			tagList: ["seeding"],
			seller: userSaved._id,
		};

		const item = new Item(seedItem);
		const itemSaved = await item.save();

		const seedComment = {
			body: "Fake Product, Bad Service",
			seller: userSaved._id,
			item: itemSaved._id,
		};

		const comment = new Comment(seedComment);
		await comment.save();
	}
};

seedDB()
	.then(() => {
		console.log("\n\n\n\nSeeding Successful");
		process.exit();
	})
	.catch((err) => {
		console.log(err);
		process.exit();
	});