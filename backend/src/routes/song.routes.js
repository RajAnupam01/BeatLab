import {Router} from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {addSong,addThumbnail,getSingleSong,getAllSongs,getAllSongsByAlbum,deleteSong} from "../controllers/song.controller.js";
import {validate} from "../middlewares/validate.js"
import {createSongSchema} from "../validate/song.validate.js"
import {upload} from "../middlewares/multer.js"
const router = Router()

router.post("/",verifyJWT,upload.single("audio"),validate(createSongSchema),addSong)
router.post("/:id/thumbnail",verifyJWT,upload.single("thumbnail"),addThumbnail)
router.get("/",verifyJWT,getAllSongs)
router.get("/single/:id",verifyJWT,getSingleSong);
router.get("/album/:id",verifyJWT,getAllSongsByAlbum);
router.delete('/:id',verifyJWT,deleteSong)

export default router;