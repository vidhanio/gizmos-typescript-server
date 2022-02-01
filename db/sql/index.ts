import { Gizmo } from "../../types";
import { MongoClient } from "mongodb";
import { Pool } from "pg";

const pool = new Pool({
  user: "vidhanio",
  host: "localhost",
  database: "vidhanio",
  password: "vidhanio",
  port: 5432,
});

export async function getGizmosDB(): Promise<Gizmo[]> {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM gizmos");
    client.release();
    return result.rows.map((gizmo) => {
      return {
        title: gizmo.title,
        materials: gizmo.materials,
        description: gizmo.description,
        resource: gizmo.resource,
        answers: gizmo.answers,
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getGizmoDB(resource: number): Promise<Gizmo> {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM gizmos WHERE resource = $1",
      [resource]
    );
    client.release();
    if (result.rows.length === 0) {
      throw new Error("Gizmo not found");
    }
    return {
      title: result.rows[0].title,
      materials: result.rows[0].materials,
      description: result.rows[0].description,
      resource: result.rows[0].resource,
      answers: result.rows[0].answers,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function insertGizmoDB(gizmo: Gizmo): Promise<void> {
  try {
    const client = await pool.connect();
    await client.query(
      "INSERT INTO gizmos (title, materials, description, resource, answers) VALUES ($1, $2, $3, $4, $5)",
      [
        gizmo.title,
        gizmo.materials,
        gizmo.description,
        gizmo.resource,
        gizmo.answers,
      ]
    );
    client.release();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateGizmoDB(gizmo: Gizmo): Promise<void> {
  try {
    const client = await pool.connect();
    await client.query(
      "UPDATE gizmos SET title = $1, materials = $2, description = $3, answers = $4 WHERE resource = $5",
      [
        gizmo.title,
        gizmo.materials,
        gizmo.description,
        gizmo.answers,
        gizmo.resource,
      ]
    );
    client.release();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteGizmoDB(resource: number): Promise<void> {
  try {
    const client = await pool.connect();
    await client.query("DELETE FROM gizmos WHERE resource = $1", [resource]);
    client.release();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
