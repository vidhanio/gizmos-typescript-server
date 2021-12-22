import { Router } from "express";
import {
  getGizmos,
  getGizmo,
  createGizmo,
  editGizmo,
  deleteGizmo,
} from "../controllers/gizmos";

const router = Router();

router.get("/gizmos", getGizmos);
router.get("/gizmo/:resource", getGizmo);
router.post("/create-gizmo", createGizmo);
router.put("/edit-gizmo/:resource", editGizmo);
router.delete("/delete-gizmo/:resource", deleteGizmo);

export default router;
