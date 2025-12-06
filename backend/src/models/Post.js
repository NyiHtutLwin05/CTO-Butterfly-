import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    enum: [
      "Erean",
      "Brunad",
      "Bylyn",
      "Docia",
      "Marend",
      "Pryn",
      "Zord",
      "Yaean",
      "Frestin",
      "Stonyam",
      "Ryall",
      "Ruril",
      "Keivia",
      "Tallan",
      "Adohad",
      "Obelyn",
      "Holmer",
      "Vertwall",
    ],
  },
  observationTime: {
    type: String,
    required: true,
  },
  observationDate: {
    type: Date,
    required: true,
  },
  butterflyType: {
    type: String,
    required: true,
    enum: [
      "Monarch",
      "Swallowtail",
      "Painted Lady",
      "Blue Morpho",
      "Common Buckeye",
      "Red Admiral",
      "Cabbage White",
      "Other/Unknown",
    ],
  },
  primaryActivity: {
    type: String,
    required: true,
    enum: ["visit", "feeding", "nesting", "Other"],
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  comments: {
    type: String,
    maxlength: 500,
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
