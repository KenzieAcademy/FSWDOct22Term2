import { Router } from "express";
import fileUpload from "express-fileupload";
import path from "path";

const router = Router();

router.post("/", fileUpload(), async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(422).json({ error: "No files provided." });
  }
  try {
    const file = req.files.imgUpload;

    const imgPath = "/avatars/" + file.name;

    const fullPath = path.join(__dirname, "../public", imgPath);

    file.mv(fullPath, function (err) {
      if (err) {
        return res.status(500).json({ error: "Internal server error, idk" });
      }

      res.json({ path: imgPath });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
