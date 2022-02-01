import { Pool, PoolConfig } from "pg";

import { Gizmo } from "../gizmo";

export class GizmoDB {
  pool: Pool;

  constructor(config?: PoolConfig) {
    this.pool = new Pool(config);
  }

  async Start(): Promise<void> {
    try {
      await this.pool.query(
        "CREATE TABLE IF NOT EXISTS gizmos (title TEXT, materials TEXT, description TEXT, resource INTEGER, answers TEXT[])"
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async Stop(): Promise<void> {
    try {
      await this.pool.end();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getGizmos(): Promise<Gizmo[]> {
    try {
      const client = await this.pool.connect();
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

  async getGizmo(resource: number): Promise<Gizmo> {
    try {
      const client = await this.pool.connect();
      const result = await client.query(
        "SELECT title, materials, description, resource, answers FROM gizmos WHERE resource = $1",
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

  async insertGizmo(gizmo: Gizmo): Promise<void> {
    try {
      const client = await this.pool.connect();

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

  async updateGizmo(resource: number, gizmo: Gizmo): Promise<void> {
    try {
      const client = await this.pool.connect();

      await client.query(
        "UPDATE gizmos SET title = $1, materials = $2, description = $3, answers = $4, resource = $5 WHERE resource = $6",
        [
          gizmo.title,
          gizmo.materials,
          gizmo.description,
          gizmo.answers,
          gizmo.resource,
          resource,
        ]
      );

      client.release();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteGizmo(resource: number): Promise<void> {
    try {
      const client = await this.pool.connect();

      await client.query("DELETE FROM gizmos WHERE resource = $1", [resource]);

      client.release();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
