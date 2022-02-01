import { GizmoDB } from "../../../db/sql";
import { GizmoServer } from "../../../server/server";
import cors from "cors";
import express from "express";

async function main() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  const server = new GizmoServer(
    new GizmoDB({
      user: "vidhanio",
      host: "localhost",
      database: "vidhanio",
      password: "vidhanio",
      port: 5432,
    })
  );

  app.get("/gizmos", server.getGizmos.bind(server));
  app.get("/gizmos/:resource", server.getGizmo.bind(server));
  app.post("/gizmos", server.postGizmo.bind(server));
  app.put("/gizmos/:resource", server.putGizmo.bind(server));
  app.delete("/gizmos/:resource", server.deleteGizmo.bind(server));

  app.listen(8000, () => {
    console.log("Listening on port 8000");
  });
}

main();
