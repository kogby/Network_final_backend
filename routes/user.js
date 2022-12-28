import express from "express";
import {signin} from "../controllers/users/signin.js";
import {addSeller} from "../controllers/users/addSeller.js";
import { addUser } from "../controllers/users/register.js";
const router = express.Router();

router.get("/:myName", signin);
router.post("/register", addUser);
router.post("/becomeSeller", addSeller);

export default router;
