import express from "express";
import { getTracks } from "../controllers/track/getTrack.js";
import { addTrack } from "../controllers/track/addTrack.js";
import { deleteTrack } from "../controllers/track/deleteTrack.js";
import { getPersonTracks } from "../controllers/track/getPersonTrack.js";

const router = express.Router();

router.get("/:title", getTracks);
router.get("/name/:myName", getPersonTracks);
router.post("/", addTrack);
router.delete("/:title/:myName", deleteTrack);

export default router;
