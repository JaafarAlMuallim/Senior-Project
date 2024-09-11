import express from "express";
import { updateProfile } from "../controllers/profile";

const router = express.Router();

router.route("/update").patch(updateProfile);

export { router as authRouter };
