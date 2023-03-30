import { Router } from "express";
import Post from "../models/post.model";

const router = Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const posts = await Post.find();

      res.json(posts);
    } catch (error) {
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    const { poster, url, caption } = req.body;
    try {
      const newPost = await Post.create({ poster, url, caption });

      res.json(newPost);
    } catch (error) {
      res.sendStatus(500);
    }
  });

router.route("/:postId").get(async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);

    res.json(post);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.route("/:postId/like").all(async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true, runValidators: true }
    );

    res.json(post);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;
