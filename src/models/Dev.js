const mongoose = require("mongoose");
const pointShema = require("./Utils/PointSchema");

const DevSchema = new  mongoose.Schema({
    name: String,
    techs: [String],
    github_username: String,
    avatar_url: String,
    bio: String,
    location: {
        type: pointShema,
        index: "2dsphere"
    }
});

module.exports = mongoose.model("Dev", DevSchema)