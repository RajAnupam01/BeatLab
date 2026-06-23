import {Router} from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {registerUser,loginUser,logoutUser,rotateToken} from "../controllers/auth.controller.js";
import {validate} from "../middlewares/validate.js"
import {registerSchema, loginSchema} from "../validate/auth.validate.js"
const router = Router()

router.post("/register",validate(registerSchema),registerUser)
router.post("/login",validate(loginSchema),loginUser)
router.post("/logout",verifyJWT,logoutUser);
router.post("/rotate-token",rotateToken);


export default router;