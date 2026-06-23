import {Router} from "express"

import {verifyJWT} from "../middlewares/auth.middleware.js"
import {myProfile,saveToPlaylist} from "../controllers/user.controller.js";

const router = Router()

router.get("/me",verifyJWT,myProfile);
router.post("/song/:id",verifyJWT,saveToPlaylist);

export default router;