import { Response, Request } from "express";
import { IGizmo } from "../../types/gizmo";
import Gizmo from "../../models/gizmo";

const getGizmos = async (req: Request, res: Response): Promise<void> => {
  try {
    const gizmos = await Gizmo.find();
    res.status(200).json({ gizmos });
  } catch (error) {
    throw error;
  }
};

const getGizmo = async (req: Request, res: Response): Promise<void> => {
  try {
    const gizmo = await Gizmo.findOne({
      resource: Number(req.params.resource),
    });
    res.status(200).json({ gizmo });
  } catch (error) {
    throw error;
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
    throw error;
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
    throw error;
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
    throw error;
  }
};

export { getGizmos, getGizmo, addGizmo, updateGizmo, deleteGizmo };
