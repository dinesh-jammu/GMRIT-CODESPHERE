import express from "express";
import { getStreamToken } from "../controllers/chatControllers.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.route("/token").get(protectRoute, getStreamToken);

export default router;
