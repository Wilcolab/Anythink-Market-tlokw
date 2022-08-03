const mongoose = require("mongoose");
require("../models/User");
require("../models/Item");
require("../models/Comment");
const User = mongoose.model("User");
const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");

if (!process.env.MONGODB_URI) {
  return console.warn(
    "Missing MONGODB_URI in env, please add it to your .env file"
  );
}

mongoose.connect(process.env.MONGODB_URI).catch((err) => {
  console.error(err);
  process.exit(1);
});

async function seedDb() {
  const usersArr = Array(100)
    .fill()
    .map((_, i) => {
      const menOrWomen = i % 2 === 0 ? "men" : "women";
      return {
        username: `fakeuser${i}`,
        email: `fakeuser${i}@example.com`,
        bio: "I am one of several automatically generated, fake users that now live in your database.",
        image: `https://randomuser.me/api/portraits/${menOrWomen}/${i}.jpg`,
      };
    });

  for (let i = 0; i < usersArr.length; i++) {
    // create user
    const user = new User(usersArr[i]);
    const savedUser = await user.save();

    // savedUser creates an item
    const item = new Item({
      slug: `fakeitem${i}`,
      title: `Fake Item #${i}`,
      description: "This a fake item.",
      image: `https://picsum.photos/seed/${i}/1200/800`,
      comments: [],
      tagList: ["test", "fake"],
      seller: savedUser._id,
    });
    const savedItem = await item.save();

    // savedUser creates a comment for savedItem
    const comment = new Comment({
      body: `This Fake Item #${i} is totally fake. Really. It's not real, folks.`,
      seller: savedUser._id,
      item: savedItem._id,
    });
    const savedComment = await comment.save();

    // Now save the savedComment into the savedItem
    savedItem.comments.push(savedComment._id);
    await savedItem.save();
  }
}

seedDb()
  .then(() => {
    console.log("✅ Database seeding completed");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });