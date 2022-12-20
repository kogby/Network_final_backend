import express from "express";
import { getBid } from "../controllers/bids/getBid.js";
import { addBid} from "../controllers/bids/addBid.js";
const router = express.Router();

router.get("/:title", getBid);
router.post("/title", addBid)
export default router;
