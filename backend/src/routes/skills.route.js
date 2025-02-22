import { Router } from "express";
import {
  addSkill,
  removeSkill
} from "../controllers/skills.controller.js";
import { AuthenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/add",AuthenticateUser, addSkill);
router.delete("/delete/:id",AuthenticateUser, removeSkill);
// router.put("/edit/:id",AuthenticateUser, updateSkill);
// router.get("/all",AuthenticateUser, getAllSkills);



export default router;
