import { Router } from "express";
import {
    createTaskSchedule
} from "../controllers/taskSchedule.controller.js";
import { AuthenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/create",AuthenticateUser, createTaskSchedule);



export default router;
