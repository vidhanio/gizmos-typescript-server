import { Gizmo } from "../db/gizmo";

export type GizmoResponse = {
  Message: string;
  Gizmo: Gizmo | null;
};

export type GizmosResponse = {
  Message: string;
  Gizmos: Gizmo[];
};
