import {Router} from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { createAlbum, getAllAlbums } from "../controllers/album.controller.js";
import {validate} from "../middlewares/validate.js"
import {createAlbumSchema} from "../validate/album.validate.js"
import {upload} from "../middlewares/multer.js"
const router = Router()

router.post("/new",verifyJWT,upload.single("thumbnail"),validate(createAlbumSchema),
  createAlbum
)
router.get("/all",verifyJWT,getAllAlbums)

export default router;