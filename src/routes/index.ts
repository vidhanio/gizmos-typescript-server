import { Router } from "express";
import {
  getGizmos,
  getGizmo,
  addGizmo,
  updateGizmo,
  deleteGizmo,
} from "../controllers/gizmos";

const router = Router();

router.get("/gizmos", getGizmos);
router.get("/gizmo/:resource", getGizmo);
router.post("/add-gizmo", addGizmo);
router.put("/edit-gizmo/:resource", updateGizmo);
router.delete("/delete-gizmo/:resource", deleteGizmo);

export default router;
