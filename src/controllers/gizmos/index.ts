import { Response, Request } from "express";
import { IGizmo } from "../../types/gizmo";
import Gizmo from "../../models/gizmo";

async function getGizmos(req: Request, res: Response): Promise<void> {
  try {
    const gizmos = await Gizmo.find().sort({ resource: 1 });

    res.status(200).json({ gizmos });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

async function getGizmo(req: Request, res: Response): Promise<void> {
  try {
    if (isNaN(Number(req.params.resource))) {
      res.sendStatus(400);
      return;
    }

    const gizmo = await Gizmo.findOne({
      resource: Number(req.params.resource),
    });

    if (gizmo === null) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json({
      gizmo: {
        title: gizmo.title,
        materials: gizmo.materials,
        description: gizmo.description,
        resource: gizmo.resource,
        answers: gizmo.answers,
      },
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

async function createGizmo(req: Request, res: Response): Promise<void> {
  try {
    const body = req.body as IGizmo;

    const addedGizmo = new Gizmo({
      title: body.title,
      materials: body.materials,
      description: body.description,
      resource: body.resource,
      answers: body.answers,
    });

    if ((await Gizmo.findOne({ resource: addedGizmo.resource })) !== null) {
      res.sendStatus(409);
      return;
    }

    delete addedGizmo._id;
    delete addedGizmo.__v;

    addedGizmo.save((err) => {
      if (err) {
        res.sendStatus(400);
        return;
      } else {
        res.status(201).json({
          message: "Gizmo Added",
          gizmo: {
            title: addedGizmo.title,
            materials: addedGizmo.materials,
            description: addedGizmo.description,
            resource: addedGizmo.resource,
            answers: addedGizmo.answers,
          },
        });
        return;
      }
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

async function editGizmo(req: Request, res: Response): Promise<void> {
  try {
    if (isNaN(Number(req.params.resource))) {
      res.sendStatus(400);
      return;
    }

    const body = req.body as IGizmo;

    const gizmo = new Gizmo({
      title: body.title,
      materials: body.materials,
      description: body.description,
      resource: body.resource,
      answers: body.answers,
    });

    const oldGizmo = await Gizmo.findOneAndUpdate(
      { resource: Number(req.params.resource) },
      gizmo,
      undefined,
      (err) => {
        if (err) {
          res.sendStatus(400);
          return;
        }
      }
    );

    if (oldGizmo === null) {
      res.sendStatus(404);
      return;
    }

    const updatedGizmo = await Gizmo.findById(oldGizmo._id);

    if (updatedGizmo === null) {
      res.sendStatus(404);
      return;
    }

    delete updatedGizmo._id;
    delete updatedGizmo.__v;

    res.status(200).json({
      message: "Gizmo Updated",
      gizmo: {
        title: updatedGizmo.title,
        materials: updatedGizmo.materials,
        description: updatedGizmo.description,
        resource: updatedGizmo.resource,
        answers: updatedGizmo.answers,
      },
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

async function deleteGizmo(req: Request, res: Response): Promise<void> {
  try {
    if (isNaN(Number(req.params.resource))) {
      res.sendStatus(400);
      return;
    }

    const deletedGizmo = await Gizmo.findOneAndDelete({
      resource: Number(req.params.resource),
    });

    if (deletedGizmo === null) {
      res.sendStatus(404);
      return;
    }

    delete deletedGizmo._id;
    delete deletedGizmo.__v;

    res.status(200).json({
      message: "Gizmo Deleted",
      gizmo: {
        title: deletedGizmo.title,
        materials: deletedGizmo.materials,
        description: deletedGizmo.description,
        resource: deletedGizmo.resource,
        answers: deletedGizmo.answers,
      },
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

export { getGizmos, getGizmo, createGizmo, editGizmo, deleteGizmo };
