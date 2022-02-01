import {
  createGizmo,
  deleteGizmo,
  editGizmo,
  getGizmo,
  getGizmos,
} from "./handlers";

import cors from "cors";
import express from "express";

async function main() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get("/gizmos", getGizmos);
  app.get("/gizmos/:resource", getGizmo);
  app.post("/gizmos", createGizmo);
  app.put("/gizmos/:resource", editGizmo);
  app.delete("/gizmos/:resource", deleteGizmo);

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
}

main();