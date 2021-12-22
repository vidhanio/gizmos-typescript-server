import { IGizmo } from "../types/gizmo";
import { model, Schema } from "mongoose";

export default model<IGizmo>(
  "Gizmo",
  new Schema({
    title: {
      type: String,
      required: true,
    },
    materials: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    resource: {
      type: Number,
      required: true,
    },
    answers: {
      type: [String],
      required: true,
    },
  })
);
