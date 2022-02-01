import { Gizmo } from "../types";
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/vidhan-db";

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
}

main();

export async function getGizmosDB(): Promise<Gizmo[]> {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
    throw error;
  }

  const db = client.db("vidhan-db");

  const gizmos = await db
    .collection("gizmos")
    .find()
    .sort({ resource: 1 })
    .toArray();

  return gizmos.map((gizmo) => {
    return {
      title: gizmo.title,
      materials: gizmo.materials,
      description: gizmo.description,
      resource: gizmo.resource,
      answers: gizmo.answers,
    };
  });
}

export async function getGizmoDB(resource: number): Promise<Gizmo> {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
    throw error;
  }

  const db = client.db("vidhan-db");

  const gizmo = await db.collection("gizmos").findOne({ resource });

  if (gizmo === null) {
    throw new Error("Gizmo not found");
  }

  return {
    title: gizmo.title,
    materials: gizmo.materials,
    description: gizmo.description,
    resource: gizmo.resource,
    answers: gizmo.answers,
  };
}

export async function insertGizmoDB(gizmo: Gizmo): Promise<void> {
  const db = client.db("vidhan-db");

  const addedGizmo = await db.collection("gizmos").insertOne(gizmo);

  if (addedGizmo.acknowledged === false) {
    throw new Error("Gizmo not added");
  }
}

export async function editGizmoDB(gizmo: Gizmo): Promise<void> {
  const db = client.db("vidhan-db");

  const editedGizmo = await db
    .collection("gizmos")
    .updateOne({ resource: gizmo.resource }, { $set: gizmo });

  if (editedGizmo.modifiedCount === 0) {
    throw new Error("Gizmo not edited");
  }
}

export async function deleteGizmoDB(resource: number): Promise<void> {
  const db = client.db("vidhan-db");

  const deletedGizmo = await db.collection("gizmos").deleteOne({ resource });

  if (deletedGizmo.deletedCount === 0) {
    throw new Error("Gizmo not deleted");
  }
}
