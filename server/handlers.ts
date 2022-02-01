import { Request, Response } from "express";
import { deleteGizmoDB, getGizmoDB, getGizmosDB, insertGizmoDB } from "../db";

import { Gizmo } from "../types";

export async function getGizmos(req: Request, res: Response): Promise<void> {
  try {
    const gizmos = await getGizmosDB();

    res.status(200).json({
      message: "Gizmos Retrieved",
      gizmos: gizmos,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function getGizmo(req: Request, res: Response): Promise<void> {
  try {
    if (isNaN(Number(req.params.resource))) {
      res.sendStatus(400);
      return;
    }

    const gizmo = await getGizmoDB(Number(req.params.resource));

    if (gizmo === null) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json({
      message: "Gizmo Retrieved",
      gizmo: gizmo,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function createGizmo(req: Request, res: Response): Promise<void> {
  try {
    const gizmo = req.body as Gizmo;

    if (gizmo === undefined) {
      res.sendStatus(400);
      return;
    }

    await insertGizmoDB(gizmo);

    res.status(201).json({
      message: "Gizmo Created",
      gizmo: gizmo,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function editGizmo(req: Request, res: Response): Promise<void> {
  try {
    if (isNaN(Number(req.params.resource))) {
      res.sendStatus(400);
      return;
    }

    const gizmo = req.body as Gizmo;

    insertGizmoDB(gizmo);

    res.status(200).json({
      message: "Gizmo Updated",
      gizmo: gizmo,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function deleteGizmo(req: Request, res: Response): Promise<void> {
  try {
    if (isNaN(Number(req.params.resource))) {
      res.sendStatus(400);
      return;
    }

    const gizmo = await deleteGizmoDB(Number(req.params.resource));

    if (gizmo === null) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json({
      message: "Gizmo Deleted",
      gizmo: gizmo,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
