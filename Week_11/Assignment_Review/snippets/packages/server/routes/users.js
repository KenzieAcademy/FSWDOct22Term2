import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { requireAuth } from "../middleware";

// All requests with a URL starting with /api/users is handled by one of the following routes (assuming the request type and URL match)

const router = express.Router();

router.route("/:id/avatar").put(requireAuth, async (req, res) => {
  const { profileImage } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        profile_image: profileImage,
      },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.sendStatus(500);
  }
});

router
  .route("/:id")
  .get(async (request, response) => {
    const populateQuery = [
      {
        path: "posts",
        populate: { path: "author", select: ["username", "profile_image"] },
      },
    ];

    const user = await User.findOne({ username: request.params.id })
      .populate(populateQuery)
      .exec();
    if (user) {
      response.json(user.toJSON());
    } else {
      response.status(404).end();
    }
  })
  .put(requireAuth, async (request, response) => {
    const { password, confirm_password, current_password } = request.body;
    const { id } = request.params;

    try {
      if (password !== confirm_password) {
        return response.status(422).json({ error: "Passwords must match." });
      }

      if (password.length < 8 || password.length > 20) {
        return response
          .status(400)
          .json({ error: "Password must be between 8 and 20 characters." });
      }

      const user = await User.findById(id);

      if (!user) {
        return response.status(404).json({ error: "User does not exist" });
      }

      const passwordCorrect = await bcrypt.compare(
        current_password,
        user.passwordHash
      );

      if (!passwordCorrect) {
        return response
          .status(401)
          .json({ error: "Invalid user ID or password" });
      }

      const hashedpassword = await bcrypt.hash(password, 12);

      user.passwordHash = hashedpassword;

      await user.save();

      response.json(user.toJSON());
    } catch (error) {
      response.status(404).end();
    }
  });

module.exports = router;
