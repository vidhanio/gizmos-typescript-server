import {
  createGizmo,
  deleteGizmo,
  editGizmo,
  getGizmo,
  getGizmos,
} from "../controllers/gizmos";

import { Router } from "express";
import cors from "cors";

const router = Router();

router.use(cors());

router.get("/gizmos", getGizmos);
router.get("/gizmos/:resource", getGizmo);
router.post("/gizmos", createGizmo);
router.put("/gizmos/:resource", editGizmo);
router.delete("/gizmos/:resource", deleteGizmo);

export default router;
