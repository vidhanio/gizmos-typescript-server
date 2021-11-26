import { Document } from "mongoose";

export interface IGizmo extends Document {
  title: string;
  materials: string;
  description: string;
  resource: number;
  answers: string[];
}
