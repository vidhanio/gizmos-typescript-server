import { GizmoDB } from "../../../db/mongodb";
import { GizmoServer } from "../../../server/server";

async function main() {
  const server = new GizmoServer(
    new GizmoDB("mongodb://localhost:27017/vidhan-db", "vidhan-db")
  );

  await server.Start();

  process.on("SIGINT", async () => {
    await server.Stop();
    process.exit(0);
  });
}

main();
