import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  poster: {
    type: String,
    default: "Anonymous",
  },
  url: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Post = model("Post", PostSchema);

export default Post;
