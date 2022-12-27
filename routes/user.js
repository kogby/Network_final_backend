import express from "express";
import {signin} from "../controllers/users/signin.js";
import {addSeller} from "../controllers/users/addSeller.js";

const router = express.Router();

router.get("/:myName", signin);
router.post("/becomeSeller", addSeller)

export default router;
