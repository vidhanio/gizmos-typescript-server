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
      res.json({
        message: "Success",
        gizmos,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
        gizmos: [],
      });
    }
  }

  async getGizmo(req: Request, res: Response): Promise<void> {
    try {
      const gizmo = await this.db.getGizmo(Number(req.params.resource));
      res.json({
        message: "Success",
        gizmo,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
        gizmo: null,
      });
    }
  }

  async createGizmo(req: Request, res: Response): Promise<void> {
    try {
      await this.db.insertGizmo(req.body);
      res.json({
        message: "Success",
        gizmo: null,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
        gizmo: null,
      });
    }
  }

  async editGizmo(req: Request, res: Response): Promise<void> {
    try {
      await this.db.updateGizmo(Number(req.params.resource), req.body);
      res.json({
        message: "Success",
        gizmo: null,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
        gizmo: null,
      });
    }
  }

  async deleteGizmo(req: Request, res: Response): Promise<void> {
    try {
      await this.db.deleteGizmo(Number(req.params.resource));
      res.json({
        message: "Success",
        gizmo: null,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
        gizmo: null,
      });
    }
  }
}
