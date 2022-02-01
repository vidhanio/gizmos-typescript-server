import { NewGizmoResponse, NewGizmosResponse } from "./response";
import express, { Request, Response, Router } from "express";

import { GizmoDB } from "../db/database";
import cors from "cors";

export class GizmoServer {
  db: GizmoDB;
  mux = express();

  constructor(db: GizmoDB) {
    this.db = db;

    this.mux.use(express.json());
    this.mux.use(cors());
    this.mux.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next();
    });

    this.mux.get("/gizmos", this.getGizmos.bind(this));
    this.mux.get("/gizmos/:resource", this.getGizmo.bind(this));
    this.mux.post("/gizmos", this.postGizmo.bind(this));
    this.mux.put("/gizmos/:resource", this.putGizmo.bind(this));
    this.mux.delete("/gizmos/:resource", this.deleteGizmo.bind(this));
  }

  async Start(): Promise<void> {
    await this.db.Start();

    this.mux.listen(8000, () => {
      console.log("Listening on port 8000");
    });
  }

  async Stop(): Promise<void> {
    await this.db.Stop();
  }

  async getGizmos(req: Request, res: Response): Promise<void> {
    try {
      const gizmos = await this.db.getGizmos();

      res.json(NewGizmosResponse("Gizmos retrieved.", gizmos));
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getGizmo(req: Request, res: Response): Promise<void> {
    try {
      const gizmo = await this.db.getGizmo(Number(req.params.resource));

      res.json(NewGizmoResponse("Gizmo retrieved.", gizmo));
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async postGizmo(req: Request, res: Response): Promise<void> {
    try {
      await this.db.insertGizmo(req.body);

      res.json(NewGizmoResponse("Gizmo created.", null));
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async putGizmo(req: Request, res: Response): Promise<void> {
    try {
      await this.db.updateGizmo(Number(req.params.resource), req.body);

      res.json(NewGizmoResponse("Gizmo updated.", null));
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async deleteGizmo(req: Request, res: Response): Promise<void> {
    try {
      await this.db.deleteGizmo(Number(req.params.resource));

      res.json(NewGizmoResponse("Gizmo deleted.", null));
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
}
