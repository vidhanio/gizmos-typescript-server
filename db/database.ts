import { Gizmo } from "./gizmo";

export interface GizmoDB {
  getGizmos(): Promise<Gizmo[]>;
  getGizmo(resource: number): Promise<Gizmo | null>;
  insertGizmo(gizmo: Gizmo): Promise<void>;
  updateGizmo(resource: number, gizmo: Gizmo): Promise<void>;
  deleteGizmo(resource: number): Promise<void>;
}
