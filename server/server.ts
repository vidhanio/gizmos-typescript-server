import { NewGizmoResponse, NewGizmosResponse } from "./response";
import { Request, Response } from "express";

import { GizmoDB } from "../db/database";

export class GizmoServer {
  db: GizmoDB;

  constructor(db: GizmoDB) {
    this.db = db;
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
