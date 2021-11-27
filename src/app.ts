import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import gizmoRoutes from "./routes";

const app = express();

const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use(cors());
app.use(gizmoRoutes);

const uri = "mongodb://localhost:27017/vidhan-db";

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
