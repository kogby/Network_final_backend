import express from "express";
import { getRate } from "../controllers/rate/getRate.js";
import { addRate } from "../controllers/rate/addRate.js";
const router = express.Router();

router.get("/:title", getRate);
router.post("/", addRate);
// router.delete("/:title/:myName", deleteTrack);

export default router;
