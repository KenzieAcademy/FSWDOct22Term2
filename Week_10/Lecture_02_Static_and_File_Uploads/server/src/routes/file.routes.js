import { Router } from "express";
import path from "path";

const router = Router();

// POST /api/files
router.post("/", async (req, res) => {
  // Not only does the express-fileupload allow our application to handle
  // files, but it makes it super easy: any files attached to the request body
  // are attached as req.files

  // First, let's make sure that there are, in fact, files attached to the request:
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No files uploaded." });
  }

  // Now that we have concluded that file(s) are included in the request,
  // we'll need to access the file itself. The file itself will be named based
  // on how it is submitted on the front end (or, if you're taking a back-end first approach, which this
  // demo is, the file will be named on the client-side based on how we name the file
  // here)
  const postImage = req.files.postImage; // Keeping this in mind, we'll need to make sure that when we build
  // out the client-side portion of this process, we name the file postImage

  // Next, we need to determine the path where we want to save the file.
  const uploadPath = path.join(
    __dirname,
    "../../public/images",
    postImage.name
  );

  // Finally, save the file to our uploadPath through the use of the .mv() method:
  postImage.mv(uploadPath, function (err) {
    if (err) {
      return res.sendStatus(500);
    }

    res.json({ path: "/images/" + postImage.name });
  });
});

export default router;
