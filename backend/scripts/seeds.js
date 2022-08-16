const mongoose = require("mongoose");
const item = require("../models/Item");
const Item = mongoose.model("Item");
require('./models/User');
const User = mongoose.model('User');
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message);
  });

const seedItems = [
  {
    slug: "test",
    title: "test",
    description: "test",
    image: "test",
    favoritesCount: 0,
    comments: [],
    tagList: [],
    seller: {},
  },
];

const seedDB = async () => {
  await Item.insertMany(seedItems);
};

seedDB().then(() => {
  mongoose.connection.close();
});