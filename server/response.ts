import { Gizmo } from "../db/gizmo";

export type GizmoResponse = {
  message: string;
  gizmo: Gizmo | null;
};

export type GizmosResponse = {
  message: string;
  gizmos: Gizmo[];
};

export function NewGizmoResponse(
  message: string,
  gizmo: Gizmo | null
): GizmoResponse {
  return {
    message,
    gizmo,
  };
}

export function NewGizmosResponse(
  message: string,
  gizmos: Gizmo[]
): GizmosResponse {
  return {
    message,
    gizmos,
  };
}
