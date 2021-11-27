import { Response, Request } from "express";
import { IGizmo } from "../../types/gizmo";
import Gizmo from "../../models/gizmo";

const getGizmos = async (req: Request, res: Response): Promise<void> => {
  try {
    const gizmos = await Gizmo.find();
    res.status(200).json({ gizmos });
  } catch (error) {
    res.sendStatus(404);
  }
};

const getGizmo = async (req: Request, res: Response): Promise<void> => {
  try {
    const gizmo = await Gizmo.findOne({
      resource: Number(req.params.resource),
    });
    res.status(200).json({ gizmo });
  } catch (error) {
    res.sendStatus(404);
  }
};

const addGizmo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      IGizmo,
      "title" | "materials" | "description" | "resource" | "answers"
    >;

    const gizmo = new Gizmo({
      name: body.title,
      materials: body.materials,
      description: body.description,
      resource: body.resource,
      answers: body.answers,
    });

    const addedGizmo = await gizmo.save();

    res.status(201).json({ message: "Gizmo added", gizmo: addedGizmo });
  } catch (error) {
    res.sendStatus(404);
  }
};

const updateGizmo = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as Pick<
    IGizmo,
    "title" | "materials" | "description" | "resource" | "answers"
  >;
  try {
    await Gizmo.findOneAndUpdate(
      { resource: Number(req.params.resource) },
      body
    );
    const updatedGizmo = await Gizmo.findOne({
      resource: Number(req.params.resource),
    });
    res.status(200).json({
      message: "Gizmo updated",
      gizmo: updatedGizmo,
    });
  } catch (error) {
    res.sendStatus(404);
  }
};

const deleteGizmo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedGizmo = await Gizmo.findOneAndDelete({
      resource: Number(req.params.resource),
    });
    res.status(200).json({
      message: "Gizmo deleted",
      gizmo: deletedGizmo,
    });
  } catch (error) {
    res.sendStatus(404);
  }
};

export { getGizmos, getGizmo, addGizmo, updateGizmo, deleteGizmo };
