import { Router } from "express";
import {
  addSkill,
  updateSkill,
  deleteSkill,
  getAllSkills
} from "../controllers/skills.controller.js";
import { AuthenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/add",AuthenticateUser, addSkill);
router.put("/edit/:id",AuthenticateUser, updateSkill);
router.delete("/delete/:id",AuthenticateUser, deleteSkill);
router.get("/all",AuthenticateUser, getAllSkills);



export default router;
