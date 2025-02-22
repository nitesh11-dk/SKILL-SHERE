import { Router } from "express";
import {
  addSkill,
  removeSkill,
  updateUserSkills
} from "../controllers/skills.controller.js";
import { AuthenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/add",AuthenticateUser, updateUserSkills);
// router.post("/remove",AuthenticateUser, removeSkill);
// router.put("/edit/:id",AuthenticateUser, updateSkill);
// router.get("/all",AuthenticateUser, getAllSkills);



export default router;
