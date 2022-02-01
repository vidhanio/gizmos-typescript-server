import { Db, MongoClient } from "mongodb";

import { Gizmo } from "../gizmo";

export class GizmoDB {
  client: MongoClient;
  db: Db;

  constructor(uri: string, dbName: string) {
    const client = new MongoClient(uri);
    this.client = client;
    this.db = client.db(dbName);
  }

  async Start(): Promise<void> {
    this.client = await this.client.connect();
  }

  async Stop(): Promise<void> {
    await this.client.close();
  }

  async getGizmos(): Promise<Gizmo[]> {
    const gizmos = await this.db
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

  async getGizmo(resource: number): Promise<Gizmo | null> {
    const gizmo = await this.db.collection("gizmos").findOne({ resource });

    if (gizmo === null) {
      return null;
    }

    return {
      title: gizmo.title,
      materials: gizmo.materials,
      description: gizmo.description,
      resource: gizmo.resource,
      answers: gizmo.answers,
    };
  }

  async insertGizmo(gizmo: Gizmo): Promise<void> {
    const addedGizmo = await this.db.collection("gizmos").insertOne(gizmo);

    if (addedGizmo.acknowledged === false) {
      throw new Error("Gizmo not added");
    }
  }

  async updateGizmo(resource: number, gizmo: Gizmo): Promise<void> {
    const editedGizmo = await this.db
      .collection("gizmos")
      .updateOne({ resource: resource }, { $set: gizmo });

    if (editedGizmo.modifiedCount === 0) {
      throw new Error("Gizmo not edited");
    }
  }

  async deleteGizmo(resource: number): Promise<void> {
    const deletedGizmo = await this.db
      .collection("gizmos")
      .deleteOne({ resource: resource });

    if (deletedGizmo.deletedCount === 0) {
      throw new Error("Gizmo not deleted");
    }
  }
}
